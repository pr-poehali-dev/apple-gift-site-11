
import LoginForm from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Отступ для фиксированного хедера */}
      <div className="pt-16"></div>
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <LoginForm />
            
            <div className="text-center mt-8">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Вернуться на главную
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Apple Gift Card. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
