import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/login";
import Blogs from "./routes/blogs";
import "./App.css";
import Blog from "./routes/blog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
