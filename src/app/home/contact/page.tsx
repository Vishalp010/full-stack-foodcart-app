'use client'
import React, { useState } from "react";

const Page = () => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback submitted by ${name}.\nEmail: ${email}\nFeedback: ${feedback}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen bg-yellow-50 text-gray-800">
      {/* Left Column (Contact Info) */}
      <div className="w-full sm:w-1/2 p-6">
        <div className="border-2 border-gray-300 p-8 rounded-xl shadow-lg bg-white">
          <h1 className="text-2xl font-semibold text-center text-gray-500 mb-4">
            Have questions or need additional help?
          </h1>
          <h1 className="text-xl text-center text-gray-600 mb-2">
            Give us a call.
          </h1>
          <h1 className="text-xl font-bold text-center text-gray-800 mb-4">
            +91 9650466390
          </h1>
          <h1 className="text-sm sm:text-base text-center text-gray-500">
            Mon-Fri 9:00am - 6:00pm EST
          </h1>
        </div>
      </div>

      {/* Right Column (Feedback Form) */}
      <div className="w-full sm:w-1/2 p-6">
        <div className="border-2 border-gray-300 p-8 rounded-xl shadow-lg bg-white">
          <h2 className="text-3xl font-semibold text-center text-gray-600 mb-6">
            We Value Your Feedback!
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Your Email"
                required
              />
            </div>

            {/* Feedback Textarea */}
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-gray-700 font-medium">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
                placeholder="Your feedback or suggestions"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-400 text-white rounded-md font-semibold"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
