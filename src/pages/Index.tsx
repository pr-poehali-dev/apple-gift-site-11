import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <Header />
      
      {/* Отступ для фиксированного хедера */}
      <div className="pt-16"></div>

      {/* Hero секция с большим изображением Apple */}
      <section className="relative h-[80vh] overflow-hidden bg-black">
        <img 
          src="https://images.unsplash.com/photo-1591815302525-756a9bcc3425?q=80&w=2000&auto=format&fit=crop" 
          alt="Apple premium" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-40 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">Подарочные карты Apple</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl text-center font-light">
            Идеальный подарок для поклонников Apple. Откройте мир приложений, музыки и многого другого.
          </p>
          <Button asChild size="lg" className="text-lg px-8 bg-white text-black hover:bg-gray-200 hover:text-black">
            <Link to="/products">Выбрать карту</Link>
          </Button>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Почему выбирают наши карты</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="text-4xl mb-6">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Безопасно</h3>
              <p className="text-gray-600">Мгновенная активация и защищенные коды для максимальной безопасности ваших покупок</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Быстро</h3>
              <p className="text-gray-600">Получение кода сразу после оплаты — никаких задержек и ожиданий</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-6">🎁</div>
              <h3 className="text-xl font-semibold mb-3">Универсально</h3>
              <p className="text-gray-600">Используйте для всех сервисов Apple: App Store, Apple Music, iCloud и многих других</p>
            </div>
          </div>
        </div>
      </section>

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