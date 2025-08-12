"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function TestTelegram() {
  const [result, setResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testTelegram = async () => {
    setLoading(true)
    setResult("")

    try {
      const response = await fetch("/api/test-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Тест отправки сообщения из лендинга",
        }),
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Ошибка: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Тест Telegram</h1>

      <div className="space-y-4">
        <Button onClick={testTelegram} disabled={loading}>
          {loading ? "Отправляем..." : "Тест отправки в Telegram"}
        </Button>

        {result && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Результат:</h3>
            <pre className="text-sm overflow-auto">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
