import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminRecommendedPostsComp from '../../components/admin/AdminRecommendedPostsComp';

export default function AdminRecommendedPosts() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <AdminRecommendedPostsComp />
            </main>
            <CommonFooter />
        </>
    )
}