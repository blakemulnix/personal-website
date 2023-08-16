#!/bin/bash

deploy() {
  local environment="$1"

  # Change to the desired directory
  cd /workspaces/blakemulnix-io

  case "$environment" in
  local)
    # Deploy locally to localhost:3000
    echo "Deploying locally..."
    cd frontend/
    yarn dev
    ;;
  public)
    echo "Executing steps to deploy to the web..."
    # Build infra
    echo "Building Terraform Infra..."
    cd infra/
    terraform apply
    root_distribution_id=$(terraform output -json root_distribution_id | tr -d '"')
    www_distribution_id=$(terraform output -json www_distribution_id | tr -d '"')

    # Build frontend
    echo "Building frontend..."
    cd ../frontend
    yarn build

    # Deploy frontend
    echo "Deploying frontend to S3..."
    yarn deploy

    # Invalidate CloudFront Distribution
    echo "Invalidating Cloudfront distribution..."
    www_invalidation_id=$(aws cloudfront create-invalidation --distribution-id $www_distribution_id --paths "/*" --query Invalidation.Id)
    www_length=${#www_invalidation_id}
    root_invalidation_id=$(aws cloudfront create-invalidation --distribution-id $root_distribution_id --paths "/*" --query Invalidation.Id)
    root_length=${#root_invalidation_id}

    # Wait for invalidation to finish
    echo "Waiting for invalidation distribution..."
    aws cloudfront wait invalidation-completed --distribution-id $www_distribution_id --id ${www_invalidation_id:1:$www_length-2}
    aws cloudfront wait invalidation-completed --distribution-id $root_distribution_id --id ${root_invalidation_id:1:$root_length-2}
    echo "Deployment complete!"
    ;;
  esac
}

main() {
  local command="$1"
  shift

  case "$command" in
  deploy)
    deploy "$@"
    ;;
  # Add other commands here
  *)
    echo "Invalid command: $command"
    exit 1
    ;;
  esac
}

# Call the main function with provided arguments
main "$@"