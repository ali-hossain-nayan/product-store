import React from "react";
import { useProductStore } from "../store/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
    const [newProduct, setNewProduct] = React.useState({
        name: "",
        price: "",
        image: "",
    });
    const { addProduct } = useProductStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { success, message } = await addProduct(newProduct);

        if (success) {
            toast.success(message, {
                position: "top-right", // Use string for position
            });
            setNewProduct({ name: "", price: "", image: "" }); // Reset form fields
        } else {
            toast.error(message, {
                position: "top-right", // Use string for position
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-700">
            <div className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create New Product
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4"
                >
                    <div>
                        <label htmlFor="productName" className="block text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            placeholder="Enter product name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-gray-700 mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="image"
                            placeholder="Enter image URL"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
                    >
                        Add Product
                    </button>
                </form>
            </div>
            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default Create;
