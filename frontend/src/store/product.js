import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || newProduct.price == null) {
      return { success: false, message: "Please fill in all the fields" };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        console.error("Failed to create product, status:", res.status);
        return { success: false, message: `Error ${res.status}` };
      }
      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: error.message };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) {
        console.error("Failed to fetch products, status:", res.status);
        set({ products: [] });
        return;
      }
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ products: [] });
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }
      set((state) => ({
        products: state.products.filter((p) => p._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (err) {
      console.error(err);
      return { success: false, message: err.message };
    }
  },
  updateProduct: async (pid, updates) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }
      set(state => ({
        products: state.products.map(p =>
          p._id === pid ? { ...p, ...updates } : p
        )
      }));
      return { success: true, message: 'Updated' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
  
}));


