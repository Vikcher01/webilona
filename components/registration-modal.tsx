"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, CheckCircle, X } from 'lucide-react'
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
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("[v0] Registration data:", formData)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", phone: "", email: "", telegram: "" })
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-emerald-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Спасибо за регистрацию!</h3>
            <p className="text-gray-600">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Регистрируйтесь сейчас</h2>
              <p className="text-lg text-gray-600">
                Чтобы узнать, как получить то самое ощущение, когда все идет по плану
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <Input
                type="text"
                name="name"
                placeholder="ФИО *"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Телефон *"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <Input
                type="email"
                name="email"
                placeholder="Почта *"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <Input
                type="text"
                name="telegram"
                placeholder="Telegram *"
                required
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
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
                >
                  ЗАРЕГИСТРИРОВАТЬСЯ
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
