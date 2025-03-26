import React, { createContext, useState, useEffect } from "react";
export const CartContext = createContext();
const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const addToCart = (productId) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === productId);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { id: productId, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };
  const updateCartItemQuantity = (productId, quantityChange) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, quantityChange),
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItemQuantity,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
