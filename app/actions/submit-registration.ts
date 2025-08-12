"use server"

import { redirect } from "next/navigation" // Импортируем функцию redirect

export async function submitRegistration(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const telegram = formData.get("telegram") as string

  // Валидация
  if (!name || !email || !phone || !telegram) {
    return {
      success: false,
      message: "Имя, email, телефон и ник в Telegram обязательны для заполнения",
    }
  }

  // Данные заявки
  const registrationData = {
    name,
    email,
    phone: phone || "",
    telegram: telegram || "",
    timestamp: new Date().toISOString(),
    source: "webinar-landing",
  }

  console.log("Отправляем заявку:", registrationData)

  try {
    // Отправка в Telegram
    const telegramResult = await sendToTelegram(registrationData)
    console.log("Результат Telegram:", telegramResult)

    // Если отправка успешна, выполняем серверное перенаправление
    redirect("https://a.teleboss.ru/play/3a8c24a7-1693-4492-8974-e744a2362f0f")

    // Этот код не будет выполнен, так как redirect() завершает выполнение функции
    // return {
    //   success: true,
    //   message: "Регистрация успешно отправлена! Мы свяжемся с вами в ближайшее время.",
    // }
  } catch (error) {
    console.error("Ошибка при отправке заявки:", error)
    return {
      success: false,
      message: "Произошла ошибка при отправке заявки. Попробуйте еще раз.",
    }
  }
}

// Функция отправки в Telegram
async function sendToTelegram(data: any) {
  // Используем ваши данные напрямую для тестирования
  const botToken = process.env.TELEGRAM_BOT_TOKEN || "7971717136:AAH_EF2GoLFcCEp6WNnJRh69Ikm2PDXlSbw"
  const chatId = process.env.TELEGRAM_CHAT_ID || "-1002898303162"

  console.log("Telegram credentials:", {
    botToken: botToken ? "Установлен" : "Не установлен",
    chatId: chatId ? "Установлен" : "Не установлен",
  })

  const message = `🎯 *Новая заявка на вебинар!*

👤 *Имя:* ${data.name}
📧 *Email:* ${data.email}
📱 *Телефон:* ${data.phone || "Не указан"}
💬 *Telegram:* ${data.telegram || "Не указан"}
⏰ *Время:* ${new Date(data.timestamp).toLocaleString("ru-RU")}
🌐 *Источник:* ${data.source}`

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("Telegram API error:", result)
      throw new Error(`Telegram API error: ${result.description || JSON.stringify(result)}`)
    }

    console.log("Сообщение успешно отправлено в Telegram:", result)
    return result
  } catch (error) {
    console.error("Ошибка при отправке в Telegram:", error)
    throw error
  }
}
