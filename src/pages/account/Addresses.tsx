
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          window.location.href = "/login";
          return;
        }
        
        const response = await fetch("YOUR_API_URL/user/addresses", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error("Не удалось загрузить адреса");
        }
        
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        toast({
          title: "Ошибка",
          description: error instanceof Error ? error.message : "Не удалось загрузить адреса",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAddresses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentAddress(null);
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Россия",
      isDefault: addresses.length === 0, // Если это первый адрес, делаем его по умолчанию
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (address: Address) => {
    setIsEditing(true);
    setCurrentAddress(address);
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот адрес?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`YOUR_API_URL/user/addresses/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Не удалось удалить адрес");
      }
      
      setAddresses(addresses.filter(address => address.id !== id));
      
      toast({
        title: "Успешно",
        description: "Адрес был удален",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось удалить адрес",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      
      const url = isEditing 
        ? `YOUR_API_URL/user/addresses/${currentAddress?.id}` 
        : "YOUR_API_URL/user/addresses";
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Не удалось ${isEditing ? 'обновить' : 'добавить'} адрес`);
      }
      
      const data = await response.json();
      
      if (isEditing) {
        setAddresses(addresses.map(addr => 
          addr.id === currentAddress?.id ? data : addr
        ));
      } else {
        setAddresses([...addresses, data]);
      }
      
      setIsDialogOpen(false);
      
      toast({
        title: "Успешно",
        description: `Адрес был ${isEditing ? 'обновлен' : 'добавлен'}`,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : `Не удалось ${isEditing ? 'обновить' : 'добавить'} адрес`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`YOUR_API_URL/user/addresses/${id}/default`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Не удалось установить адрес по умолчанию");
      }
      
      // Обновляем локальный список адресов
      setAddresses(addresses.map(address => ({
        ...address,
        isDefault: address.id === id
      })));
      
      toast({
        title: "Успешно",
        description: "Адрес по умолчанию обновлен",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось установить адрес по умолчанию",
        variant: "destructive",
      });
    }
  };

  if (isLoading && addresses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Icon name="Loader2" className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Адреса доставки</h1>
        <Button onClick={handleAddNew}>
          <Icon name="Plus" className="mr-2 h-4 w-4" />
          Добавить адрес
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="MapPin" className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold mb-2">У вас пока нет сохраненных адресов</h2>
          <p className="text-gray-500 mb-4">Добавьте адрес для быстрого оформления заказа</p>
          <Button onClick={handleAddNew}>Добавить адрес</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  {address.name}
                  {address.isDefault && (
                    <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      По умолчанию
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p>{address.street}</p>
                <p>{address.city}, {address.state}, {address.postalCode}</p>
                <p>{address.country}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(address)}>
                  <Icon name="Edit" className="h-4 w-4 mr-1" />
                  Изменить
                </Button>
                <div className="space-x-2">
                  {!address.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Сделать основным
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Icon name="Trash" className="h-4 w-4 mr-1" />
                    Удалить
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Диалог добавления/редактирования адреса */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Редактировать адрес" : "Добавить новый адрес"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Название адреса (например, "Дом" или "Работа")
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="street" className="text-sm font-medium">
                Улица и номер дома
              </label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">
                  Город
                </label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium">
                  Область/Край
                </label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="postalCode" className="text-sm font-medium">
                  Почтовый индекс
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">
                  Страна
                </label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="isDefault" className="text-sm font-medium">
                Использовать как адрес по умолчанию
              </label>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  "Сохранить"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Addresses;
