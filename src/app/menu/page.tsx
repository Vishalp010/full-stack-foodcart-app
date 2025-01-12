'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const MenuManager = () => {
  const [menuItems, setMenuItems] = useState([])
  const [newMenuItem, setNewMenuItem] = useState({ name: '', category: '', price: '', availability: true })
  const router = useRouter()

  // Fetch the menu items when the page loads
  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu/getmenu')
      if (response.ok) {
        const data = await response.json()
        setMenuItems(data)
      } else {
        toast.error('Failed to fetch menu items') // Replaced alert with toast
      }
    } catch (error) {
      toast.error('Error occurred while fetching the menu items') // Replaced alert with toast
    }
  }

  useEffect(() => {
    fetchMenuItems() // Fetch the menu items when the page is first loaded
  }, [])

  // Handle the edit button click
  const handleEdit = (_id: string) => {
    router.push(`/menu/${_id}`) // Redirect to the edit page for the selected menu item
  }

  // Handle the delete button click
  const handleDelete = async (_id: string) => {
    const response = await fetch(`/api/menu/deletemenu/${_id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      toast.success('Menu item deleted successfully') // Replaced alert with toast
      fetchMenuItems() // Re-fetch the list after deletion
    } else {
      toast.error('Failed to delete menu item') // Replaced alert with toast
    }
  }

  // Handle form change for the new menu item
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setNewMenuItem({
      ...newMenuItem,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  // Handle the submit for adding a new menu item
  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/menu/postmenu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMenuItem)
    })

    if (response.ok) {
      toast.success('New menu item added successfully') // Replaced alert with toast
      setNewMenuItem({ name: '', category: '', price: '', availability: true }) // Reset form
      fetchMenuItems() // Refetch the list after adding a new menu item
    } else {
      toast.error('Failed to add new menu item') // Replaced alert with toast
    }
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Manage Menu</h2>

      {/* Add Menu Form */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Add New Menu Item</h3>
        <form onSubmit={handleAddMenuItem} className="space-y-4">
          <div>
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newMenuItem.name}
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
              value={newMenuItem.category}
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
              value={newMenuItem.price}
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
              checked={newMenuItem.availability}
              onChange={handleChange}
              className="mr-2"
            />
            Available
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-md"
          >
            Add Menu Item
          </button>
        </form>
      </div>

      {/* List of Menu Items */}
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item._id} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
            <span>
              {item.name} - {item.category} - ₹{item.price} -{' '}
              <span className={item.availability ? 'text-green-500' : 'text-red-500'}>
                {item.availability ? 'Available' : 'Unavailable'}
              </span>
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item._id)} // Redirect to edit page
                className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)} // Delete menu item
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuManager
