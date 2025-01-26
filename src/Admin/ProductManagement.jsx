import React from "react";

const ProductManagement = () => {
  const products = [
    { id: 1, name: "Honda City", price: "₹12,00,000" },
    { id: 2, name: "iPhone 13", price: "₹1,00,000" },
  ];

  const handleDeleteProduct = (id) => {
    console.log(`Deleting product with ID: ${id}`);
    // Logic to delete the product
  };

  return (
    <div>
      <h2>Product Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
