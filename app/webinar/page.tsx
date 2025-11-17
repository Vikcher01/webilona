"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Clock, Users, CheckCircle, MessageCircle, Send, UserCheck, GraduationCap, Briefcase, X, CreditCard } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { submitRegistration } from "../actions/submit-registration"

export default function WebinarLanding() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [showConsentDetails, setShowConsentDetails] = useState(false)

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      telegram: formData.get("telegram") as string,
    }

    try {
      const response = await fetch("/api/init-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Ошибка при инициализации платежа")
      }

      // Redirect to Tinkoff payment page
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl
      }
    } catch (error: any) {
      setSubmitMessage({
        type: "error",
        text: error?.message || "Произошла ошибка при инициализации платежа. Попробуйте еще раз.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      await submitRegistration(formData)
    } catch (error: any) {
      if (error?.digest === "NEXT_REDIRECT") return

      setSubmitMessage({
        type: "error",
        text: error?.message || "Произошла ошибка при отправке заявки. Попробуйте еще раз.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const ModalForm = () => (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => {
            setShowRegistrationForm(false)
            setSubmitMessage(null)
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Получите ссылку на запись вебинара</h3>
          <p className="text-gray-600">Заполните форму, чтобы получить доступ</p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Имя *"
            required
            disabled={isSubmitting}
            className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email *"
            required
            disabled={isSubmitting}
            className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Телефон *"
            required
            disabled={isSubmitting}
            className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />
          <Input
            type="text"
            name="telegram"
            placeholder="Ник в Telegram *"
            required
            disabled={isSubmitting}
            className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
          />

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="privacy-policy" name="privacyPolicy" required />
              <label
                htmlFor="privacy-policy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Я согласен с{" "}
                <a
                  href="https://choosyrecruitment.com/policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  Политикой конфиденциальности
                </a>{" "}
                *
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="data-processing" name="dataProcessingConsent" required />
              <label
                htmlFor="data-processing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Я даю{" "}
                <span
                  onClick={() => setShowConsentDetails(!showConsentDetails)}
                  className="text-emerald-600 hover:underline cursor-pointer"
                >
                  Согласие на обработку персональных данных
                </span>{" "}
                *
              </label>
            </div>
            {showConsentDetails && (
              <div className="mt-2 p-4 bg-gray-50 rounded-md text-xs text-gray-700 max-h-40 overflow-y-auto border border-gray-200">
                <p>
                  Физическое лицо, оставляя заявку на веб-сайте https://choosyrecruitment.com/, действуя свободно, своей
                  волей и в своем интересе, а также подтверждая свою дееспособность, предоставляет свое согласие на
                  обработку персональных данных (далее — Согласие) Choosy Recruitment (email:
                  info@choosyrecruitment.com, которому принадлежит веб-сайт https://choosyrecruitment.com/), со
                  следующими условиями:
                </p>
                <p className="mt-2">
                  1. Данное Согласие дается на обработку персональных данных, как без использования средств
                  автоматизации, так и с их использованием.
                </p>
                <p className="mt-2">
                  2. Согласие дается на обработку следующих моих персональных данных: Персональные данные, не
                  относящиеся к специальной категории персональных данных или к биометрическим персональным данным:
                </p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>адрес электронной почты (e-mail);</li>
                  <li>имя;</li>
                  <li>фамилия;</li>
                  <li>отчество;</li>
                  <li>сведения о месте работы;</li>
                  <li>номер мобильного телефона.</li>
                </ul>
                <p className="mt-2">3. Цели обработки персональных данных:</p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>обсуждение дальнейшего сотрудничества и возможного заключения договора;</li>
                  <li>заключение трудового или гражданско-правового договора;</li>
                  <li>участие в мероприятиях, организуемых Choosy Recruitment.</li>
                </ul>
                <p className="mt-2">
                  4. В ходе обработки с персональными данными будут совершены следующие действия: сбор; запись;
                  систематизация; накопление; хранение; уточнение (обновление, изменение); извлечение; использование;
                  удаление; уничтожение.
                </p>
                <p className="mt-2">
                  5. Персональные данные обрабатываются в течение 30 дней с момента отказа в дальнейшем обсуждении
                  сотрудничества или с момента принятия решения о заключении договора, или окончания мероприятия, в
                  зависимости от того, что наступит ранее, в соответствии с ч. 4 ст. 21 Федерального закона No 152-ФЗ «О
                  персональных данных».
                </p>
                <p className="mt-2">
                  6. Согласие может быть отозвано вами или вашим представителем путем направления в Choosy Recruitment
                  письменного заявления или электронного заявления, подписанного в соответствии с законодательством
                  Российской Федерации об электронной подписи, по адресу, указанному в начале Согласия.
                </p>
                <p className="mt-2">
                  7. В случае отзыва вами или вашим представителем Согласия, Choosy Recruitment вправе продолжить
                  обработку персональных данных без согласия при наличии оснований, указанных в п. 2–11 ч. 1 ст. 6, ч. 2
                  ст. 10 и ч. 2 ст. 11 Закона No 152-ФЗ.
                </p>
                <p className="mt-2">
                  8. Настоящее Согласие действует всё время до момента прекращения обработки персональных данных в
                  соответствии с пунктами 5 и 6 настоящего Согласия.
                </p>
              </div>
            )}
          </div>

          {submitMessage && (
            <div
              className={`p-4 rounded-lg ${
                submitMessage.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-lg disabled:opacity-50"
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {isSubmitting ? "Переход к оплате..." : "Оплатить доступ"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-emerald-800 font-medium">🎁 Бонус каждому участнику</p>
            <p className="text-emerald-700 text-sm mt-1">Чек-лист "10 формулировок, которые работают"</p>
            <p className="text-emerald-700 text-sm mt-1">*Подарок отправим в Telegram</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="w-32 h-24">
              <Image
                src="/images/choosy-logo.jpg"
                alt="Choosy Recruitment Logo"
                width={128}
                height={96}
                className="object-contain"
              />
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-600 font-medium hover:text-emerald-600 transition-colors">
                Главная
              </Link>
              <Link
                href="/webinar"
                className="text-gray-900 font-medium hover:text-emerald-600 transition-colors border-b-2 border-emerald-600"
              >
                Вебинар
              </Link>
            </nav>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  КАК НАПИСАТЬ ВАКАНСИЮ, КОТОРАЯ ПРОДАСТ ВАШУ КОМПАНИЮ КАНДИДАТУ
                </h1>

                <Badge className="bg-red-50 text-red-700 border-red-200 px-4 py-2">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <span className="text-xl sm:text-2xl font-bold">60%</span>
                    </div>
                    <div className="text-right">
                      <div>вакансий не привлекают</div>
                      <div>внимание соискателей</div>
                    </div>
                  </div>
                </Badge>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {
                    "в результате затягивается процесс найма и бизнес теряет деньги. Как это исправить - расскажем на вебинаре\n"
                  }
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium">17 июля, 12:00 по МСК</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium">Онлайн формат</span>
                </div>
              </div>

              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
                onClick={() => setShowRegistrationForm(true)}
              >
                Зарегистрироваться
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="bg-gray-50 rounded-2xl p-4 h-[500px]">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/IMG_9571-new.jpg"
                    alt="Профессиональный HR-эксперт"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="text-center mt-8">
                <p className="text-sm text-gray-600">
                  Спикер вебинара Илона Иванс Башто – основатель и CEO агентства Choosy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{"На вебинаре вас ждет"} </h2>
              <p className="text-lg text-gray-600">
                Илона Иванс Башто разберет 6 типичных ошибок в составлении вакансии и поделится актуальными кейсами и
                примерами.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Как исправить текст так, чтобы он начал работать
                    </h3>
                    <p className="text-gray-600">Разберем конкретные примеры и покажем трансфмацию</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-emerald-50">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Какие формулировки отталкивают (и почему)</h3>
                    <p className="text-gray-600">6 типичных ошибок, которые убивают вакансию</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Как сделать вакансию живой, конкретной и понятной
                    </h3>
                    <p className="text-gray-600">Техники, которые заставляют кандидатов откликаться</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-purple-50">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Как сэкономить время на подборе</h3>
                    <p className="text-gray-600">Просто переписав описание по новым правилам</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Для кого вебинар</h2>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-emerald-100">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Рекрутерам</h3>
                <p className="text-gray-600 text-sm">Специалистам по подбору персонала</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ген.директорам и топ-менеджерам</h3>
                <p className="text-gray-600 text-sm">Кто занимается подбором самостоятельно</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-purple-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">HR-generalist</h3>
                <p className="text-gray-600 text-sm">Универсальным HR-специалистам</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-white to-blue-50 border-t border-blue-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Спикер</h2>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2 text-center lg:text-left">
                  <div className="relative w-48 h-60 sm:w-64 sm:h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden">
                    <Image src="/images/IMG_9554.jpg" alt="Илона Иванс Башто" fill className="object-cover" />
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Илона Иванс Башто</h3>
                    <p className="text-lg text-emerald-600 font-medium">Основатель и CEO агентства Choosy</p>
                  </div>

                  <blockquote className="text-lg text-gray-700 italic border-l-4 border-emerald-600 pl-4">
                    "Я точно знаю, как правильная вакансия влияет на результат."
                  </blockquote>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">13+</div>
                      <div className="text-sm text-gray-600">лет опыта в консалтинге и HR in-house </div>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600">130+</div>
                      <div className="text-sm text-gray-600">проведенных корпоративных тренингов </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="text-2xl font-bold text-purple-600">20+</div>
                      <div className="text-sm text-gray-600">
                        крупных компаний (L'Oreal, S7, Tetra Pak, Walt Disney, Shell, Total){" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Регистрируйтесь сейчас</h2>
            <p className="text-lg sm:text-xl text-emerald-100">
              Начните получать отклики от тех, кто вам действительно нужен
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-emerald-100">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">17 июля, 12:00 МСК</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Онлайн формат</span>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-gray-50 font-medium px-8 py-4 text-lg"
              onClick={() => setShowRegistrationForm(true)}
            >
              Зарегистрироваться бесплатно
            </Button>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section
        className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-white to-gray-50 border-t border-gray-100"
        id="about"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">О компании</h2>
            </div>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                <strong>Choosy Recruitment</strong> — это HR-консалтинговая компания, в которой профессиональный опыт
                дополняет высокую мотивацию и амбиции.
              </p>

              <p>
                После нескольких лет опыта работы каждого из наших сотрудников, мы уже хорошо разбираемся в подборе
                персонала, но при этом всё ещё от него не устали — а Вы сами знаете, какая это большая редкость!
              </p>

              <p>
                Мы считаем, что привлечение талантов (как и другие процессы управления персоналом) — это ювелирная
                работа, особенная услуга, требующая нестандартного мышления, навыков быстрого реагирования и высокого
                уровня ответственности, которые мы рады предложить нашим клиентам.
              </p>

              <p className="text-emerald-600 font-medium text-center text-xl"></p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Results Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-emerald-50 to-blue-50 border-t border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши результаты</h2>
              <p className="text-lg text-gray-600">Цифры, которые говорят о нашем профессионализме и опыте</p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-emerald-100">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">3000+</div>
                <p className="text-gray-700 font-medium">трудоустроенных кандидатов</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">48000+</div>
                <p className="text-gray-700 font-medium">проведённых собеседований</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-purple-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                <p className="text-gray-700 font-medium">компаний-партнёров</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Send className="h-10 w-10 text-white" />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Подписывайтесь на Telegram-канал
                  <br />
                  Сhoosy Inside | рекрутмент наизнанку
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                  {"Присоединяйтесь и узнаете про живой рекрутмент и процессы в найме глазами CEO агентства\n"}
                </p>
              </div>

              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-4 text-lg"
                onClick={() => window.open("https://t.me/staychoosy", "_blank")}
              >
                <Send className="mr-2 h-5 w-5" />
                Перейти в канал
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-20 h-16">
                  <Image
                    src="/images/choosy-logo.jpg"
                    alt="Choosy Recruitment Logo"
                    width={80}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm">Рекрутинговое агентство с полным спектром HR-услуг</p>
            </div>

            <div>
              <h4 className="text-emerald-400 font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://choosyrecruitment.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    О нас
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-emerald-400 font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>info@choosyrecruitment.com</p>
                <div className="flex gap-2 mt-4">
                  <a
                    href="https://api.whatsapp.com/send/?phone=79268989677&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://www.linkedin.com/company/choosy-recruitment/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showRegistrationForm && <ModalForm />}
    </div>
  )
}
