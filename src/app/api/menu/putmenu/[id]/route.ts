import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import { MenuModel as Menu } from '@/models/userModel'

connect()

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the id from params (params is already available)
    const { id } = params

    // Parse the updated data from the request body
    const updatedData = await request.json()

    // Find the item by _id and update it
    const updatedItem = await Menu.findByIdAndUpdate(id, updatedData, { new: true })

    // If item not found, return 404
    if (!updatedItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })
    }

    // Return the updated item
    return NextResponse.json(updatedItem)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
