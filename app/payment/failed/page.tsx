"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { XCircle } from 'lucide-react'

export default function PaymentFailedPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="w-20 h-20 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Оплата не прошла
        </h1>
        
        <p className="text-gray-600 mb-6">
          К сожалению, произошла ошибка при обработке платежа. Пожалуйста, попробуйте еще раз или свяжитесь с нами для помощи.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Номер заказа: {orderId}
          </p>
        )}

        <Button
          onClick={() => router.push("/")}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          Попробовать снова
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
