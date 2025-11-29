import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

// Initial cart state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Cart action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);

      let updatedItems;
      
      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // New item, add to cart
        updatedItems = [...state.items, { ...product, quantity }];
      }

      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        total,
        itemCount,
      };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        total,
        itemCount,
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
      }

      const updatedItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );

      const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        total,
        itemCount,
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return initialState;
    }

    case CART_ACTIONS.LOAD_CART: {
      const { items } = action.payload;
      const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);

      return {
        ...state,
        items,
        total,
        itemCount,
      };
    }

    default:
      return state;
  }
};

// Create cart context
const CartContext = createContext();

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('rythu-dipo-cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ 
          type: CART_ACTIONS.LOAD_CART, 
          payload: { items: parsedCart.items || [] }
        });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever cart state changes
  useEffect(() => {
    try {
      localStorage.setItem('rythu-dipo-cart', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);

  // Cart action functions
  const addToCart = (product, quantity = 1) => {
    dispatch({ 
      type: CART_ACTIONS.ADD_ITEM, 
      payload: { product, quantity } 
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    const item = state.items.find(item => item.id === productId);
    if (item) {
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
      toast.success(`${item.name} removed from cart!`);
    }
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    toast.success('Cart cleared!');
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const getCartSummary = () => {
    const subtotal = state.total;
    const shippingCost = 0; // Free shipping for now
    const total = subtotal + shippingCost;

    return {
      subtotal,
      shippingCost,
      total,
      itemCount: state.itemCount,
    };
  };

  // Context value
  const value = {
    // State
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Utilities
    getItemQuantity,
    isInCart,
    getCartSummary,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
