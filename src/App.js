import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Login from './routes/login';
import Blogs from './routes/blogs';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </Router>
  );
}

export default App;
