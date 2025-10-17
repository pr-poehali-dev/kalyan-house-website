import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const categories = [
    { name: 'Кальяны', icon: 'Flame', color: '#9b87f5' },
    { name: 'Табак', icon: 'Package', color: '#7E69AB' },
    { name: 'Одноразки', icon: 'Zap', color: '#D946EF' },
    { name: 'Уголь', icon: 'Flame', color: '#F97316' },
    { name: 'Жидкости', icon: 'Droplets', color: '#0EA5E9' },
  ];

  const products: Product[] = [
    { id: 1, name: 'Кальян Premium Gold', price: 15900, category: 'Кальяны', image: 'https://images.unsplash.com/photo-1591238371728-70fbfe6c9bf8?w=400' },
    { id: 2, name: 'Табак Fumari 100г', price: 890, category: 'Табак', image: 'https://images.unsplash.com/photo-1580870069867-74c08b0c5195?w=400' },
    { id: 3, name: 'Одноразка ELF BAR', price: 550, category: 'Одноразки', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400' },
    { id: 4, name: 'Уголь кокосовый 1кг', price: 450, category: 'Уголь', image: 'https://images.unsplash.com/photo-1610448721566-47369c768e70?w=400' },
    { id: 5, name: 'Жидкость Salt 30мл', price: 390, category: 'Жидкости', image: 'https://images.unsplash.com/photo-1608671685857-c8f451c42065?w=400' },
    { id: 6, name: 'Кальян Portable Mini', price: 4900, category: 'Кальяны', image: 'https://images.unsplash.com/photo-1591238371728-70fbfe6c9bf8?w=400' },
    { id: 7, name: 'Табак Darkside 250г', price: 1290, category: 'Табак', image: 'https://images.unsplash.com/photo-1580870069867-74c08b0c5195?w=400' },
    { id: 8, name: 'Одноразка HQD', price: 450, category: 'Одноразки', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400' },
  ];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(prev =>
        prev.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50/30">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Flame" className="text-primary" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Kalyan House
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setActiveSection('home')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('catalog')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                О магазине
              </button>
              <button
                onClick={() => setActiveSection('contacts')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Контакты
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4">
                        {cart.map(item => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {item.price.toLocaleString('ru-RU')} ₽
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="text-sm font-medium w-8 text-center">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 ml-auto"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main>
        {activeSection === 'home' && (
          <>
            <section className="container mx-auto px-4 py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                  Kalyan House
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                  Премиум кальяны и аксессуары для истинных ценителей
                </p>
                <Button
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => setActiveSection('catalog')}
                >
                  Перейти в каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </section>

            <section className="container mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold text-center mb-12">Категории товаров</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                {categories.map((category, index) => (
                  <Card
                    key={category.name}
                    className="cursor-pointer group overflow-hidden transition-transform hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setActiveSection('catalog')}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon name={category.icon as any} size={32} style={{ color: category.color }} />
                      </div>
                      <h3 className="font-semibold">{category.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-12">Каталог товаров</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="overflow-hidden transition-transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="container mx-auto px-4 py-16 max-w-3xl animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">О магазине</h2>
            <Card>
              <CardContent className="p-8 space-y-6">
                <p className="text-lg">
                  <strong>Kalyan House</strong> — это премиальный магазин кальянной продукции, где каждый найдет всё необходимое для идеального отдыха.
                </p>
                <p className="text-muted-foreground">
                  Мы специализируемся на продаже высококачественных кальянов, табака, одноразовых устройств, угля и жидкостей для электронных сигарет. Наша миссия — предоставить вам только лучшие товары от проверенных производителей.
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <Icon name="Award" size={40} className="mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">Качество</h4>
                    <p className="text-sm text-muted-foreground">Только оригинальная продукция</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Truck" size={40} className="mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">Доставка</h4>
                    <p className="text-sm text-muted-foreground">Быстрая доставка по городу</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Headphones" size={40} className="mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-2">Поддержка</h4>
                    <p className="text-sm text-muted-foreground">Консультация экспертов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="container mx-auto px-4 py-16 max-w-3xl animate-fade-in">
            <h2 className="text-4xl font-bold mb-8">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Адрес</h4>
                      <p className="text-muted-foreground">г. Волгоград, ул. Советская, д. 20</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Телефон</h4>
                      <a 
                        href="tel:+79023104688" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +7 (902) 310-46-88
                      </a>
                      <Button 
                        size="sm" 
                        className="mt-3 w-full"
                        onClick={() => window.location.href = 'tel:+79023104688'}
                      >
                        <Icon name="Phone" size={16} className="mr-2" />
                        Позвонить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Email</h4>
                      <p className="text-muted-foreground">rinatsimashev@yandex.ru</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Режим работы</h4>
                      <p className="text-muted-foreground">Ежедневно: 11:00 - 23:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => window.open('https://t.me/PoisonRose321', '_blank')}
              >
                <Icon name="Send" size={20} />
                Написать в Telegram
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2"
                onClick={() => window.open('https://vk.com/kalyanhouse_vlg', '_blank')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.89c-.38.42-1.06.64-1.76.64-.88 0-1.6-.34-2.24-.85-.5-.4-.93-.86-1.37-1.37-.22.26-.44.5-.67.73-.73.73-1.46 1.21-2.37 1.21-.49 0-.93-.14-1.29-.42-.88-.68-.88-1.93 0-3.48.42-.75.98-1.48 1.6-2.1.85-.85 1.76-1.45 2.67-1.45.49 0 .93.14 1.29.42.42.33.64.79.64 1.34 0 .73-.34 1.48-.88 2.24l-.22.3c.26.3.52.58.79.84.56.54 1.14.93 1.83.93.38 0 .67-.11.88-.34.42-.45.42-1.21 0-2.24-.22-.54-.54-1.09-.93-1.64-.85-1.21-1.98-2.37-3.15-3.15-.64-.42-1.34-.64-2.08-.64-1.21 0-2.37.54-3.37 1.54-1.76 1.76-2.89 4.13-2.89 6.14 0 1.06.3 1.98.88 2.67.64.76 1.54 1.14 2.67 1.14 1.45 0 2.89-.64 4.13-1.76.42-.38.82-.79 1.21-1.21.42.54.88 1.06 1.37 1.54.93.93 1.98 1.45 3.15 1.45 1.06 0 2.08-.34 2.89-1.14.42-.42.64-.93.64-1.54 0-.88-.42-1.76-1.21-2.37z"/>
                </svg>
                ВКонтакте
              </Button>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-muted mt-24 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Icon name="Flame" className="text-primary" size={28} />
              <span className="text-xl font-bold">Kalyan House</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Kalyan House. Все права защищены.</p>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://t.me/PoisonRose321', '_blank')}
              >
                <Icon name="Send" size={20} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open('https://vk.com/kalyanhouse_vlg', '_blank')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.89c-.38.42-1.06.64-1.76.64-.88 0-1.6-.34-2.24-.85-.5-.4-.93-.86-1.37-1.37-.22.26-.44.5-.67.73-.73.73-1.46 1.21-2.37 1.21-.49 0-.93-.14-1.29-.42-.88-.68-.88-1.93 0-3.48.42-.75.98-1.48 1.6-2.1.85-.85 1.76-1.45 2.67-1.45.49 0 .93.14 1.29.42.42.33.64.79.64 1.34 0 .73-.34 1.48-.88 2.24l-.22.3c.26.3.52.58.79.84.56.54 1.14.93 1.83.93.38 0 .67-.11.88-.34.42-.45.42-1.21 0-2.24-.22-.54-.54-1.09-.93-1.64-.85-1.21-1.98-2.37-3.15-3.15-.64-.42-1.34-.64-2.08-.64-1.21 0-2.37.54-3.37 1.54-1.76 1.76-2.89 4.13-2.89 6.14 0 1.06.3 1.98.88 2.67.64.76 1.54 1.14 2.67 1.14 1.45 0 2.89-.64 4.13-1.76.42-.38.82-.79 1.21-1.21.42.54.88 1.06 1.37 1.54.93.93 1.98 1.45 3.15 1.45 1.06 0 2.08-.34 2.89-1.14.42-.42.64-.93.64-1.54 0-.88-.42-1.76-1.21-2.37z"/>
                </svg>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.location.href = 'tel:+79023104688'}
              >
                <Icon name="Phone" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;