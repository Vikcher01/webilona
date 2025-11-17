import { NextRequest, NextResponse } from "next/server"
import { handleTinkoffCallback } from "@/app/actions/handle-payment-callback"

export async function POST(request: NextRequest) {
  try {
    const notification = await request.json()
    
    console.log("[v0] Received Tinkoff notification:", notification)
    
    const result = await handleTinkoffCallback(notification)
    
    if (result.success) {
      return NextResponse.json({ OK: true })
    } else {
      return NextResponse.json({ OK: false, message: result.message }, { status: 400 })
    }
  } catch (error: any) {
    console.error("[v0] Callback processing error:", error)
    return NextResponse.json({ OK: false, message: error.message }, { status: 500 })
  }
}
