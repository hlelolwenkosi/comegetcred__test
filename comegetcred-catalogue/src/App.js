import React, { useState } from 'react';
import './App.css';

// Sample product data
const products = [
  { id: 1, title: "DNK Yellow Shoes", category: "Men", price: 120, originalPrice: 150, sale: true, image: "/images/yellow-shoes.jpg", description: "Comfortable yellow sports shoes perfect for running and casual wear." },
  { id: 2, title: "DNK Blue Shoes", category: "Men", priceMin: 200, priceMax: 240, image: "/images/blue-shoes.jpg", colors: ["blue", "green", "orange"], description: "Stylish blue sports shoes with advanced support technology." },
  { id: 3, title: "Dark Brown Jeans", category: "Men", price: 150, image: "/images/dark-jeans.jpg", description: "Classic dark brown jeans made from premium denim." },
  { id: 4, title: "Blue Denim Jeans", category: "Women", price: 150, image: "/images/blue-jeans.jpg", description: "Fashionable blue denim jeans designed for the modern woman." },
  { id: 5, title: "Basic Gray Jeans", category: "Women", price: 150, image: "/images/gray-jeans.jpg", description: "Essential gray jeans that complement any wardrobe." },
  { id: 6, title: "Blue Denim Shorts", category: "Women", price: 130, originalPrice: 150, sale: true, image: "/images/denim-shorts.jpg", description: "Trendy blue denim shorts perfect for warm weather." },
  { id: 7, title: "Anchor Bracelet", category: "Accessories", priceMin: 150, priceMax: 180, image: "/images/anchor-bracelet.jpg", colors: ["silver", "green", "orange"], description: "Elegant anchor bracelet crafted from high-quality materials." },
  { id: 8, title: "Boho Bangle Bracelet", category: "Accessories", priceMin: 150, priceMax: 170, image: "/images/boho-bracelet.jpg", colors: ["turquoise", "mint", "pink"], description: "Bohemian-inspired bangle bracelet featuring natural turquoise stones." },
  { id: 9, title: "Light Brown Purse", category: "Accessories", price: 150, image: "/images/brown-purse.jpg", description: "Sophisticated light brown purse with ample storage space." },
  { id: 10, title: "Bright Red Bag", category: "Accessories", priceMin: 100, priceMax: 140, image: "/images/red-bag.jpg", colors: ["blue", "yellow", "orange", "pink"], description: "Vibrant red bag that makes a bold fashion statement." }
];

// Color mapping
const colorMap = {
  blue: '#2196F3', green: '#4CAF50', orange: '#FF9800', yellow: '#FFEB3B', 
  pink: '#E91E63', turquoise: '#009688', mint: '#8BC34A', silver: '#9E9E9E', red: '#F44336'
};

// ProductCard Component
const ProductCard = ({ product, onClick }) => (
  <div className="product-card" onClick={() => onClick(product)}>
    <div className="product-image">
      <img src={product.image || "https://via.placeholder.com/300"} alt={product.title} />
      {product.sale && <span className="sale-badge">Sale!</span>}
    </div>
    <h3>{product.title}</h3>
    <p className="category">{product.category}</p>
    <div className="price">
      {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
      {product.price && <span className="current-price">${product.price.toFixed(2)}</span>}
      {(product.priceMin && product.priceMax) && 
        <span className="price-range">${product.priceMin.toFixed(2)} - ${product.priceMax.toFixed(2)}</span>
      }
    </div>
    <div className="rating">
      {[...Array(5)].map((_, i) => <span key={i} className="star">★</span>)}
    </div>
    {product.colors && (
      <div className="colors">
        {product.colors.map((color, idx) => (
          <span 
            key={idx} 
            className="color-option" 
            style={{ backgroundColor: colorMap[color] || color }}
          />
        ))}
      </div>
    )}
  </div>
);

// Modal Component
const Modal = ({ product, onClose }) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="modal-body">
        <div className="modal-image">
          <img src={product.image || "https://via.placeholder.com/500"} alt={product.title} />
        </div>
        <div className="modal-details">
          <h2>{product.title}</h2>
          <p className="category">{product.category}</p>
          <div className="price">
            {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
            {product.price && <span className="current-price">${product.price.toFixed(2)}</span>}
            {(product.priceMin && product.priceMax) && 
              <span className="price-range">${product.priceMin.toFixed(2)} - ${product.priceMax.toFixed(2)}</span>
            }
          </div>
          <div className="rating">
            {[...Array(5)].map((_, i) => <span key={i} className="star">★</span>)}
          </div>
          {product.colors && (
            <div className="modal-colors">
              <h4>Available Colors:</h4>
              <div className="colors">
                {product.colors.map((color, idx) => (
                  <span 
                    key={idx} 
                    className="color-option" 
                    style={{ backgroundColor: colorMap[color] || color }}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="description">
            <h4>Description:</h4>
            <p>{product.description}</p>
          </div>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
);

// CustomizeMenu Component
const CustomizeMenu = ({ isOpen, onClose, gridColumns, setGridColumns, selectedCategory, setSelectedCategory }) => {
  if (!isOpen) return null;
  
  return (
    <div className="customize-menu">
      <div className="customize-option">
        <label>Products per row:</label>
        <div className="column-selector">
          <button 
            className={gridColumns === 2 ? 'active' : ''} 
            onClick={() => setGridColumns(2)}
          >
            2
          </button>
          <button 
            className={gridColumns === 3 ? 'active' : ''} 
            onClick={() => setGridColumns(3)}
          >
            3
          </button>
          <button 
            className={gridColumns === 4 ? 'active' : ''} 
            onClick={() => setGridColumns(4)}
          >
            4
          </button>
          <button 
            className={gridColumns === 5 ? 'active' : ''} 
            onClick={() => setGridColumns(5)}
          >
            5
          </button>
        </div>
      </div>
      
      <div className="customize-option">
        <label>Filter by category:</label>
        <div className="category-selector">
          <button 
            className={selectedCategory === 'All' ? 'active' : ''} 
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          <button 
            className={selectedCategory === 'Men' ? 'active' : ''} 
            onClick={() => setSelectedCategory('Men')}
          >
            Men
          </button>
          <button 
            className={selectedCategory === 'Women' ? 'active' : ''} 
            onClick={() => setSelectedCategory('Women')}
          >
            Women
          </button>
          <button 
            className={selectedCategory === 'Accessories' ? 'active' : ''} 
            onClick={() => setSelectedCategory('Accessories')}
          >
            Accessories
          </button>
        </div>
      </div>
      
      <button className="close-customize" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

// Main App Component
function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customizeMenuOpen, setCustomizeMenuOpen] = useState(false);
  const [gridColumns, setGridColumns] = useState(5); // Default is 5 columns
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const toggleCustomizeMenu = () => {
    setCustomizeMenuOpen(!customizeMenuOpen);
  };
  
  // Filter products by category if needed
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <div className="app-container">
      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="title-underline"></div>
        <div className="customize-button">
          <button onClick={toggleCustomizeMenu}>
            <span className="customize-icon">⚙️</span>
            Customize
          </button>
          <CustomizeMenu 
            isOpen={customizeMenuOpen}
            onClose={() => setCustomizeMenuOpen(false)}
            gridColumns={gridColumns}
            setGridColumns={setGridColumns}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div 
          className="product-grid" 
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
        >
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={setSelectedProduct}
            />
          ))}
        </div>
      </div>
      {selectedProduct && <Modal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}

export default App;