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
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { name: 'Все товары', key: 'all', icon: 'Store', color: '#9b87f5' },
    { name: 'Кальяны', key: 'hookah', icon: 'Flame', color: '#9b87f5' },
    { name: 'Табак', key: 'tobacco', icon: 'Package', color: '#7E69AB' },
    { name: 'Одноразки', key: 'disposable', icon: 'Zap', color: '#D946EF' },
    { name: 'Уголь', key: 'coal', icon: 'Circle', color: '#F97316' },
    { name: 'Жидкости', key: 'liquid', icon: 'Droplets', color: '#0EA5E9' },
  ];

  const products: Product[] = [
    { id: 1, name: 'Кальян Premium Gold', price: 15900, category: 'hookah', image: 'https://images.unsplash.com/photo-1591238371728-70fbfe6c9bf8?w=600', description: 'Премиум кальян с золотым покрытием' },
    { id: 2, name: 'Кальян Portable Mini', price: 4900, category: 'hookah', image: 'https://images.unsplash.com/photo-1591238371728-70fbfe6c9bf8?w=600', description: 'Компактный портативный кальян' },
    { id: 3, name: 'Кальян Classic Steel', price: 8500, category: 'hookah', image: 'https://images.unsplash.com/photo-1591238371728-70fbfe6c9bf8?w=600', description: 'Классический стальной кальян' },
    
    { id: 4, name: 'Darkside 250г', price: 1290, category: 'tobacco', image: 'https://images.unsplash.com/photo-1580870069867-74c08b0c5195?w=600', description: 'Крепкий табак премиум класса' },
    { id: 5, name: 'Brusko 50г', price: 650, category: 'tobacco', image: 'https://images.unsplash.com/photo-1580870069867-74c08b0c5195?w=600', description: 'Популярный бренд табака' },
    { id: 6, name: 'Daily Hookah 250г', price: 1100, category: 'tobacco', image: 'https://images.unsplash.com/photo-1580870069867-74c08b0c5195?w=600', description: 'Табак для ежедневного курения' },
    { id: 7, name: 'Must Have 125г', price: 890, category: 'tobacco', image: 'https://images.unsplash.com/photo-1580870069867-74c08b0c5195?w=600', description: 'Сбалансированный вкус' },
    { id: 8, name: 'Sebero 100г', price: 750, category: 'tobacco', image: 'https://images.unsplash.com/photo-1580870069867-74c08b0c5195?w=600', description: 'Яркие фруктовые миксы' },
    
    { id: 9, name: 'ELF BAR 5000', price: 650, category: 'disposable', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600', description: '5000 затяжек' },
    { id: 10, name: 'HQD Ultra', price: 550, category: 'disposable', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600', description: 'Популярная одноразка' },
    { id: 11, name: 'Puff Bar Plus', price: 450, category: 'disposable', image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600', description: 'Компактная и удобная' },
    
    { id: 12, name: 'Уголь кокосовый 1кг', price: 450, category: 'coal', image: 'https://images.unsplash.com/photo-1610448721566-47369c768e70?w=600', description: 'Натуральный кокосовый уголь' },
    { id: 13, name: 'Уголь Tom Coco 1кг', price: 550, category: 'coal', image: 'https://images.unsplash.com/photo-1610448721566-47369c768e70?w=600', description: 'Премиум уголь Tom Coco' },
    
    { id: 14, name: 'Жидкость Salt 30мл', price: 390, category: 'liquid', image: 'https://images.unsplash.com/photo-1608671685857-c8f451c42065?w=600', description: 'Солевой никотин 30мл' },
    { id: 15, name: 'Жидкость Freebase 60мл', price: 490, category: 'liquid', image: 'https://images.unsplash.com/photo-1608671685857-c8f451c42065?w=600', description: 'Классический никотин 60мл' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-purple-500/20">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon name="Flame" className="text-purple-500" size={36} />
                <div className="absolute inset-0 blur-xl bg-purple-500/30" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                  Kalyan House
                </h1>
                <p className="text-xs text-purple-300/60">Кальянный магазин</p>
              </div>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative border-purple-500/30 hover:bg-purple-500/10">
                  <Icon name="ShoppingCart" size={20} className="text-purple-300" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-purple-500 to-pink-500">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg bg-slate-950 border-purple-500/20">
                <SheetHeader>
                  <SheetTitle className="text-purple-300">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col h-full">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-purple-300/50">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-30" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4 pb-4">
                        {cart.map(item => (
                          <Card key={item.id} className="bg-slate-900/50 border-purple-500/20">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-sm text-purple-200">{item.name}</h4>
                                  <p className="text-sm text-purple-400 mt-1">
                                    {item.price.toLocaleString('ru-RU')} ₽
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7 border-purple-500/30"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="text-sm font-medium w-8 text-center text-purple-200">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7 border-purple-500/30"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 ml-auto text-red-400 hover:text-red-300"
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
                      <Separator className="my-4 bg-purple-500/20" />
                      <div className="space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-purple-300">Итого:</span>
                          <span className="text-purple-400">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
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

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent">
              Kalyan House
            </h2>
            <p className="text-xl text-purple-200/80 mb-8">
              Премиум кальяны, табак и аксессуары. Качественные товары для настоящих ценителей.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 text-purple-300">
                <Icon name="Check" size={20} className="text-green-400" />
                <span>Оригинальная продукция</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Icon name="Check" size={20} className="text-green-400" />
                <span>Быстрая доставка</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Icon name="Check" size={20} className="text-green-400" />
                <span>Лучшие цены</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8 text-purple-300">Категории товаров</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <Button
                key={cat.key}
                variant={selectedCategory === cat.key ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  selectedCategory === cat.key 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'border-purple-500/30 hover:bg-purple-500/10'
                }`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                <Icon name={cat.icon as any} size={18} />
                {cat.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden bg-slate-900/80 border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-xl hover:shadow-purple-500/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-purple-200">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-purple-300/60 mb-3">{product.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-purple-400">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-purple-500/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Flame" className="text-purple-500" size={24} />
                <span className="font-bold text-lg text-purple-300">Kalyan House</span>
              </div>
              <p className="text-purple-300/60 text-sm">
                Лучший выбор кальянов, табака и аксессуаров в вашем городе
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Контакты</h4>
              <div className="space-y-2 text-sm text-purple-300/60">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@kalyanhouse.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>г. Москва, ул. Примерная, 1</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Режим работы</h4>
              <div className="space-y-1 text-sm text-purple-300/60">
                <p>Пн-Пт: 10:00 - 22:00</p>
                <p>Сб-Вс: 12:00 - 23:00</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-purple-500/20" />
          
          <div className="text-center text-sm text-purple-300/40">
            <p>© 2024 Kalyan House. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
