import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import NotFoundPage from './pages/NotFoundPage';
import MonthlySelectedPage from './pages/MonthlySelectedPage';
import BlogsPage from './pages/BlogsPage';
import BlogPage from './pages/BlogPage';
import BlogRequestsPage from './pages/BlogRequestsPage';
import BlogRequestPage from './pages/BlogRequestPage';
import BlogRequestAddPage from './pages/BlogRequestAddPage';
import LoginPage from './pages/admin/LoginPage';
import AdminBlogRequestsPage from './pages/admin/AdminBlogRequestsPage';
import AdminBlogRequestPage from './pages/admin/AdminBlogRequestPage';
import AdminBlogRequestAddPage from './pages/admin/AdminBlogRequestAddPage';
import AdminRecommendedPostsPage from './pages/admin/AdminRecommendedPostsPage';
import AdminRecommendPostPage from './pages/admin/AdminRecommendPostPage';
import AnnualReportsPage from './pages/AnnualReportsPage';
import AnnualReportPage from './pages/AnnualReportPage';
import BlogRequestEmailValidationPage from './pages/BlogRequestEmailValidationPage';
import CancelSubscriptionPage from './pages/CancelSubscriptionPage';
import AdminPostImageAddPage from './pages/admin/AdminPostImageAddPage';
import AdminMonthlySelectedPage from './pages/admin/AdminMonthlySelectedPage';
import MomentsPage from './pages/MomentsPage';
import CertificatePage from './pages/CertificatePage';
import LinkGraphPage from './pages/LinkGraphPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Navigate to='/home' />} />
        <Route path='/home' element={<HomePage />} />
        // FIXME: just for compatibility, please remove me later
        <Route path='/home/page/:page' element={<HomePage />} />
        <Route path='/link-graphs' element={<LinkGraphPage />} />
        <Route path='/moments' element={<MomentsPage />} />
        <Route path='/monthly-selected' element={<MonthlySelectedPage />} />
        <Route path='/blogs' element={<BlogsPage />} />
        <Route path='/blogs/:domain' element={<BlogPage />} />
        <Route path='/blogs/:domain/:sub' element={<BlogPage />} />
        <Route path='/blogs/:domain/:sub/:subsub' element={<BlogPage />} />
        <Route path='/blog-requests' element={<BlogRequestsPage />} />
        <Route path='/blog-requests/add' element={<BlogRequestAddPage />} />
        <Route path='/blog-requests/add/email-validation' element={<BlogRequestEmailValidationPage />} />
        <Route path='/blog-requests/:id' element={<BlogRequestPage />} />
        <Route path='/admin/login' element={<LoginPage />} />
        <Route path='/admin/blog-requests' element={<AdminBlogRequestsPage />} />
        <Route path='/admin/blog-requests/:id' element={<AdminBlogRequestPage />} />
        <Route path='/admin/blog-requests/add' element={<AdminBlogRequestAddPage />} />
        <Route path='/admin/monthly-selected' element={<AdminMonthlySelectedPage />} />
        <Route path='/admin/recommended-posts' element={<AdminRecommendedPostsPage />} />
        <Route path='/admin/recommended-posts/add' element={<AdminRecommendPostPage />} />
        <Route path='/admin/post-images/add' element={<AdminPostImageAddPage />} />
        <Route path='/sharing' element={<AbstractPage isSharingPage='true' />} />
        <Route path='/abstract' element={<AbstractPage />} />
        <Route path='/planet-shuttle' element={<PlanetShuttlePage />} />
        <Route path='/go' element={<GoPage />} />
        <Route path='/cancel-subscription' element={<CancelSubscriptionPage />} />
        <Route path='/certificates/:domain' element={<CertificatePage />} />
        <Route path='/certificates/:domain/:sub' element={<CertificatePage />} />
        <Route path='/certificates/:domain/:sub/:subsub' element={<CertificatePage />} />
        <Route path='/sponsor' element={<SponsorPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/thanks' element={<ThanksPage />} />
        <Route path='/similar-sites' element={<SimilarSitesPage />} />
        <Route path='/release-notes' element={<ReleaseNotesPage />} />
        <Route path='/release-notes/:version' element={<ReleaseNotePage />} />
        <Route path='/annual-reports' element={<AnnualReportsPage />} />
        <Route path='/annual-reports/:year' element={<AnnualReportPage />} />
        <Route path="/404-not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
