import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

interface TinkoffInitResponse {
  Success: boolean
  ErrorCode?: string
  Message?: string
  PaymentURL?: string
  PaymentId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, telegram } = body

    console.log("[v0] Received payment request:", { name, email, phone, telegram })

    // Validate required fields
    if (!name || !email || !phone || !telegram) {
      console.log("[v0] Missing required fields")
      return NextResponse.json({ error: "Заполните все обязательные поля" }, { status: 400 })
    }

    const terminalKey = process.env.TINKOFF_TERMINAL_KEY
    const secretKey = process.env.TINKOFF_SECRET_KEY

    console.log("[v0] Terminal key exists:", !!terminalKey)
    console.log("[v0] Secret key exists:", !!secretKey)
    console.log("[v0] Terminal key value:", terminalKey)

    if (!terminalKey || !secretKey) {
      console.error("[v0] Missing Tinkoff credentials")
      return NextResponse.json(
        { 
          error: "Платежная система не настроена",
          details: "Добавьте TINKOFF_TERMINAL_KEY и TINKOFF_SECRET_KEY в переменные окружения проекта" 
        },
        { status: 500 }
      )
    }

    // Generate unique order ID
    const orderId = `webinar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const amount = 270000 // 2700 RUB in kopecks
    const description = "Оплата доступа к записи вебинара"

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.vercel.app"
    
    // Create request object for Tinkoff API
    const requestData: any = {
      TerminalKey: terminalKey,
      Amount: amount,
      OrderId: orderId,
      Description: description,
      SuccessURL: `${baseUrl}/payment/success?orderId=${orderId}`,
      FailURL: `${baseUrl}/payment/failed?orderId=${orderId}`,
      NotificationURL: `${baseUrl}/api/tinkoff-callback`,
      DATA: {
        Email: email,
        Phone: phone,
        Name: name,
        Telegram: telegram,
      },
      Receipt: {
        Email: email,
        Phone: phone,
        Taxation: "usn_income",
        Items: [
          {
            Name: "Доступ к записи вебинара",
            Price: amount,
            Quantity: 1,
            Amount: amount,
            Tax: "none",
            PaymentMethod: "full_prepayment",
            PaymentObject: "service",
          },
        ],
      },
    }

    // Generate token for request signature
    const tokenValues: Record<string, any> = {
      TerminalKey: terminalKey,
      Amount: amount,
      OrderId: orderId,
      Description: description,
      SuccessURL: requestData.SuccessURL,
      FailURL: requestData.FailURL,
      NotificationURL: requestData.NotificationURL,
      Password: secretKey,
    }

    const tokenString = Object.keys(tokenValues)
      .sort()
      .map((key) => tokenValues[key])
      .join("")

    // Use Web Crypto API for SHA-256 hash
    const encoder = new TextEncoder()
    const data = encoder.encode(tokenString)
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const token = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    
    requestData.Token = token

    console.log("[v0] Calling Tinkoff Init API with orderId:", orderId)
    console.log("[v0] Request data:", JSON.stringify(requestData, null, 2))

    const response = await fetch("https://securepay.tinkoff.ru/v2/Init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      console.error("[v0] Tinkoff API returned error status:", response.status)
      const errorText = await response.text()
      console.error("[v0] Error response:", errorText)
      return NextResponse.json({ error: "Ошибка при обращении к платежной системе" }, { status: 500 })
    }

    const data: TinkoffInitResponse = await response.json()

    console.log("[v0] Tinkoff API response:", data)

    if (!data.Success) {
      console.error("[v0] Tinkoff payment init failed:", data)
      return NextResponse.json({ 
        error: data.Message || "Ошибка при создании платежа",
        errorCode: data.ErrorCode 
      }, { status: 400 })
    }

    if (!data.PaymentURL) {
      return NextResponse.json({ error: "Не получена ссылка на оплату" }, { status: 500 })
    }

    // Return payment URL
    return NextResponse.json({ paymentUrl: data.PaymentURL, paymentId: data.PaymentId })
  } catch (error: any) {
    console.error("[v0] Payment initialization error:", error)
    console.error("[v0] Error stack:", error.stack)
    return NextResponse.json({ 
      error: "Произошла ошибка при инициализации платежа",
      details: error.message 
    }, { status: 500 })
  }
}
