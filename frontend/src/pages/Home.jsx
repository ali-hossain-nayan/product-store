import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useProductStore } from '../store/product';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingProduct, setEditingProduct] = useState(null); // Store the product being edited
    const [editForm, setEditForm] = useState({ name: '', price: '', image: '' }); // Form state
    const { deleteProduct, editProduct } = useProductStore();

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const callAPI = await axios.get('/api/products/get-all');
                if (callAPI.data.success && Array.isArray(callAPI.data.data)) {
                    setProducts(callAPI.data.data);
                } else {
                    setError('Invalid product data format');
                }
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle delete
    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter((product) => product._id !== productId));
            toast.success('Product deleted successfully!');
        } catch (err) {
            console.error('Failed to delete product:', err);
            toast.error('Failed to delete product. Please try again.');
        }
    };

    // Handle edit initiation
    const handleEdit = (product) => {
        setEditingProduct(product);
        setEditForm({ name: product.name, price: product.price, image: product.image });
    };

    // Handle form submission
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await editProduct(editingProduct._id, editForm); // Call editProduct with updated data
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === editingProduct._id ? { ...product, ...editForm } : product
                )
            );
            setEditingProduct(null); // Exit edit mode
            toast.success('Product updated successfully!');
        } catch (err) {
            console.error('Failed to edit product:', err);
            toast.error('Failed to update product. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-800">
                <p className="text-xl text-white">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-700 text-center py-16">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-3xl font-bold text-white">Current Products</h1>

            {error ? (
                <div className="text-green-600 mt-4">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="mt-8">
                    {Array.isArray(products) && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-gray-400 shadow-lg rounded-lg p-4 flex flex-col items-center"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover mb-4 rounded-md"
                                    />
                                    <h2 className="text-lg font-semibold text-gray-700">{product.name}</h2>
                                    <p className="text-gray-600 mb-4">${product.price}</p>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition flex items-center"
                                        >
                                            <FaEdit className="mr-2" />
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-500 transition flex items-center"
                                        >
                                            <FaTrash className="mr-2" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-white mb-4">No products available</p>
                            <Link
                                to="/create"
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
                            >
                                Create New Product
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <form
                        onSubmit={handleEditSubmit}
                        className="bg-gray-200 p-6 rounded-lg shadow-lg w-1/3"
                    >
                        <h2 className="text-2xl text-green-700 font-bold mb-4">Update Product</h2>
                        <div className="mb-4">
                            <label className="block font-bold text-gray-700">Name</label>
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full outline-none focus:ring focus:ring-blue-300 p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold text-gray-700">Price</label>
                            <input
                                type="number"
                                value={editForm.price}
                                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                className="w-full focus:ring focus:ring-blue-300 outline-none p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold text-gray-700">Image URL</label>
                            <input
                                type="text"
                                value={editForm.image}
                                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                                className="w-full focus:ring focus:ring-blue-300 outline-none p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Home;
