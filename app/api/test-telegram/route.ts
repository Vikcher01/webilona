import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    console.log("Bot Token:", botToken ? "Установлен" : "Не установлен")
    console.log("Chat ID:", chatId ? "Установлен" : "Не установлен")

    if (!botToken || !chatId) {
      return NextResponse.json({
        success: false,
        error: "Переменные окружения не настроены",
        details: {
          botToken: !!botToken,
          chatId: !!chatId,
        },
      })
    }

    const telegramMessage = `🧪 *Тестовое сообщение*\n\n${message}\n\n⏰ ${new Date().toLocaleString("ru-RU")}`

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    })

    const telegramResult = await response.json()

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: "Ошибка Telegram API",
        details: telegramResult,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Сообщение отправлено успешно",
      telegramResult,
    })
  } catch (error) {
    console.error("Ошибка при отправке в Telegram:", error)
    return NextResponse.json({
      success: false,
      error: "Внутренняя ошибка сервера",
      details: error instanceof Error ? error.message : "Неизвестная ошибка",
    })
  }
}
