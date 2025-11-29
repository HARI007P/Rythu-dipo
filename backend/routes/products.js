import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all products
router.get('/', async (req, res) => {
  try {
    const productsPath = path.join(__dirname, '../data/products.json');
    const productsData = await fs.readFile(productsPath, 'utf8');
    const products = JSON.parse(productsData);

    // Filter by category if specified
    const { category, search } = req.query;
    let filteredProducts = products;

    if (category && category !== 'all') {
      filteredProducts = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.features.some(feature => feature.toLowerCase().includes(searchTerm))
      );
    }

    res.json({
      success: true,
      message: 'Products fetched successfully',
      data: {
        products: filteredProducts,
        total: filteredProducts.length,
        categories: [...new Set(products.map(p => p.category))]
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const productsPath = path.join(__dirname, '../data/products.json');
    const productsData = await fs.readFile(productsPath, 'utf8');
    const products = JSON.parse(productsData);

    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product fetched successfully',
      data: { product }
    });

  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
});

// Get featured/recommended products
router.get('/featured/list', async (req, res) => {
  try {
    const productsPath = path.join(__dirname, '../data/products.json');
    const productsData = await fs.readFile(productsPath, 'utf8');
    const products = JSON.parse(productsData);

    // Get first 6 products as featured for demo
    const featuredProducts = products.slice(0, 6);

    res.json({
      success: true,
      message: 'Featured products fetched successfully',
      data: { products: featuredProducts }
    });

  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured products'
    });
  }
});

export default router;
