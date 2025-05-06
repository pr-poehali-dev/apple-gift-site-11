import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Icon name="Apple" className="h-6 w-6" />
          <span className="text-xl font-medium">Apple Gift Card</span>
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-sm hover:text-gray-600">Главная</Link>
          <Link to="/products" className="text-sm hover:text-gray-600">Карты</Link>
          <Link to="/instructions" className="text-sm hover:text-gray-600">Инструкция</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;