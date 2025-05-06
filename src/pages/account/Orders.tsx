
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

interface Order {
  id: string;
  date: string;
  status: "completed" | "processing" | "cancelled";
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          window.location.href = "/login";
          return;
        }
        
        const response = await fetch("YOUR_API_URL/user/orders", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Не удалось загрузить историю заказов");
        }
        
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        toast({
          title: "Ошибка",
          description: error instanceof Error ? error.message : "Не удалось загрузить историю заказов",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handleRepeatOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`YOUR_API_URL/orders/repeat/${orderId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Не удалось повторить заказ");
      }
      
      toast({
        title: "Успешно",
        description: "Заказ успешно повторен",
      });
      
      // Перенаправление на страницу оформления заказа или корзины
      // window.location.href = "/checkout";
      
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось повторить заказ",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Выполнен</span>;
      case "processing":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">В обработке</span>;
      case "cancelled":
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Отменен</span>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Icon name="Loader2" className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">История заказов</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="ShoppingBag" className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">У вас пока нет заказов</h2>
          <p className="text-gray-500 mb-4">Ваши заказы будут отображаться здесь после совершения покупки</p>
          <Button asChild>
            <a href="/products">Перейти к покупкам</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-base">Заказ #{order.id}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {getStatusBadge(order.status)}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRepeatOrder(order.id)}
                    >
                      <Icon name="Repeat" className="h-4 w-4 mr-1" />
                      Повторить
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {order.items.map((item, index) => (
                  <div key={item.id} className="mb-2">
                    <div className="flex justify-between py-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{item.price * item.quantity} ₽</p>
                    </div>
                    {index < order.items.length - 1 && <Separator />}
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 mt-4 border-t">
                  <p className="font-bold">Итого</p>
                  <p className="font-bold">{order.total} ₽</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
