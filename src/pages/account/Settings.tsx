
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch("YOUR_API_URL/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      
      if (!response.ok) {
        throw new Error("Не удалось сохранить настройки");
      }
      
      toast({
        title: "Успешно",
        description: "Настройки сохранены",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось сохранить настройки",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Новые пароли не совпадают",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch("YOUR_API_URL/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });
      
      if (!response.ok) {
        throw new Error("Не удалось изменить пароль");
      }
      
      setShowPasswordDialog(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Успешно",
        description: "Пароль успешно изменен",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось изменить пароль",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch("YOUR_API_URL/user/delete-account", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Не удалось удалить аккаунт");
      }
      
      // Очищаем localStorage и перенаправляем на главную
      localStorage.removeItem("token");
      window.location.href = "/";
      
      toast({
        title: "Аккаунт удален",
        description: "Ваш аккаунт был успешно удален",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось удалить аккаунт",
        variant: "destructive",
      });
      setShowDeleteDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Уведомления</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email уведомления</p>
                <p className="text-sm text-gray-500">Получать уведомления о заказах по email</p>
              </div>
              <Switch 
                checked={settings.emailNotifications} 
                onCheckedChange={() => handleSettingChange("emailNotifications")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS уведомления</p>
                <p className="text-sm text-gray-500">Получать уведомления о заказах по SMS</p>
              </div>
              <Switch 
                checked={settings.smsNotifications} 
                onCheckedChange={() => handleSettingChange("smsNotifications")}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Безопасность</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Двухфакторная аутентификация</p>
                <p className="text-sm text-gray-500">Дополнительный уровень защиты для вашего аккаунта</p>
              </div>
              <Switch 
                checked={settings.twoFactorAuth} 
                onCheckedChange={() => handleSettingChange("twoFactorAuth")}
              />
            </div>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowPasswordDialog(true)}
            >
              <Icon name="Lock" className="mr-2 h-4 w-4" />
              Изменить пароль
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Действия с аккаунтом</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Сохранение...
                </>
              ) : (
                <>
                  <Icon name="Save" className="mr-2 h-4 w-4" />
                  Сохранить все настройки
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Icon name="Trash" className="mr-2 h-4 w-4" />
              Удалить аккаунт
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Диалог изменения пароля */}
      <AlertDialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Изменение пароля</AlertDialogTitle>
            <AlertDialogDescription>
              Введите ваш текущий пароль и новый пароль дважды для подтверждения.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <form onSubmit={handleChangePassword} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="currentPassword" className="text-sm font-medium">
                Текущий пароль
              </label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium">
                Новый пароль
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Подтвердите новый пароль
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Изменение...
                    </>
                  ) : (
                    "Изменить пароль"
                  )}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Диалог удаления аккаунта */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удаление аккаунта</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить, и все ваши данные будут безвозвратно удалены.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount} 
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                  Удаление...
                </>
              ) : (
                "Да, удалить мой аккаунт"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
