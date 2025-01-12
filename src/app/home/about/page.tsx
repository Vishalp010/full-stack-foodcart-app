import React from "react";

const Page = () => {
  return (
    <div className="bg-yellow-50 text-gray-800 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8">
      <div className="flex flex-col items-center justify-center w-full text-center space-y-6">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-mono text-gray-600">
          About Us
        </h1>

        {/* Paragraph with responsive text */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mx-4 sm:mx-6 md:mx-8 max-w-4xl">
          At <span className="font-bold text-gray-800">FOOD CART</span>, we are dedicated to delivering fresh, hot, and delicious food right to your doorstep. Whether you&apos;re craving your favorite pizza, a healthy salad, or a quick snack, we have a wide variety of meals to suit every taste. Our mission is to provide convenience, quality, and great service, ensuring that your meal is just a few taps away. With our easy-to-use app, you can browse menus, place orders, and track your delivery in real-time. We partner with the best local restaurants to bring you the finest food with fast and reliable delivery. Experience the convenience and joy of dining with <span className="font-bold text-gray-800">FOOD CART</span>—your go-to food delivery service. Order now and let us bring the food you love to you!
        </p>
      </div>
    </div>
  );
};

export default Page;
