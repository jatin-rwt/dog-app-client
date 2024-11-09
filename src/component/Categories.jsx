import React from "react";
import "./styles.css";

const CategoryTabs = ({
  categories,
  selectedCategoryIndex,
  onSelectCategory,
}) => {
  return (
    <div className="category-tabs">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`tab-button ${
            index === selectedCategoryIndex ? "active" : ""
          }`}
          onClick={() => onSelectCategory(index)}
        >
          <i className={`fas ${category.icon} category-icon`}></i>
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
