import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../cartContext/CartContext';
import Logo from '../../assets/images/logo.svg';
import catalog from "../../assets/images/catalog-icon.svg";
import user from "../../assets/images/account.svg";
import heart from "../../assets/images/heart.svg";
import cart from "../../assets/images/cart.svg";
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { cartCount } = useCart();

  const changeLanguage = (event) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const MapPinIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const CartIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const MenuIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  return (
    <div className="w-full bg-white sticky top-0 z-40">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12 text-sm">
            <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
              <MapPinIcon />
              <span className="font-medium">{t('tashkent')}</span>
              <ChevronDownIcon />
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-purple-600">{t('deliveryPoints')}</a>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">{t('becomeSeller')}</a>
              <a href="#" className="text-gray-600 hover:text-purple-600">{t('openDeliveryPoint')}</a>
              <a href="#" className="text-gray-600 hover:text-purple-600">{t('faq')}</a>
              <a href="#" className="text-gray-600 hover:text-purple-600">{t('myOrders')}</a>
              <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg" alt="UZ" className="w-5 h-3" />
                <select 
                  className="bg-transparent border-none outline-none cursor-pointer"
                  onChange={changeLanguage}
                  value={i18n.language}
                >
                  <option value="uz">O'zbekcha</option>
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <NavLink to="/">
              <img src={Logo} alt="Uzum Market" className="h-8 mr-8" />
            </NavLink>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-colors">
            <MenuIcon />
            <span className="font-medium">{t('catalog')}</span>
          </button>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600">
                <SearchIcon />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              <img src={user} alt="catalog" className="h-6" />
              <span className="text-sm font-medium">{t('login')}</span>
            </button>
            
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors relative">
              <img src={heart} alt="heart" className="h-6" />
              <span className="text-sm">{t('favorites')}</span>
            </button>
            
            <NavLink
              to="/cart"
              className="p-2 hover:bg-gray-100 flex gap-2 items-center rounded-lg transition-colors relative"
            >
              <img src={cart} alt="cart" className="h-6" />
              <button className="flex items-center hover:bg-gray-50 rounded-lg transition-colors relative">
                {cartCount > 0 && (
                  <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 py-2 overflow-x-auto">
            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap hover:text-purple-600 py-1"
            >
              <img
                src="https://static.uzum.uz/fast_categories/Topsales.png"
                alt=""
                className="h-6"
              />
              <span className="font-medium">{t('weekProducts')}</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap hover:text-purple-600 py-1"
            >
              <img
                src="https://static.uzum.uz/baner/feshn3110.png"
                alt=""
                className="h-6"
              />
              <span>{t('winterCollection')}</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap hover:text-purple-600 py-1"
            >
              <img
                src="https://static.uzum.uz/baner/hobbi2110.png"
                alt=""
                className="h-6"
              />
              <span>{t('hobbyAndCreativity')}</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap hover:text-purple-600 py-1"
            >
              <img
                src="https://static.uzum.uz/baner/smart2010.png"
                alt=""
                className="h-6"
              />
              <span>{t('smartphones')}</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap hover:text-purple-600 py-1"
            >
              <span>{t('tourismFishingHunting')}</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap hover:text-purple-600 py-1"
            >
              <span>{t('electronics')}</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap hover:text-purple-600 py-1"
            >
              <span>{t('homeAppliances')}</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap hover:text-purple-600 py-1"
            >
              <span>{t('clothes')}</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-2 text-xs whitespace-nowrap text-gray-600 hover:text-purple-600 py-1"
            >
              <span>{t('more')}</span>
              <ChevronDownIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;