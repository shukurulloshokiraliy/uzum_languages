import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../cartContext/CartContext";
import { useTranslation } from "react-i18next";

const DetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xato:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-purple-600">
        {t("loading")}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Mahsulot topilmadi</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          {t("backToHome")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-purple-600 hover:underline"
      >
        ← {t("backToHome")}
      </button>

      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-auto rounded-xl object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="mb-4">
            <span className="text-xl font-bold text-gray-900">
              {product.price.toLocaleString()} {t("sum")}
            </span>
            {product.discountPercentage > 0 && (
              <span className="ml-3 text-sm text-gray-400 line-through">
                {Math.round(
                  product.price / (1 - product.discountPercentage / 100)
                ).toLocaleString()}{" "}
                {t("sum")}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            🛒 {t("placeOrder")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
