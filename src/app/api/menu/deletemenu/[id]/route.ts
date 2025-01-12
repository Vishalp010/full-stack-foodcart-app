// src/app/api/menu/deletemenu/[id]/route.ts
import { connect } from '@/dbConfig/dbConfig'
import { NextResponse } from 'next/server'
import { MenuModel as Menu } from '@/models/userModel'

connect()

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params

    // Attempt to delete the menu item by its _id
    const deletedItem = await Menu.findByIdAndDelete(id)

    if (!deletedItem) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Menu item deleted successfully' })
  } catch (error:any) {
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}
