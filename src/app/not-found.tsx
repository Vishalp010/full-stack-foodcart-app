import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-100">
      {/* Logo Image */}
      <div className="mb-4">
        <Image 
          src="/logo.png" // Replace with your actual logo path
          alt="Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>
      
      {/* Headings */}
      <h2 className="text-3xl font-bold text-gray-800 mb-2">We Deliver Emotions</h2>
      <p className="text-lg text-gray-700 mb-8 text-center px-6">
        Sorry, we couldn't find the resource you were looking for. 
        Try giving us a chance for your next delivery!
      </p>
      
      {/* Link */}
      <Link href="/" className="text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg shadow-md" >
          Return Home
      </Link>
    </div>
  );
}
