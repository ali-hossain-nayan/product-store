import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import cors from 'cors';
import path from 'path';

//db->server->route->controller->model
dotenv.config();
const app = express();

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
// Connect to the database
connectDB();

app.use("/api/products", productRoutes)
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});
