
import { Link } from "react-router-dom";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const Instructions = () => {
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

      {/* Основной контент */}
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12">Как использовать подарочную карту</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Инструкция по активации</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Получите код</h3>
                    <p className="text-gray-600">
                      После оплаты вы получите код активации на указанный вами email адрес. 
                      Сохраните его для дальнейшего использования.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Откройте App Store</h3>
                    <p className="text-gray-600">
                      На вашем устройстве Apple (iPhone, iPad, Mac) откройте приложение App Store. 
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Войдите в свой аккаунт</h3>
                    <p className="text-gray-600">
                      Убедитесь, что вы вошли в свой Apple ID аккаунт, на который хотите зачислить средства.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Введите код активации</h3>
                    <p className="text-gray-600">
                      На устройстве iOS: нажмите на иконку вашего профиля в верхнем правом углу App Store, затем выберите "Погасить подарочную карту или код" и введите полученный код.<br/>
                      На Mac: нажмите на свое имя в нижней части боковой панели App Store, выберите "Погасить подарочную карту" и введите код.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center flex-shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Готово!</h3>
                    <p className="text-gray-600">
                      После подтверждения средства будут зачислены на ваш Apple ID и станут доступны для покупок в App Store, iTunes Store, Apple Music и других сервисах Apple.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>На что можно потратить средства подарочной карты?</AccordionTrigger>
                  <AccordionContent>
                    Средства на вашем Apple ID можно использовать для покупки приложений, игр, музыки, фильмов, книг, 
                    а также для оплаты подписок на Apple Music, Apple TV+, Apple Arcade, iCloud и другие сервисы Apple.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Есть ли срок действия у подарочной карты?</AccordionTrigger>
                  <AccordionContent>
                    Подарочные карты Apple не имеют срока действия. Однако рекомендуется активировать карту как можно скорее 
                    после получения, чтобы избежать возможной потери кода.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Можно ли вернуть деньги за активированную карту?</AccordionTrigger>
                  <AccordionContent>
                    К сожалению, после активации подарочной карты возврат средств невозможен. Это связано с политикой 
                    Apple относительно цифровых кодов.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Как проверить баланс на Apple ID?</AccordionTrigger>
                  <AccordionContent>
                    На устройстве iOS: откройте App Store, нажмите на иконку профиля и ваш баланс будет отображен под вашим именем.<br/>
                    На Mac: откройте App Store, нажмите на свое имя внизу боковой панели, и баланс будет показан в появившемся окне.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Что делать, если код не работает?</AccordionTrigger>
                  <AccordionContent>
                    Если у вас возникли проблемы с активацией кода, пожалуйста, обратитесь в нашу службу поддержки по email: 
                    support@applegiftcard.ru. Мы поможем вам решить проблему в кратчайшие сроки.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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

export default Instructions;
