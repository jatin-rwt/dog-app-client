import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./blog.css";
import { BASE_URL } from "../common";

const Blog = () => {
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  //const blog = await Blog.findById(req.params.id);
  const id = location.pathname.split("/")[2];
  const getBlogInfoById = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setBlog(data.data);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBlogInfoById();
  }, []);
  return (
    <div className="blog-page">
      <h1 className="blog-page-title">{blog?.title}</h1>
      <div className="blog-list">
        {blog ? (
          <div className="blog-card" key={blog.id}>
            {blog.image && <img src={blog.image} alt="" />}
            <p className="blog-description">{blog.description}</p>
            <p className="blog-description">{blog.content}</p>
            <a
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-link"
            ></a>
            <p className="blog-email">Posted by: {blog.email}</p>
          </div>
        ) : (
          <p>Loading blog data...</p>
        )}
      </div>
    </div>
  );
};

export default Blog;

// name: "Jatin",
//     email: "jatin@gmail.com",

//     title: "Socializing Your Pet: Why Its Important and How to Start",

//     image:
//       "https://images.pexels.com/photos/5749784/pexels-photo-5749784.jpeg?auto=compress&cs=tinysrgb&w=600",

//     description:
//       "A beginners guide to socializing pets, with tips on helping them feel comfortable around people and other animals.",

//     content:
//       "Lorem ipsum dolor sit amet. Vel velit totam est sint voluptas cum ratione pariatur sit beatae aperiam est deleniti quae ea facilis necessitatibus id illum beatae? Et galisum nostrum ea galisum illo sit galisum dicta non obcaecati deleniti est incidunt sunt aut laborum enim 33 unde quia. Vel quae velit 33 quas autem et sapiente rerum et amet dolor",

//     category: "TRAINING_AND_BEHAVIOR",
