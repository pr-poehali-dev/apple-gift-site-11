
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AccountLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const handleLogout = () => {
    // Удаляем токен из localStorage
    localStorage.removeItem("token");
    window.location.href = "/login"; // Редирект на страницу входа
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Отступ для фиксированного хедера */}
      <div className="pt-16"></div>
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Боковая навигация */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-bold text-lg mb-4">Личный кабинет</h2>
              <nav className="space-y-2">
                <Link to="/account">
                  <Button 
                    variant={path === "/account" ? "default" : "ghost"} 
                    className="w-full justify-start"
                  >
                    <Icon name="User" className="mr-2 h-4 w-4" />
                    Профиль
                  </Button>
                </Link>
                
                <Link to="/account/orders">
                  <Button 
                    variant={path === "/account/orders" ? "default" : "ghost"} 
                    className="w-full justify-start"
                  >
                    <Icon name="ShoppingBag" className="mr-2 h-4 w-4" />
                    История заказов
                  </Button>
                </Link>
                
                <Link to="/account/addresses">
                  <Button 
                    variant={path === "/account/addresses" ? "default" : "ghost"} 
                    className="w-full justify-start"
                  >
                    <Icon name="MapPin" className="mr-2 h-4 w-4" />
                    Адреса доставки
                  </Button>
                </Link>
                
                <Link to="/account/settings">
                  <Button 
                    variant={path === "/account/settings" ? "default" : "ghost"} 
                    className="w-full justify-start"
                  >
                    <Icon name="Settings" className="mr-2 h-4 w-4" />
                    Настройки
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <Icon name="LogOut" className="mr-2 h-4 w-4" />
                  Выйти
                </Button>
              </nav>
            </div>
          </aside>
          
          {/* Основной контент */}
          <main className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <Outlet />
          </main>
        </div>
      </div>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Apple Gift Card. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default AccountLayout;
