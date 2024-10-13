import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MonthlySelected from './pages/MonthlySelected';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/monthly-selected' element={<MonthlySelected />} />
      </Routes>
    </Router>
  );
};
