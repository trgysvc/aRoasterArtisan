const express = require('express');
const path = require('node:path');
const fs = require('node:fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load product data
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf-8'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home', 
    categories: productsData.categories,
    featuredProducts: productsData.categories[0].products.slice(0, 4) // Show some beans as featured
  });
});

app.get('/category/:id', (req, res) => {
  if (req.params.id === 'all') {
    const allProducts = productsData.categories.flatMap(c => c.products);
    const category = {
      name: 'All Products',
      fullName: 'All Artisan Products',
      tagline: 'Discover our complete collection of artisan coffee, cakes, and croissants.',
      products: allProducts,
      id: 'all'
    };
    return res.render('category', { 
      title: 'All Products',
      category: category,
      allCategories: productsData.categories
    });
  }

  const category = productsData.categories.find(c => c.id === req.params.id);
  if (!category) {
    return res.status(404).send('Category not found');
  }
  res.render('category', { 
    title: category.name,
    category: category,
    allCategories: productsData.categories
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

app.get('/menu', (req, res) => {
  res.render('menu', { 
    title: 'QR Menu',
    categories: productsData.categories
  });
});

app.get('/privacy', (req, res) => {
  res.render('privacy', { title: 'Gizlilik Politikası' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = app; // For Vercel serverless
