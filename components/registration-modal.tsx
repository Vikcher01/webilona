"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, CheckCircle, X, Loader2 } from 'lucide-react'
import { useState } from "react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    telegram: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/init-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      // Try to parse JSON response
      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error("Failed to parse response:", parseError)
        setError("Ошибка сервера. Пожалуйста, убедитесь, что переменные окружения TINKOFF_TERMINAL_KEY и TINKOFF_SECRET_KEY настроены.")
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        // Show detailed error message if available
        const errorMessage = data.details 
          ? `${data.error}\n${data.details}` 
          : data.error || "Ошибка при создании платежа"
        setError(errorMessage)
        setIsLoading(false)
        return
      }

      if (data.paymentUrl) {
        // Redirect to payment page
        window.location.href = data.paymentUrl
      } else {
        setError("Не получена ссылка на оплату")
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Payment error:", err)
      setError("Произошла ошибка. Попробуйте еще раз.")
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-emerald-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Регистрируйтесь сейчас</h2>
          <p className="text-lg text-gray-600">
            Чтобы узнать, как получить то самое ощущение, когда все идет по плану
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 whitespace-pre-line">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            type="text"
            name="name"
            placeholder="ФИО *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
            disabled={isLoading}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Телефон *"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
            disabled={isLoading}
          />
          <Input
            type="email"
            name="email"
            placeholder="Почта *"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
            disabled={isLoading}
          />
          <Input
            type="text"
            name="telegram"
            placeholder="Telegram *"
            required
            value={formData.telegram}
            onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
            className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
            disabled={isLoading}
          />

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-gray-700">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>Онлайн формат, запись останется с вами навсегда</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Calendar className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>Дата и время (скоро будут)</span>
            </div>
          </div>

          <div className="text-center py-6 border-t border-gray-100 mt-6">
            <div className="text-3xl font-bold text-gray-900 mb-4">2700 рублей</div>
            <Button
              type="submit"
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-12 py-6 text-lg w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Обработка...
                </>
              ) : (
                "КУПИТЬ"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
