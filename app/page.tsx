"use client"

import { Button } from "@/components/ui/button"
import { RegistrationModal } from "@/components/registration-modal"
import { Calendar, Clock, Users, CheckCircle, MessageCircle, Send, Target, Heart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function WebinarLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
              <Link
                href="/"
                className="text-gray-900 font-medium hover:text-emerald-600 transition-colors border-b-2 border-emerald-600"
              >
                Главная
              </Link>
              <Link href="/webinar" className="text-gray-600 font-medium hover:text-emerald-600 transition-colors">
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
                  Звучит как план!
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Вебинар о том, как превратить хаос в систему, а планирование — в источник свободы, а не стресса.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  За 2 часа разложим по полочкам, зачем вообще планировать, как не срываться и как построить систему,
                  которая работает в реальной жизни.
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
                <Button
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-4 text-lg mt-4"
                >
                  Зарегистрироваться
                </Button>
              </div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{"Что ждёт вас на вебинаре\n"} </h2>
              
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Что такое планирование на самом деле</h3>
                    <p className="text-gray-600">{"почему это не про контроль, а про опору и уверенность.\n"}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-emerald-50">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Главные ошибки, которые мешают планировать </h3>
                    <p className="text-gray-600">{"и как перестать «срываться» уже завтра.\n"}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-blue-50">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Инструменты живого планирования</h3>
                    <p className="text-gray-600">{"как сочетать бумажные блокноты, технологии и здравый смысл.\n"}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-purple-50">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Как поддерживать себя, чтобы не сливаться</h3>
                    <p className="text-gray-600 text-sm">{"и сделать план союзником, а не источником стресса.\n"}</p>
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
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Предпринимателей и руководителей</h3>
                <p className="text-gray-600 text-sm">
                  {"у которых 25 задач и ни одного свободного часа — чтобы вернуть ясность и фокус.\n"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Работающих мам и многозадачных женщин</h3>
                <p className="text-gray-600 text-sm">
                  {"которые хотят научиться жить в своём ритме без чувства вины.\n"}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-purple-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Всех, кто хочет перестать бороться со временем</h3>
                <p className="text-gray-600 text-sm">{"и построить систему, которая поддерживает, а не давит.\n"}</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-12 py-4 text-lg"
              >
                Зарегистрироваться на вебинар
              </Button>
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
                    <p className="text-lg text-emerald-600 font-medium">
                      Ментор и бизнес-тренер, основатель и CEO агентства Choosy
                    </p>
                  </div>

                  <blockquote className="text-lg text-gray-700 italic border-l-4 border-emerald-600 pl-4">
                    &quot;Планирование - это не диета, а изменение поведения&quot;
                  </blockquote>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="text-2xl font-bold text-emerald-600">130+</div>
                      <div className="text-sm text-gray-600">проведенных корпоративных тренингов </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">13+</div>
                      <div className="text-sm text-gray-600">лет опыта в консалтинге и HR in-house </div>
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

      {/* About Company Section */}
      <section
        className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-white to-gray-50 border-t border-gray-100"
        id="about"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Моя философия</h2>
            </div>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Я очень люблю время. Оно для меня — самая ценная валюта, которая у нас есть. И мне правда грустно, когда
                я вижу, как у кого-то оно просто &quot;утекает сквозь пальцы&quot; — на хаос, на тревогу, на жизнь
                &quot;на потом&quot;.
              </p>

              <p>
                Мне очень хочется, чтобы мы перестали сражаться со временем. Чтобы научились обращаться с ним бережно —
                планировать без давления, жить осознанно, выбирать важное, а не срочное.
              </p>

              <p>
                Хочется, чтобы у каждого появилось ощущение, что <strong>время — не враг, а союзник</strong>, и что
                планировать (и жить) можно красиво, спокойно и по-своему.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-emerald-50 to-white border-t border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Регистрируйтесь сейчас</h2>
                <p className="text-lg text-gray-600">
                  Чтобы узнать, как получить то самое ощущение, когда все идет по плану
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span>Онлайн формат, запись останется с вами навсегда</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span>Дата и время (скоро будут)</span>
                </div>
              </div>

              <div className="text-center py-6 border-t border-gray-100">
                <div className="text-3xl font-bold text-gray-900 mb-4">2700 рублей</div>
                <Button
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-12 py-6 text-lg"
                >
                  КУПИТЬ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Присоединяйтесь к нашему сообществу
            </h2>
            <p className="text-lg sm:text-xl text-emerald-100">
              Узнавайте первыми о новых вебинарах и получайте полезные материалы
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-emerald-100">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Регулярные мероприятия</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Активное сообщество</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-emerald-600 font-medium px-12 py-4 text-lg"
            >
              Зарегистрироваться сейчас
            </Button>
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
                  Жизнь CEO наизнанку
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                  {
                    "Присоединяйтесь и узнаете, как в одном календаре я умещаю бизнес, семью, спорт и любовь к шампанскому."
                  }
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
                    className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-white" />
                  </a>
                  <a
                    href="https://t.me/zakirova_anna_az"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors"
                  >
                    <Send className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Choosy Recruitment. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
