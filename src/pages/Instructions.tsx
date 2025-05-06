import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";

const Instructions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <Header />
      
      {/* Отступ для фиксированного хедера */}
      <div className="pt-16"></div>

      {/* Основной контент */}
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Как активировать подарочную карту Apple</h1>
          
          <div className="max-w-3xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=800&auto=format&fit=crop" 
                    alt="Apple Gift Card activation" 
                    className="w-full max-w-md rounded-lg shadow-sm"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  После покупки подарочной карты Apple вы получите код активации на ваш email. 
                  Ниже приведены простые шаги по активации вашей карты и добавлению средств на ваш Apple ID.
                </p>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-6">Пошаговая инструкция</h2>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="step-1">
                <AccordionTrigger className="text-left text-lg font-medium">
                  Шаг 1: Откройте App Store или iTunes Store
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-3 pb-4">
                  <p>На вашем устройстве Apple (iPhone, iPad, Mac) откройте App Store или iTunes Store.</p>
                  <p>На iOS/iPadOS: нажмите на иконку своего профиля в правом верхнем углу.</p>
                  <p>На Mac: нажмите на свое имя в нижнем левом углу или выберите "Учетная запись" в верхнем меню.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-2">
                <AccordionTrigger className="text-left text-lg font-medium">
                  Шаг 2: Найдите раздел для активации
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-3 pb-4">
                  <p>В App Store: прокрутите вниз до раздела "Активировать карту или код" и нажмите на нее.</p>
                  <p>В iTunes Store: выберите "Активировать" в нижней части окна или найдите "Использовать код" в меню "Учетная запись".</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-3">
                <AccordionTrigger className="text-left text-lg font-medium">
                  Шаг 3: Введите код активации
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-3 pb-4">
                  <p>Введите 16-значный код активации, который был отправлен на ваш email после покупки.</p>
                  <p>Убедитесь, что вводите код без ошибок, пробелов или дополнительных символов.</p>
                  <p>Если ваше устройство имеет камеру, вы можете выбрать "Сканировать код" и навести камеру на QR-код (если он предоставлен).</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-4">
                <AccordionTrigger className="text-left text-lg font-medium">
                  Шаг 4: Подтвердите активацию
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 space-y-3 pb-4">
                  <p>После успешного ввода кода вы получите подтверждение активации.</p>
                  <p>Средства будут немедленно зачислены на ваш Apple ID и станут доступны для использования во всех сервисах Apple.</p>
                  <p>Вы можете проверить баланс своего счета в разделе "Apple ID" в настройках устройства.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Важные примечания</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Активированные карты не подлежат возврату или обмену.</li>
                  <li>Средства действительны только для учетной записи Apple ID, на которую они были зачислены.</li>
                  <li>Подарочные карты не имеют срока действия и могут использоваться в любое время.</li>
                  <li>При возникновении проблем с активацией обратитесь в службу поддержки Apple.</li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <Link to="/products" className="text-blue-600 hover:underline">
                Вернуться к выбору карт
              </Link>
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