import React from "react";
import Navigation from "@/components/Navigation";
import TradingPanel from "@/components/TradingPanel";
import OrderBook from "@/components/OrderBook";
import StatsCards from "@/components/StatsCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-p2p-dark">
      <Navigation />

      {/* Главный контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero секция */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Безопасный P2P обмен криптовалют
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Торгуйте напрямую с другими пользователями по лучшим курсам. Быстро,
            надежно и без лишних комиссий.
          </p>
        </div>

        {/* Статистика */}
        <div className="mb-12">
          <StatsCards />
        </div>

        {/* Основная торговая панель */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Панель торговли */}
          <div className="lg:col-span-1">
            <TradingPanel />
          </div>

          {/* Книга ордеров */}
          <div className="lg:col-span-2">
            <OrderBook />
          </div>
        </div>

        {/* Преимущества */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-p2p-darker rounded-lg border border-p2p-gray">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2 text-white">
              Безопасность
            </h3>
            <p className="text-gray-300">
              Эскроу-система и проверенные пользователи гарантируют безопасность
              сделок
            </p>
          </div>

          <div className="text-center p-6 bg-p2p-darker rounded-lg border border-p2p-gray">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2 text-white">Скорость</h3>
            <p className="text-gray-300">
              Мгновенное исполнение ордеров и быстрые переводы
            </p>
          </div>

          <div className="text-center p-6 bg-p2p-darker rounded-lg border border-p2p-gray">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-lg font-semibold mb-2 text-white">Выгода</h3>
            <p className="text-gray-300">
              Минимальные комиссии и лучшие курсы на рынке
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
