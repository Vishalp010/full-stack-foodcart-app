// src/app/api/menu/getmenu/[id]/route.ts
import { connect } from '@/dbConfig/dbConfig'
import { NextResponse } from 'next/server'
import { MenuModel as Menu } from '@/models/userModel'

connect()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Await params to access the id correctly
    const { id } = await params

    const menuItem = await Menu.findById(id) // Fetch the menu item by _id

    if (!menuItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })
    }

    return NextResponse.json(menuItem) // Return the found item

  } catch (error:any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
