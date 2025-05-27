import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: "buyer" | "seller" | "system";
  text: string;
  timestamp: Date;
  type?: "text" | "image" | "file";
}

interface ChatProps {
  orderId: string;
  currentUser: "buyer" | "seller";
  onClose: () => void;
}

const P2PChat = ({ orderId, currentUser, onClose }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      text: "Сделка началась. Пожалуйста, соблюдайте правила платформы.",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "seller",
      text: "Привет! Готов к сделке. Переводите по указанным реквизитам.",
      timestamp: new Date(),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [tradeStatus, setTradeStatus] = useState<
    "pending" | "paid" | "completed" | "dispute"
  >("pending");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleTradeAction = (action: "paid" | "received" | "dispute") => {
    let systemMessage = "";

    switch (action) {
      case "paid":
        systemMessage =
          "Покупатель подтвердил оплату. Ожидается подтверждение получения от продавца.";
        setTradeStatus("paid");
        break;
      case "received":
        systemMessage =
          "Продавец подтвердил получение оплаты. Средства переведены покупателю.";
        setTradeStatus("completed");
        break;
      case "dispute":
        systemMessage =
          "Открыт спор. Средства заморожены. Администратор рассмотрит обращение.";
        setTradeStatus("dispute");
        break;
    }

    const message: Message = {
      id: Date.now().toString(),
      sender: "system",
      text: systemMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
  };

  return (
    <Card className="w-full max-w-2xl bg-p2p-dark border-p2p-gray">
      <CardHeader className="border-b border-p2p-gray">
        <div className="flex justify-between items-center">
          <CardTitle className="text-p2p-green">
            Чат по сделке #{orderId}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              variant={tradeStatus === "completed" ? "default" : "secondary"}
              className={
                tradeStatus === "completed"
                  ? "bg-p2p-success"
                  : "bg-p2p-warning"
              }
            >
              {tradeStatus === "pending" && "Ожидание"}
              {tradeStatus === "paid" && "Оплачено"}
              {tradeStatus === "completed" && "Завершено"}
              {tradeStatus === "dispute" && "Спор"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Сообщения */}
        <ScrollArea className="h-96 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === currentUser
                    ? "justify-end"
                    : message.sender === "system"
                      ? "justify-center"
                      : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === currentUser
                      ? "bg-p2p-green text-white"
                      : message.sender === "system"
                        ? "bg-p2p-gray text-gray-300 text-center text-sm"
                        : "bg-p2p-gray-light text-white"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Действия по сделке */}
        {tradeStatus !== "completed" && tradeStatus !== "dispute" && (
          <div className="border-t border-p2p-gray p-4 space-y-3">
            <div className="text-sm text-gray-300 mb-2">
              Действия по сделке:
            </div>
            <div className="flex flex-wrap gap-2">
              {currentUser === "buyer" && tradeStatus === "pending" && (
                <Button
                  size="sm"
                  className="bg-p2p-success hover:bg-green-600"
                  onClick={() => handleTradeAction("paid")}
                >
                  Я оплатил
                </Button>
              )}

              {currentUser === "seller" && tradeStatus === "paid" && (
                <Button
                  size="sm"
                  className="bg-p2p-success hover:bg-green-600"
                  onClick={() => handleTradeAction("received")}
                >
                  Получил оплату
                </Button>
              )}

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleTradeAction("dispute")}
              >
                Открыть спор
              </Button>
            </div>
          </div>
        )}

        {/* Ввод сообщений */}
        {tradeStatus !== "completed" && (
          <div className="border-t border-p2p-gray p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="bg-p2p-darker border-p2p-gray"
                disabled={tradeStatus === "dispute"}
              />
              <Button
                onClick={sendMessage}
                className="bg-p2p-green hover:bg-p2p-green-dark"
                disabled={tradeStatus === "dispute"}
              >
                Отправить
              </Button>
            </div>
            {tradeStatus === "dispute" && (
              <p className="text-sm text-yellow-500 mt-2">
                Чат заблокирован до разрешения спора администратором
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default P2PChat;
