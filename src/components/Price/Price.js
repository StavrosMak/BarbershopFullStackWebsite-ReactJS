import React, { useState, useEffect } from 'react';
import './Price.css';
import axios from 'axios';

export default function Price() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    // Fetch the data from the server API endpoint
    axios
      .get('http://localhost:3001/api/cards') // Replace with your server endpoint for products
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleItemClick = (index) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(index)) {
        return prevSelectedProducts.filter((selectedItem) => selectedItem !== index);
      } else {
        return [...prevSelectedProducts, index];
      }
    });
  };

  const calculateTotalSum = () => {
    return selectedProducts.reduce((sum, selectedIndex) => {
      const product = products[selectedIndex];
      const addPrice = product.servicePrice;
      return sum + addPrice;
    }, 0);
  };

  const totalSum = calculateTotalSum();

  return (
    <div className="card" id='prices'>
      <h2>Calculate Cost</h2>
      <div className="wrap">
        <div className="right">
          <ul>
            {products.map((product, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(index)}
                className={`product price__add ${selectedProducts.includes(index) ? 'selected' : ''}`}
              >
                {selectedProducts.includes(index) ? (
                  <i className="fas fa-check-circle icon icon-delete delete"></i>
                ) : (
                  <i className="fas fa-plus-circle icon icon-add add"></i>
                )}
                <div className="price__descr">
                  <div className={`price__item`}>
                    {product.serviceName}
                  </div>
                </div>
                <div className={`price`}>
                  € {product.servicePrice}
                </div>
              </li>
            ))}
          </ul>
          <div className="price__summe">
            <h3>Total Cost: {totalSum}€</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
