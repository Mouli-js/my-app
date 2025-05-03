import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './Config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to the database
connectDB();
app.use("/api/products", productRoutes)
// Start the server
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') 
    {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});


