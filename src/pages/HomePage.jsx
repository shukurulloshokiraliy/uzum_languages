import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../cartContext/CartContext';
import cart from "../assets/images/cart.svg";
import { Link } from "react-router-dom";

const BannerSlider2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    'https://images.uzum.uz/d403o5tsp2tj49o76ndg/main_page_banner.jpg',
    'https://images.uzum.uz/d44pd2ej76ohd6dvmteg/main_page_banner.jpg',
    'https://images.uzum.uz/d44q2stsp2tk7h6373t0/main_page_banner.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
            <img
              src={banners[currentSlide]}
              alt={`Banner ${currentSlide + 1}`}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
              ‹
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productQuantities, setProductQuantities] = useState({});
  const { addToCart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setProductQuantities(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-purple-600">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <BannerSlider2 />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">{t('products')}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => {
              const discount = Math.round(product.discountPercentage);
              const originalPrice = Math.round(product.price / (1 - discount / 100));
              const monthlyPayment = Math.round(product.price / 12);
              const quantity = productQuantities[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-square p-4 bg-gray-50">
                      {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-md font-bold">
                          -{discount}%
                        </span>
                      )}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="p-3 flex-1 flex flex-col">
                      <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-3 text-yellow-500 text-sm">
                        ⭐ {product.rating}
                      </div>
                    </div>
                  </Link>

                  <div className="p-3 pt-0">
                    <div className="mb-2">
                      {discount > 0 && (
                        <div className="text-xs text-gray-400 line-through mb-1">
                          {originalPrice.toLocaleString()} {t('sum')}
                        </div>
                      )}
                      <div className="text-lg font-bold text-gray-900">
                        {Math.round(product.price).toLocaleString()} {t('sum')}
                      </div>
                    </div>

                    {quantity === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                      >
                        <img src={cart} alt="cart" className="h-5" />
                        <span>{t('addToCart') || 'Savatga qo‘shish'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 border border-purple-600 rounded-xl bg-purple-50">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="flex-1 py-3 text-purple-600 font-bold"
                        >
                          −
                        </button>
                        <span className="flex-1 text-center font-bold text-purple-600">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 py-3 text-purple-600 font-bold"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
