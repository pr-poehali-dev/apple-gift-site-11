
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-medium">Apple Gift Card</Link>
          <nav className="flex gap-6">
            <Link to="/" className="text-sm hover:text-gray-600">Главная</Link>
            <Link to="/products" className="text-sm hover:text-gray-600">Карты</Link>
            <Link to="/instructions" className="text-sm hover:text-gray-600">Инструкция</Link>
          </nav>
        </div>
      </header>

      {/* Главная секция */}
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Подарочные карты Apple</h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Идеальный подарок для всех, кто ценит продукты Apple. 
              Используйте для покупок в App Store, Apple Music и других сервисах.
            </p>
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/products">Выбрать карту</Link>
            </Button>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают наши карты</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-2xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Безопасно</h3>
                <p className="text-gray-600">Мгновенная активация и защищенные коды</p>
              </div>
              <div className="text-center p-6">
                <div className="text-2xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Быстро</h3>
                <p className="text-gray-600">Получение кода сразу после оплаты</p>
              </div>
              <div className="text-center p-6">
                <div className="text-2xl mb-4">🎁</div>
                <h3 className="text-xl font-semibold mb-2">Универсально</h3>
                <p className="text-gray-600">Для всех сервисов Apple и App Store</p>
              </div>
            </div>
          </div>
        </section>
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

export default Index;
