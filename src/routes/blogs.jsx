import React, { useEffect, useState } from "react";
import CategoryTabs from "../component/Categories";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./blogs.css";
import Blogs from "../component/Blogs";

import { useNavigate } from "react-router-dom";
import NewBlogCreation from "../component/NewBlogCreation";
import { BASE_URL } from "../common";

const BlogsPage = () => {
  // Sample categories and blog
  const navigate = useNavigate();

  const userName = localStorage.getItem("name") ?? "Guest";

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

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFetchBlogsByCategory = async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/blogs?category=${category}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
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

  useEffect(() => {
    handleFetchBlogsByCategory(categories[selectedCategoryIndex].name);
  }, [selectedCategoryIndex]);

  return (
    <div className="blogs-page">
      <header className="top-header">
        <div className="header-content">
          <button
            className="new-blog-button"
            onClick={() => setIsModalOpen(true)}
          >
            New Blog
          </button>

          <div className="user-info">
            <div
              // Default profile picture if not available
              alt="Profile"
              className="profile-icon"
            >
              {userName.split("")[0]?.toUpperCase()}
            </div>
            <span className="user-name">{userName}</span>
          </div>
          {/* <button className="logout-button" onClick={handleLogout}>
            Logout
          </button> */}
        </div>
      </header>

      <div>
        {isModalOpen && (
          <NewBlogCreation
            categories={categories}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>

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
