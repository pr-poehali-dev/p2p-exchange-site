import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const TradingPanel = () => {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("RUB");
  const [toCurrency, setToCurrency] = useState("USDT");

  const currencies = [
    { code: "RUB", name: "Рублы", rate: "95.50" },
    { code: "USD", name: "Доллары", rate: "1.00" },
    { code: "EUR", name: "Евро", rate: "0.92" },
    { code: "USDT", name: "Tether", rate: "1.00" },
    { code: "BTC", name: "Bitcoin", rate: "0.000023" },
    { code: "ETH", name: "Ethereum", rate: "0.00041" },
  ];

  const currentRate = tradeType === "buy" ? "95.80" : "95.20";

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center">
          P2P Обмен
        </CardTitle>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            variant={tradeType === "buy" ? "default" : "ghost"}
            className={`flex-1 ${tradeType === "buy" ? "bg-green-600 hover:bg-green-700" : ""}`}
            onClick={() => setTradeType("buy")}
          >
            Купить
          </Button>
          <Button
            variant={tradeType === "sell" ? "default" : "ghost"}
            className={`flex-1 ${tradeType === "sell" ? "bg-red-600 hover:bg-red-700" : ""}`}
            onClick={() => setTradeType("sell")}
          >
            Продать
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Отдаю</label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-blue-100 rounded-full p-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Получаю</label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Сумма"
              value={
                amount
                  ? (parseFloat(amount) * parseFloat(currentRate)).toFixed(2)
                  : ""
              }
              readOnly
              className="flex-1 bg-gray-50"
            />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center text-sm">
            <span>Курс:</span>
            <Badge variant="secondary">
              {currentRate} {fromCurrency}/{toCurrency}
            </Badge>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span>Комиссия:</span>
            <span className="text-green-600">0%</span>
          </div>
        </div>

        <Button
          className={`w-full py-3 text-white font-semibold ${
            tradeType === "buy"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={!amount}
        >
          {tradeType === "buy" ? "Найти продавцов" : "Найти покупателей"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TradingPanel;
