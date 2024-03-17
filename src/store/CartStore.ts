import { create } from "zustand";
import { CartStore } from "./storeInterfaces";
import { MenuItem } from "./storeTypes";

const calculateTotals = (
  cartItems: MenuItem[]
): { totalItems: number; totalPrice: number } => {
  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );
  return { totalItems, totalPrice };
};

const findItem = (items: MenuItem[], id: string) => {
  const foundItem = items.find((item) => item.id === id);

  return foundItem;
};

const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  cartItems: [],
  totalPrice: 0,
  totalItems: 0,
  toggle: () =>
    set((state) => ({ isOpen: !state.isOpen, showCartItems: !state.isOpen })),

  addToCart: (item: MenuItem) => {
    console.log('added item to cart: ',item)
    set((state) => {
      const existingItem = findItem(state.cartItems, item.id);

      let updatedCartItems;
 
      if (existingItem) {
        updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...item, quantity: 1 }];
      }
 
      const { totalItems, totalPrice } = calculateTotals(updatedCartItems);

      return {
        cartItems: updatedCartItems,
        totalPrice,
        totalItems,
      } as CartStore;
    });
  },

  increaseQuantity: (id: string) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      );

      const { totalItems, totalPrice } = calculateTotals(updatedCartItems);

      return { cartItems: updatedCartItems, totalPrice, totalItems };
    });
  },
  decreaseQuantity: (id: string) => {
    set((state) => {
      const updatedCartItems = state.cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, (item.quantity || 0) - 1) }
            : item
        )
        .filter((item) => (item.quantity || 0) > 0);

      const { totalItems, totalPrice } = calculateTotals(updatedCartItems);

      return { cartItems: updatedCartItems, totalPrice, totalItems };
    });
  },
}));

export const resetCart = () => {
  useCartStore.setState({
    cartItems: [],
    totalItems: 0,
    totalPrice: 0,
  });
};

export default useCartStore;
