'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'  // Import React Toastify
import { use } from 'react'

const EditMenuItem = ({ params }: { params: { id: string } }) => {
  const [menuItem, setMenuItem] = useState({
    name: '',
    category: '',
    price: '',
    availability: true
  })
  const router = useRouter()

  // Use the 'use' hook to wait for params to resolve and then access params.id
  const { id } = use(params) // this will wait for params to be resolved

  // Fetch the menu item by _id when the component mounts
  useEffect(() => {
    if (id) {
      const fetchMenuItem = async () => {
        try {
          const response = await axios.get(`/api/menu/getmenu/${id}`) // Fetch the item by _id
          setMenuItem(response.data) // Set the fetched item to the state
        } catch (error) {
          toast.error('An error occurred while fetching the menu item') // Error Notification
        }
      }

      fetchMenuItem()
    }
  }, [id]) // Re-fetch when the _id changes

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement // Cast to HTMLInputElement here
    setMenuItem({
      ...menuItem,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Handle the submit for updating the menu item
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.put(`/api/menu/updatemenu/${id}`, menuItem) // Send the updated menu data

      if (response.status === 200) {
        toast.success('Menu item updated successfully') // Success Notification
        router.push('/menu') // Redirect back to the menu manager page
      } else {
        toast.error('Failed to update menu item') // Error Notification
      }
    } catch (error) {
      toast.error('Failed to update menu item') // Error Notification
    }
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Menu Item</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={menuItem.category}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="availability" className="block">Availability</label>
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={menuItem.availability}
            onChange={handleChange}
            className="mr-2"
          />
          Available
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md"
        >
          Update Menu Item
        </button>
      </form>
    </div>
  )
}

export default EditMenuItem
