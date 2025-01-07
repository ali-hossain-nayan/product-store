import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });//createAt, updateAt

const productModel = mongoose.models.product || mongoose.model('product', productSchema);
export default productModel;