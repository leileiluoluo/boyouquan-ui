import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MonthlySelected from './pages/MonthlySelected';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import BlogRequests from './pages/BlogRequests';
import BlogRequest from './pages/BlogRequest';
import Sharing from './pages/Sharing';
import BlogRequestAdd from './pages/BlogRequestAdd';
import NotFound from './pages/NotFound';
import Login from './pages/admin/Login';
import AdminBlogRequests from './pages/admin/AdminBlogRequests';
import AdminBlogRequest from './pages/admin/AdminBlogRequest';
import AdminRecommendedPosts from './pages/admin/AdminRecommendedPosts';
import AdminRecommendPost from './pages/admin/AdminRecommendPost';
import AdminBlogRequestAdd from './pages/admin/AdminBlogRequestAdd';
import HomePage from './pages/HomePage';
import ReleaseNotesPage from './pages/ReleaseNotesPage';
import ReleaseNotePage from './pages/ReleaseNotePage';
import SimilarSitesPage from './pages/SimilarSitesPage';
import ThanksPage from './pages/ThanksPage';
import AboutPage from './pages/AboutPage';
import SponsorPage from './pages/SponsorPage';
import GoPage from './pages/GoPage';
import PlanetShuttlePage from './pages/PlanetShuttlePage';
import AbstractPage from './pages/AbstractPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        // FIXME: just for compatibility, please remove me later
        <Route path='/home/page/:page' element={<HomePage />} />
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
        <Route path='/abstract' element={<AbstractPage />} />
        <Route path='/planet-shuttle' element={<PlanetShuttlePage />} />
        <Route path='/go' element={<GoPage />} />
        <Route path='/sponsor' element={<SponsorPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/thanks' element={<ThanksPage />} />
        <Route path='/similar-sites' element={<SimilarSitesPage />} />
        <Route path='/release-notes' element={<ReleaseNotesPage />} />
        <Route path='/release-notes/:version' element={<ReleaseNotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
