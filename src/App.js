import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MonthlySelected from './pages/MonthlySelected';
import Blogs from './pages/Blogs';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/monthly-selected' element={<MonthlySelected />} />
        <Route path='/blogs' element={<Blogs />} />
      </Routes>
    </Router>
  );
};
