"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation in the App directory
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCard } from "@/app/features/cardmanager/cardManagerSlice";
import { Button } from "@/components/ui/button";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const HomePage = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const router = useRouter(); // Correct router hook for App Directory

  // Fetch meals when the component mounts
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("/myapi.json");
        setMeals(response.data.meals || []);
        setFilteredMeals(response.data.meals || []);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to fetch meals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredMeals(meals);
    } else {
      const results = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMeals(results);
    }
  };

  const handleCardClick = (meal: Meal) => {
    dispatch(setCard(meal)); // Save the selected meal in Redux
    router.push("/home/details"); // Navigate to the details page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-3xl text-yellow-600">
        Loading meals...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-yellow-50 flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-full max-w-6xl mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a meal by name or ingredients you want..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Meal Cards */}
      <div className="grid gap-6 w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between " >
                <h2 className="text-lg font-semibold mb-2">{meal.strMeal}</h2>
                <p className="text-xl font-semibold text-green-600">₹{50}</p></div>
                <Button
                  onClick={() => handleCardClick(meal)}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center w-full">
            No meals found for "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
