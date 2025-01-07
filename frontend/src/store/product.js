import { create } from "zustand";
import axios from "axios";
import { data } from "react-router-dom";

//store using zustand
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    addProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all fields" };
        }

        try {
            const callAPI = await fetch("/api/products/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!callAPI.ok) {
                const errorData = await callAPI.json();
                console.error("Backend error:", errorData);
                return { success: false, message: "Failed to add product" };
            }

            const data = await callAPI.json();
            set((state) => ({ products: [...state.products, data.data] }));

            return { success: true, message: "Product added successfully" };
        } catch (error) {
            console.error("Error adding product:", error);
            return { success: false, message: "Network or server error" };
        }
    },
    deleteProduct: async (productId) => {
        try {
            const callAPI = await axios.delete(`/api/products/${productId}`);

            if (!callAPI.data.success) {
                console.error("Backend error:", callAPI.data.message);
                return { success: false, message: data.message };
            }

            set((state) => ({
                products: state.products.filter((product) => product._id !== productId),
            }));

            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error deleting product:", error);
            return { success: false, message: "Network or server error" };
        }
    },
    editProduct: async (productId, updatedProduct) => {
        if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            return { success: false, message: "Please fill all fields" };
        }

        try {
            const callAPI = await axios.put(`/api/products/${productId}`, updatedProduct, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!callAPI.data.success) {
                console.error("Backend error:", callAPI.data.message);
                return { success: false, message: callAPI.data.message };
            }

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === productId ? callAPI.data.data : product
                ),
            }));

            return { success: true, message: callAPI.data.message };
        } catch (error) {
            console.error("Error updating product:", error);
            return { success: false, message: "Network or server error" };
        }
    },

}))





// import {create} from "zustand";
// import axios from "axios";

// // Store using Zustand
// export  const useProductStore = create((set) => ({
//     products: [],
//     setProducts: (products) => set({ products }),

//     addProduct: async (newProduct) => {
//         if (!newProduct.name || !newProduct.price || !newProduct.imageUrl) {
//             return { success: false, message: "Please fill all fields" };
//         }

//         try {
//             const callAPI = await axios.post("/api/products/create", newProduct, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             });

//             const data = callAPI.data;
//             set((state) => ({
//                 products: [...state.products, data.data], // Assuming `data.data` contains the new product
//             }));

//             return { success: true, message: "Product added successfully" };
//         } catch (error) {
//             console.error("Error adding product:", error);
//             return { success: false, message: "Failed to add product" };
//         }
//     },
// }));
