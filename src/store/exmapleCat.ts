import { create } from "zustand";
import { CartStore } from "./storeInterfaces";
import { MenuItem } from "./storeTypes";

const calculateTotals = (cartItems: MenuItem[]) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item?.price || 0) * (item?.quantity || 0),
    0
  );

  const totalItems = cartItems.reduce((total, item) => total + (item?.quantity || 0), 0);

  return { totalPrice, totalItems };
};

const useCartStore1 = create<CartStore>((set) => ({
  isOpen: false,
  cartItems: [] as MenuItem[],
  ...calculateTotals([]), // Initial totals
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  
  addToCart: (item: MenuItem) =>
    set((state) => {
      const existingItem = findItem(state.cartItems, item.id);
      const updatedCartItems = existingItem
        ? updateCart(state.cartItems, existingItem, 1)
        : [...state.cartItems, item];

      const { totalPrice, totalItems } = calculateTotals(updatedCartItems);

      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice,
        totalItems,
      };
    }),

  increaseQuantity: (id: string) =>
    set((state) => ({
      ...state,
      cartItems: updateCart(state.cartItems, findItem(state.cartItems, id), 1),
      ...calculateTotals(state.cartItems),
    })),

  decreaseQuantity: (id: string) =>
    set((state) => ({
      ...state,
      cartItems: updateCart(state.cartItems, findItem(state.cartItems, id), -1),
      ...calculateTotals(state.cartItems),
    })),
}));

function findItem(items: MenuItem[], id: string) {
  const foundItem = items.find((item) => item.id === id);

  console.log("Found Item:", foundItem);
  return foundItem;
}

function updateCart(items: MenuItem[], itemToUpdate: MenuItem | undefined, quantityChange: number) {
  if (!itemToUpdate) {
    return items;
  }

  const updatedItems = items.map((item) =>
    item.id === itemToUpdate.id
      ? { ...item, quantity: Math.max(0, (item.quantity || 0) + quantityChange) }
      : item
  );

  console.log("Updated Cart:", updatedItems);
  return updatedItems;
}

export default useCartStore1;
