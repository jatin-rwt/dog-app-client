import React, { useEffect, useState } from "react";
import CategoryTabs from "../component/Categories";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./blogs.css";
import Blogs from "../component/Blogs";
import { useNavigate } from "react-router-dom";

const BlogsPage = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);
  // Sample categories and blog
  const navigate = useNavigate();
  const categories = [
    { name: "NEW_PARENT", icon: "fa-paw", label: "New Parent" },
    {
      name: "NUTRITION_AND_DIET",
      icon: "fa-bone",
      label: "Nutrition and Diet",
    },
    {
      name: "ADOPTION_AND_RESCUE_STORIES",
      icon: "fa-home",
      label: "Adoption and Rescue Stories",
    },
    {
      name: "ACCESSORIES_AND_TOYS",
      icon: "fa-basketball-ball",
      label: "Accessories And Toys",
    },
    {
      name: "TRAINING_AND_BEHAVIOR",
      icon: "fa-brain",
      label: "Training and Behavior",
    },
  ];

  const handleFetchBlogsByCategory = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:9000/blogs?category=${category}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setBlogs(data.data);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(blogs);
  useEffect(() => {
    handleFetchBlogsByCategory(categories[selectedCategoryIndex].name);
  }, [selectedCategoryIndex]);
  return (
    <div className="blogs-page">
      <h1>Explore Blogs</h1>
      <CategoryTabs
        categories={categories}
        selectedCategoryIndex={selectedCategoryIndex}
        onSelectCategory={(index) => setSelectedCategoryIndex(index)}
      />
      <Blogs blogs={blogs} />
    </div>
  );
};

export default BlogsPage;
