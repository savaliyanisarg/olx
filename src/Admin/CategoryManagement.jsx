import React from "react";

const CategoryManagement = () => {
  const categories = ["Cars", "Mobile Phones", "Houses", "Electronics"];

  const handleAddCategory = () => {
    console.log("Adding a new category");
    // Logic to add category
  };

  const handleDeleteCategory = (name) => {
    console.log(`Deleting category: ${name}`);
    // Logic to delete category
  };

  return (
    <div>
      <h2>Category Management</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category}{" "}
            <button onClick={() => handleDeleteCategory(category)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

export default CategoryManagement;
