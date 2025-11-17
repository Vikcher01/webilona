"use server"

import crypto from "crypto"

interface TinkoffNotification {
  TerminalKey: string
  OrderId: string
  Success: boolean
  Status: string
  PaymentId: string
  ErrorCode?: string
  Amount: number
  Token: string
  [key: string]: any
}

export async function handleTinkoffCallback(notification: TinkoffNotification) {
  const secretKey = process.env.TINKOFF_SECRET_KEY

  if (!secretKey) {
    console.error("[v0] Secret key not configured")
    return { success: false, message: "Configuration error" }
  }

  // Verify notification signature
  const { Token: receivedToken, ...paramsWithoutToken } = notification
  
  // Add Password to parameters for token generation
  const tokenParams = { ...paramsWithoutToken, Password: secretKey }
  
  // Sort parameters and create token string
  const tokenString = Object.keys(tokenParams)
    .sort()
    .map((key) => tokenParams[key])
    .join("")

  const calculatedToken = crypto.createHash("sha256").update(tokenString).digest("hex")

  if (calculatedToken !== receivedToken) {
    console.error("[v0] Invalid token signature")
    return { success: false, message: "Invalid signature" }
  }

  // Check payment status
  if (notification.Success && notification.Status === "CONFIRMED") {
    // Payment successful - here you can:
    // 1. Save payment info to database
    // 2. Send email with webinar link
    // 3. Send Telegram message with access
    
    console.log("[v0] Payment confirmed:", {
      orderId: notification.OrderId,
      paymentId: notification.PaymentId,
      amount: notification.Amount,
    })

    // TODO: Implement your business logic here
    // For example, send webinar link via email or Telegram

    return { success: true, message: "Payment confirmed" }
  }

  return { success: false, message: "Payment not confirmed" }
}
