import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingScreenContainer from "./components/LoadingScreenContainer";
import React from 'react';
import PhotoList from './components/PhotoList';

export default function Page() {
  const contentContainerStyle = `mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 text-stone-100`;

  return (
    <LoadingScreenContainer>
      <div className={contentContainerStyle}>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Header />
          <main className="lg:w-1/2 lg:py-24">
            <PhotoList />
            <Footer />
          </main>
        </div>
      </div>
    </LoadingScreenContainer>
  );
}
