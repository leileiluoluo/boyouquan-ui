import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MonthlySelected from './pages/MonthlySelected';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Index from './pages/Index';
import BlogRequests from './pages/BlogRequests';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path='/home' element={<Home />} />
        <Route path='/monthly-selected' element={<MonthlySelected />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:domain' element={<Blog />} />
        <Route path='/blog-requests' element={<BlogRequests />} />
      </Routes>
    </Router>
  );
};
