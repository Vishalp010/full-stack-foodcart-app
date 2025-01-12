'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { FaInfoCircle, FaPhone, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store"; // Adjust path based on your project structure

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Access cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.carts);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0); // Calculate total quantity of items in the cart

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log("An unexpected error occurred:", error);
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <nav className="top-0 left-0 w-full h-18 bg-yellow-100 z-10 border-b border-yellow-500">
      <div className="container mx-auto flex justify-between items-center py-2 px-6">
        {/* Logo and Name */}
        <Link
          href="/home"
          className="text-2xl font-bold flex items-center text-gray-800"
        >
          <Image
            src="/logo.png"
            alt="Food Cart"
            width={55}
            height={55}
            priority
            className="mr-2 rounded-full"
          />
          FOOD CART
        </Link>

        {/* Hamburger for mobile */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none bg-yellow-50 p-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Links for larger screens */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link
            href="/home/about"
            className="hover:text-gray-600 text-gray-800 flex items-center space-x-2"
          >
            <FaInfoCircle /> <span>About</span>
          </Link>
          <Link
            href="/home/contact"
            className="hover:text-gray-600 text-gray-800 flex items-center space-x-2"
          >
            <FaPhone /> <span>Contact</span>
          </Link>
          <Link
            href="/home/cart"
            className="hover:text-gray-600 text-gray-800 flex items-center space-x-2 relative"
          >
            {/* Cart Icon */}
            <div className="relative">
              <FaShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            {/* Cart Text */}
            <span>Cart</span>
          </Link>
          <button
            onClick={logout}
            className="hover:text-gray-600 text-gray-800 flex items-center space-x-2"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for mobile */}
      {isMenuOpen && (
        <div className="sm:hidden bg-yellow-50">
          <div className="flex flex-col items-start py-2 px-6 space-y-2">
            <Link
              href="/home/about"
              className="w-full text-gray-800 hover:text-gray-600 flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaInfoCircle /> <span>About</span>
            </Link>
            <Link
              href="/home/contact"
              className="w-full text-gray-800 hover:text-gray-600 flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaPhone /> <span>Contact</span>
            </Link>
            <Link
              href="/home/cart"
              className="w-full text-gray-800 hover:text-gray-600 flex items-center space-x-2 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Cart Icon */}
              <div className="relative">
                <FaShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              {/* Cart Text */}
              <span>Cart</span>
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                logout();
              }}
              className="w-full text-gray-800 hover:text-gray-600 flex items-center space-x-2"
            >
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </div>
        </div>
      )}
      <Toaster />
    </nav>
  );
};

export default Navbar;
