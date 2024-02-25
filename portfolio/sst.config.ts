import { SSTConfig } from "sst";
import { StaticSite } from "sst/constructs";

export default {
  // 
  config(_input) {
    return {
      name: "portfolio",
      region: "us-east-1",
    };
  },

  // An SST "app" is composed of one or more "stacks" that are
  // themselves composed of one or more "constructs"
  //
  // App <- Stack(s) <- Construct(s) 
  stacks(app) {
    app.stack(function Site({ stack }) {
      const hostedZone = "blakemulnix.io";
      const rootDomain = stack.stage === "prod" ? `${hostedZone}` : `${stack.stage}.${hostedZone}`;
      const wwwDomain = `www.${rootDomain}`;

      const site = new StaticSite(stack, "Site", {
        path: "build",
        buildCommand: "yarn build",
        customDomain: {
          domainName: rootDomain,
          domainAlias: wwwDomain,
          hostedZone: hostedZone,
        },
      });

      stack.addOutputs({
        SiteUrl: site.customDomainUrl
      });
    });
  },
} satisfies SSTConfig;
