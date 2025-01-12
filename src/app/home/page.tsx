import React from 'react'
import HomePageComponent from '@/components/HomePage'

const HomePage = () => {
  return (
    <div> 
      <HomePageComponent/>
    </div>
  )
}

export default HomePage

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { Button } from "@/components/ui/button"
// import Navbar from "@/components/Navbar"

// const Meals = () => {
//   const [meals, setMeals] = useState<any[]>([]) // Ensure meals is typed as an array
//   const [loading, setLoading] = useState(true) // To manage loading state
//   const [error, setError] = useState("") // To handle errors

//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const response = await axios.get(
//           "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
//         )
//         setMeals(response.data.meals || []) // Ensure meals is never null
//         setLoading(false)
//       } catch (err: any) {
//         setError("Failed to fetch meals. Please try again later.")
//         setLoading(false)
//       }
//     }

//     fetchMeals()
//   }, [])

//   const addCart = (mealId: string) => {
//     console.log(`Meal with ID ${mealId} added to cart`)
//     // Your cart logic goes here
//   }

//   if (loading) {
//     return <div className="flex justify-center items-center min-h-screen">Loading meals...</div>
//   }

//   if (error) {
//     return <div className="text-red-500 text-center mt-4">{error}</div>
//   }

//   return (
//     <div> <Navbar/> 
//     <div className="min-h-screen p-4 bg-gray-100 flex justify-center">
//       <div className="grid gap-6 w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {meals.length > 0 ? (
//           meals.map((meal) => (
//             <div
//               key={meal.idMeal}
//               className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
//             >
//               <img
//                 src={meal.strMealThumb}
//                 alt={meal.strMeal}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold mb-2">{meal.strMeal}</h2>
//                 <Button
//                   onClick={() => addCart(meal.idMeal)}
//                   className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
//                 >
//                   Add to Cart
//                 </Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-gray-500 text-center w-full">
//             No meals available at the moment.
//           </div>
//         )}
//       </div>
//     </div>
//     </div>
//   )
// }

// export default Meals
