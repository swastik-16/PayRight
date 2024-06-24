import React from 'react';
import { useNavigate} from 'react-router-dom';
import image from '../assets/image.png';

export default function Hero() {
  const route =useNavigate();

  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-8/12 mb-10">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between items-center">
            <div className="text-4xl font-bold">
              Pay<span className="text-green-700">Ease</span>
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
            <div className="w-full">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Make payments <span className="text-green-700">seamlessly</span> without any hesitation
              </h1>
              <div className="w-20 h-2 bg-green-700 my-4"></div>
              <p className="text-xl mb-10">
                PayEase simplifies your payment process, ensuring secure and quick transactions. Our app supports multiple currencies and payment methods, providing a versatile and user-friendly experience for all your payment needs.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                   route("/signin");
                  }}
                  className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded-full shadow"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                  route("/signup");
                  }}
                  className="bg-green-500 text-white text-2xl font-medium px-4 py-2 rounded-full shadow"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>
      <img
        src={image}
        alt="Illustration of Payment App"
        className="w-full h-48 object-cover sm:h-screen sm:w-4/12 hidden sm:block"
      />
    </div>
  );
}
