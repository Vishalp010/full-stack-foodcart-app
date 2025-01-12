import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"; // Import icons from react-icons

const Footer = () => {
  return (
    <div className="flex flex-col items-center font-mono bg-yellow-100 pt-4 ">
      {/* Top Horizontal Line */}
      <div className="w-full">
        <hr className="border-t-[0.5px] border-gray-400 w-full" />
      </div>

      {/* Main Footer Content */}
      <div className="w-[90%] flex flex-col md:flex-row items-start justify-between mt-4">
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start w-full md:w-[30%] md:m-3">
          <div className=" flex flex-col" >
          <div className="text-3xl font-bold flex items-center ">
            FOOD CART
            <Image
              src="/logo.png"
              alt="Food Cart"
              width={50}
              height={50}
              className="ml-2 rounded-full"
            />
          </div>
          {/* Slogan below the logo */}
          <p className="text-lg font-medium text-gray-600 mt-2">
            We deliver emotions
          </p>
          </div>
        </div>

        {/* Divider for larger screens */}
        <div className="hidden md:block w-[0.5px] bg-gray-400 mx-3"></div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row w-full md:w-[70%] md:items-start md:justify-around mt-4 md:mt-0">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-xl font-medium mb-2 text-gray-800">COMPANY</h1>
            <Link href="/home" className="text-gray-700 hover:text-gray-800 mb-1">
              Home
            </Link>
            <Link href="/home/about" className="text-gray-700 hover:text-gray-800 mb-1">
              About
            </Link>
            <Link href="/home/contact" className="text-gray-700 hover:text-gray-800">
              Contact
            </Link>
          </div>
          <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
            <h1 className="text-xl font-medium mb-2 text-gray-800">SUPPORT</h1>
            <Link href="/home/faqs" className="text-gray-700 hover:text-gray-800">
              FAQs
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Horizontal Line */}
      <div className="w-[90%] mt-4">
        <hr className="border-t-[0.5px] border-gray-400" />
      </div>

      {/* Footer Bottom Section */}
      <div className="w-[90%] flex flex-col md:flex-row items-center justify-between mt-2 text-gray-400 text-xs">
        {/* Terms and Privacy Links */}
        <div className="flex flex-col md:flex-row items-center">
          <span className="mr-5 mb-2 md:mb-0 cursor-pointer hover:text-gray-600">
            Terms and Conditions
          </span>
          <span className="cursor-pointer hover:text-gray-600">Privacy Policy</span>
        </div>

        {/* Site by Vishal */}
        <div className="mt-2 md:mt-0">
          <span>
            site by{" "}
            <a
              href="https://www.instagram.com/ivishaldangi/"
              target="_blank"
              className="text-gray-600 hover:text-gray-800"
            >
              Vishal
            </a>
          </span>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          {/* Instagram Icon */}
          <Link
            href="https://www.instagram.com/ivishaldangi/"
            target="_blank"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <FaInstagram className="text-xl" />
            <span className="hidden md:inline">Instagram</span>
          </Link>

          {/* Facebook Icon */}
          <Link
            href="https://www.facebook.com/ivishaldangi/"
            target="_blank"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <FaFacebook className="text-xl" />
            <span className="hidden md:inline">Facebook</span>
          </Link>

          {/* WhatsApp Icon */}
          <Link
            href="https://wa.me/+919650466390/"
            target="_blank"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <FaWhatsapp className="text-xl" />
            <span className="hidden md:inline">WhatsApp</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
