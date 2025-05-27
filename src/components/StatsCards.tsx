import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatsCards = () => {
  const stats = [
    {
      title: "USD/RUB",
      value: "95.50",
      change: "+0.25",
      changePercent: "+0.26%",
      isPositive: true,
    },
    {
      title: "EUR/RUB",
      value: "104.20",
      change: "-0.15",
      changePercent: "-0.14%",
      isPositive: false,
    },
    {
      title: "BTC/USD",
      value: "43,250",
      change: "+1,120",
      changePercent: "+2.66%",
      isPositive: true,
    },
    {
      title: "ETH/USD",
      value: "2,580",
      change: "+45",
      changePercent: "+1.78%",
      isPositive: true,
    },
  ];

  const platformStats = [
    { label: "Активные ордера", value: "1,234", icon: "📊" },
    { label: "Пользователи онлайн", value: "5,678", icon: "👥" },
    { label: "Сделок за 24ч", value: "892", icon: "💼" },
    { label: "Объем торгов", value: "₽45.2M", icon: "💰" },
  ];

  return (
    <div className="space-y-6">
      {/* Курсы валют */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <Badge
                  variant={stat.isPositive ? "default" : "destructive"}
                  className={
                    stat.isPositive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {stat.changePercent}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p
                  className={`text-sm ${stat.isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Статистика платформы */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">
            Статистика платформы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
