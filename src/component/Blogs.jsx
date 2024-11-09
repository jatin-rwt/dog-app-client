import React from "react";
import "./blogs.css";
const Blogs = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div key={index} className="blog-item">
            <h2>{blog.title}</h2>
            <img
              className="blog-image"
              src={blog.image}
              width={"100%"}
              height={"auto"}
              alt="imag"
            />
            <p>{blog.description}</p>
          </div>
        ))
      ) : (
        <p className="no-blogs">No blogs available in this category.</p>
      )}
    </div>
  );
};

export default Blogs;
