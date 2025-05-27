import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl">💱</div>
            <span className="text-xl font-bold">P2P Exchange</span>
          </div>

          {/* Навигационное меню */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Торговля
            </a>
            <a
              href="#"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Мои ордера
            </a>
            <a
              href="#"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              История
            </a>
            <a
              href="#"
              className="hover:text-blue-200 transition-colors font-medium"
            >
              Поддержка
            </a>
          </div>

          {/* Поиск и действия */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <Input
                type="search"
                placeholder="Поиск пользователей..."
                className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>

            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Войти
            </Button>

            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Регистрация
            </Button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className="md:hidden bg-blue-800 px-4 py-3 space-y-2">
        <a href="#" className="block py-2 hover:text-blue-200">
          Торговля
        </a>
        <a href="#" className="block py-2 hover:text-blue-200">
          Мои ордера
        </a>
        <a href="#" className="block py-2 hover:text-blue-200">
          История
        </a>
        <a href="#" className="block py-2 hover:text-blue-200">
          Поддержка
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
