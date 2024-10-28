import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MonthlySelected from './pages/MonthlySelected';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import BlogRequests from './pages/BlogRequests';
import BlogRequest from './pages/BlogRequest';
import Sharing from './pages/Sharing';
import Abstract from './pages/Abstract';
import Go from './pages/Go';
import Sponsor from './pages/Sponsor';
import ReleaseNotes from './pages/ReleaseNotes';
import ReleaseNoteV1_10 from './pages/release-notes/ReleaseNoteV1.10';
import ReleaseNoteV1_9 from './pages/release-notes/ReleaseNoteV1.9';
import ReleaseNoteV1_8 from './pages/release-notes/ReleaseNoteV1.8';
import ReleaseNoteV1_7 from './pages/release-notes/ReleaseNoteV1.7';
import ReleaseNoteV1_6 from './pages/release-notes/ReleaseNoteV1.6';
import ReleaseNoteV1_5 from './pages/release-notes/ReleaseNoteV1.5';
import ReleaseNoteV1_4 from './pages/release-notes/ReleaseNoteV1.4';
import ReleaseNoteV1_3 from './pages/release-notes/ReleaseNoteV1.3';
import ReleaseNoteV1_2 from './pages/release-notes/ReleaseNoteV1.2';
import ReleaseNoteV1_1 from './pages/release-notes/ReleaseNoteV1.1';
import ReleaseNoteV1_0 from './pages/release-notes/ReleaseNoteV1.0';
import About from './pages/About';
import Thanks from './pages/Thanks';
import SimilarSites from './pages/SimilarSites';
import PlanetShuttle from './pages/PlanetShuttle';
import BlogRequestAdd from './pages/BlogRequestAdd';
import NotFound from './pages/NotFound';
import Login from './pages/admin/Login';
import AdminBlogRequests from './pages/admin/AdminBlogRequests';
import AdminBlogRequest from './pages/admin/AdminBlogRequest';
import AdminRecommendedPosts from './pages/admin/AdminRecommendedPosts';
import AdminRecommendPost from './pages/admin/AdminRecommendPost';
import AdminBlogRequestAdd from './pages/admin/AdminBlogRequestAdd';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/home/page/:page' element={<HomePage />} /> // FIXME: just for compatibility, please remove me later
        <Route path='/monthly-selected' element={<MonthlySelected />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs/:domain' element={<Blog />} />
        <Route path='/blogs/:domain/:sub' element={<Blog />} />
        <Route path='/blogs/:domain/:sub/:subsub' element={<Blog />} />
        <Route path='/blog-requests' element={<BlogRequests />} />
        <Route path='/blog-requests/add' element={<BlogRequestAdd />} />
        <Route path='/blog-requests/:id' element={<BlogRequest />} />
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin/blog-requests' element={<AdminBlogRequests />} />
        <Route path='/admin/blog-requests/:id' element={<AdminBlogRequest />} />
        <Route path='/admin/blog-requests/add' element={<AdminBlogRequestAdd />} />
        <Route path='/admin/recommended-posts' element={<AdminRecommendedPosts />} />
        <Route path='/admin/recommended-posts/add' element={<AdminRecommendPost />} />
        <Route path='/sharing' element={<Sharing />} />
        <Route path='/abstract' element={<Abstract />} />
        <Route path='/planet-shuttle' element={<PlanetShuttle />} />
        <Route path='/go' element={<Go />} />
        <Route path='/sponsor' element={<Sponsor />} />
        <Route path='/about' element={<About />} />
        <Route path='/thanks' element={<Thanks />} />
        <Route path='/similar-sites' element={<SimilarSites />} />
        <Route path='/release-notes' element={<ReleaseNotes />} />
        <Route path='/release-notes/v1.10' element={<ReleaseNoteV1_10 />} />
        <Route path='/release-notes/v1.9' element={<ReleaseNoteV1_9 />} />
        <Route path='/release-notes/v1.8' element={<ReleaseNoteV1_8 />} />
        <Route path='/release-notes/v1.7' element={<ReleaseNoteV1_7 />} />
        <Route path='/release-notes/v1.6' element={<ReleaseNoteV1_6 />} />
        <Route path='/release-notes/v1.5' element={<ReleaseNoteV1_5 />} />
        <Route path='/release-notes/v1.4' element={<ReleaseNoteV1_4 />} />
        <Route path='/release-notes/v1.3' element={<ReleaseNoteV1_3 />} />
        <Route path='/release-notes/v1.2' element={<ReleaseNoteV1_2 />} />
        <Route path='/release-notes/v1.1' element={<ReleaseNoteV1_1 />} />
        <Route path='/release-notes/v1.0' element={<ReleaseNoteV1_0 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
