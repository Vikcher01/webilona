"use client"

import { Suspense } from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    // Redirect to webinar after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://a.teleboss.ru/play/3a8c24a7-1693-4492-8974-e744a2362f0f"
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-emerald-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Оплата прошла успешно!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Спасибо за покупку! Через несколько секунд вы будете перенаправлены на страницу с записью вебинара.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Номер заказа: {orderId}
          </p>
        )}

        <Button
          onClick={() => {
            window.location.href = "https://a.teleboss.ru/play/3a8c24a7-1693-4492-8974-e744a2362f0f"
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          Перейти к записи вебинара
        </Button>

        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="w-full mt-4"
        >
          Вернуться на главную
        </Button>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
