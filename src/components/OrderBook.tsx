import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  user: string;
  amount: string;
  price: string;
  currency: string;
  paymentMethods: string[];
  type: "buy" | "sell";
  rating: number;
  completedTrades: number;
}

const OrderBook = () => {
  const orders: Order[] = [
    {
      id: "1",
      user: "CryptoTrader123",
      amount: "50,000",
      price: "95.80",
      currency: "USDT",
      paymentMethods: ["Сбербанк", "Тинькофф"],
      type: "sell",
      rating: 4.9,
      completedTrades: 342,
    },
    {
      id: "2",
      user: "BlockchainKing",
      amount: "100,000",
      price: "95.75",
      currency: "USDT",
      paymentMethods: ["ВТБ", "Альфа-Банк", "Райффайзен"],
      type: "sell",
      rating: 4.8,
      completedTrades: 158,
    },
    {
      id: "3",
      user: "P2PMaster",
      amount: "25,000",
      price: "95.90",
      currency: "USDT",
      paymentMethods: ["СберБанк"],
      type: "sell",
      rating: 5.0,
      completedTrades: 89,
    },
    {
      id: "4",
      user: "CoinExchange",
      amount: "75,000",
      price: "95.20",
      currency: "USDT",
      paymentMethods: ["Тинькофф", "ВТБ"],
      type: "buy",
      rating: 4.7,
      completedTrades: 267,
    },
  ];

  const sellOrders = orders.filter((order) => order.type === "sell");
  const buyOrders = orders.filter((order) => order.type === "buy");

  const OrderRow = ({ order }: { order: Order }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-semibold text-gray-900">{order.user}</span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm text-gray-600">{order.rating}</span>
            <span className="text-xs text-gray-500">
              ({order.completedTrades})
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {order.paymentMethods.map((method, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {method}
            </Badge>
          ))}
        </div>
      </div>

      <div className="text-right mr-4">
        <div className="font-bold text-lg">{order.price} ₽</div>
        <div className="text-sm text-gray-600">Лимит: {order.amount} ₽</div>
      </div>

      <Button
        size="sm"
        className={
          order.type === "sell"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-red-600 hover:bg-red-700"
        }
      >
        {order.type === "sell" ? "Купить" : "Продать"}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-600">
            🟢 Продажа USDT
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {sellOrders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-red-600">
            🔴 Покупка USDT
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {buyOrders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderBook;
