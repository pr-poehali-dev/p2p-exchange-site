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
import { Checkbox } from "@/components/ui/checkbox";

interface FilterState {
  amount: { min: string; max: string };
  fiatCurrency: string;
  cryptoCurrency: string;
  paymentMethods: string[];
  userRating: string;
  orderType: "all" | "buy" | "sell";
}

const OrderFilters = ({
  onFiltersChange,
}: {
  onFiltersChange: (filters: FilterState) => void;
}) => {
  const [filters, setFilters] = useState<FilterState>({
    amount: { min: "", max: "" },
    fiatCurrency: "RUB",
    cryptoCurrency: "USDT",
    paymentMethods: [],
    userRating: "all",
    orderType: "all",
  });

  const fiatCurrencies = [
    { code: "RUB", name: "Российский рубль", symbol: "₽" },
    { code: "USD", name: "Доллар США", symbol: "$" },
    { code: "EUR", name: "Евро", symbol: "€" },
    { code: "GBP", name: "Фунт стерлингов", symbol: "£" },
    { code: "CNY", name: "Китайский юань", symbol: "¥" },
    { code: "UAH", name: "Украинская гривна", symbol: "₴" },
    { code: "KZT", name: "Казахский тенге", symbol: "₸" },
    { code: "BYN", name: "Белорусский рубль", symbol: "Br" },
    { code: "TRY", name: "Турецкая лира", symbol: "₺" },
    { code: "INR", name: "Индийская рупия", symbol: "₹" },
  ];

  const cryptoCurrencies = [
    { code: "USDT", name: "Tether" },
    { code: "BTC", name: "Bitcoin" },
    { code: "ETH", name: "Ethereum" },
    { code: "BNB", name: "Binance Coin" },
    { code: "USDC", name: "USD Coin" },
    { code: "ADA", name: "Cardano" },
    { code: "SOL", name: "Solana" },
    { code: "DOT", name: "Polkadot" },
  ];

  const paymentSystems = [
    "Сбербанк",
    "Тинькофф",
    "ВТБ",
    "Альфа-Банк",
    "Райффайзен",
    "Газпромбанк",
    "Росбанк",
    "Открытие",
    "ЮМoney",
    "QIWI",
    "WebMoney",
    "Payeer",
    "Perfect Money",
    "AdvCash",
    "Binance Pay",
    "Wise",
    "PayPal",
    "Skrill",
    "Neteller",
    "Revolut",
    "Kaspi Bank",
    "Halyk Bank",
    "Belarusbank",
    "MTBank",
    "Ziraat Bank",
    "Akbank",
    "Paytm",
    "UPI",
    "Alipay",
    "WeChat Pay",
    "Bank Transfer",
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const togglePaymentMethod = (method: string) => {
    const current = filters.paymentMethods;
    const updated = current.includes(method)
      ? current.filter((m) => m !== method)
      : [...current, method];
    updateFilter("paymentMethods", updated);
  };

  return (
    <Card className="bg-p2p-dark border-p2p-gray">
      <CardHeader>
        <CardTitle className="text-p2p-green">Фильтры поиска</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Тип ордера */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Тип операции
          </label>
          <div className="flex space-x-2">
            {[
              { value: "all", label: "Все" },
              { value: "buy", label: "Купить" },
              { value: "sell", label: "Продать" },
            ].map((option) => (
              <Button
                key={option.value}
                variant={
                  filters.orderType === option.value ? "default" : "outline"
                }
                size="sm"
                className={
                  filters.orderType === option.value
                    ? "bg-p2p-green"
                    : "border-p2p-gray"
                }
                onClick={() => updateFilter("orderType", option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Валюты */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Фиат валюта
            </label>
            <Select
              value={filters.fiatCurrency}
              onValueChange={(value) => updateFilter("fiatCurrency", value)}
            >
              <SelectTrigger className="bg-p2p-darker border-p2p-gray">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-p2p-darker border-p2p-gray">
                {fiatCurrencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Криптовалюта
            </label>
            <Select
              value={filters.cryptoCurrency}
              onValueChange={(value) => updateFilter("cryptoCurrency", value)}
            >
              <SelectTrigger className="bg-p2p-darker border-p2p-gray">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-p2p-darker border-p2p-gray">
                {cryptoCurrencies.map((crypto) => (
                  <SelectItem key={crypto.code} value={crypto.code}>
                    {crypto.code} - {crypto.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Сумма */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Сумма</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Мин"
              value={filters.amount.min}
              onChange={(e) =>
                updateFilter("amount", {
                  ...filters.amount,
                  min: e.target.value,
                })
              }
              className="bg-p2p-darker border-p2p-gray"
            />
            <Input
              placeholder="Макс"
              value={filters.amount.max}
              onChange={(e) =>
                updateFilter("amount", {
                  ...filters.amount,
                  max: e.target.value,
                })
              }
              className="bg-p2p-darker border-p2p-gray"
            />
          </div>
        </div>

        {/* Платежные системы */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Платежные системы
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {paymentSystems.map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <Checkbox
                  id={method}
                  checked={filters.paymentMethods.includes(method)}
                  onCheckedChange={() => togglePaymentMethod(method)}
                />
                <label
                  htmlFor={method}
                  className="text-xs text-gray-300 cursor-pointer"
                >
                  {method}
                </label>
              </div>
            ))}
          </div>
          {filters.paymentMethods.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {filters.paymentMethods.map((method) => (
                <Badge
                  key={method}
                  variant="secondary"
                  className="text-xs bg-p2p-green text-white"
                >
                  {method}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Рейтинг */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Минимальный рейтинг
          </label>
          <Select
            value={filters.userRating}
            onValueChange={(value) => updateFilter("userRating", value)}
          >
            <SelectTrigger className="bg-p2p-darker border-p2p-gray">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-p2p-darker border-p2p-gray">
              <SelectItem value="all">Любой</SelectItem>
              <SelectItem value="4.5">4.5+ ⭐</SelectItem>
              <SelectItem value="4.0">4.0+ ⭐</SelectItem>
              <SelectItem value="3.5">3.5+ ⭐</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full bg-p2p-green hover:bg-p2p-green-dark"
          onClick={() => onFiltersChange(filters)}
        >
          Применить фильтры
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderFilters;
