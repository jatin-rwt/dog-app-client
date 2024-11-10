import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBlogCreation = ({ categories, setIsModalOpen }) => {
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    image: "",
    category: categories[0].name, // default category
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:9000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(newBlog),
    });

    if (response.status === 200) {
      const data = await response.json();
      setIsModalOpen(false); // Close modal after successful blog creation
      setNewBlog({
        title: "",
        description: "",
        link: "",
        category: categories[0].name, // Reset to default category
      });
    } else if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-modal" onClick={() => setIsModalOpen(false)}>
            x
          </button>
          <h2>Create a New Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={newBlog.description}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, description: e.target.value })
                }
                required
              ></textarea>
            </label>
            <label>
              Link:
              <input
                type="url"
                value={newBlog.link}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, image: e.target.value })
                }
              />
            </label>
            <label>
              Category:
              <select
                value={newBlog.category}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, category: e.target.value })
                }
                required
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Email:
              <input
                type="email"
                value={newBlog.email}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, email: e.target.value })
                }
                required
              />
            </label>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlogCreation;
