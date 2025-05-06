import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const giftCards = [
  {
    id: "1000",
    title: "Apple Gift Card",
    price: 1000,
    description: "Идеально для небольших покупок в App Store, Apple Music или для пополнения Apple ID.",
    image: "https://images.unsplash.com/photo-1662644828005-778cb9807519?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "2500",
    title: "Apple Gift Card",
    price: 2500,
    description: "Оптимальный выбор для покупки игр, приложений или подписки на Apple сервисы.",
    image: "https://images.unsplash.com/photo-1607582544956-46e4a4312db1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "5000",
    title: "Apple Gift Card",
    price: 5000,
    description: "Максимальная свобода выбора для любых покупок в экосистеме Apple.",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=800&auto=format&fit=crop"
  }
];

const Products = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <Header />
      
      {/* Отступ для фиксированного хедера */}
      <div className="pt-16"></div>

      {/* Основной контент */}
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Выберите номинал</h1>
            
          <div className="grid md:grid-cols-3 gap-8">
            {giftCards.map((card) => (
              <Card key={card.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={`Apple Gift Card ${card.price} руб.`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <h3 className="text-2xl font-bold">{card.price} ₽</h3>
                  <p className="text-gray-500">{card.title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{card.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Купить</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
            
          <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Информация о покупке</h2>
            <p className="text-gray-600 mb-4">
              После оплаты вы моментально получите код активации карты на указанный email.
              Коды активны и готовы к использованию сразу после покупки.
            </p>
            <Link to="/instructions" className="text-blue-600 hover:underline">
              Узнать, как активировать карту
            </Link>
          </div>
        </div>
      </main>
      
      {/* Подвал */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Apple Gift Card. Все права защищены.</p>
          <p className="mt-2">
            Apple, логотип Apple, App Store являются товарными знаками Apple Inc., зарегистрированными в США и других странах.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Products;