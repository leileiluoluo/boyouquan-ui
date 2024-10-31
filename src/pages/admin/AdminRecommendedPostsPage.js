import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminRecommendedPosts from '../../components/admin/AdminRecommendedPosts';
import Meta from '../../components/common/Meta';

const meta = {
    title: '推荐文章管理 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '管理页面',
    description: '管理页面'
}

export default function AdminRecommendedPostsPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <AdminRecommendedPosts />
            </main>
            <CommonFooter />
        </>
    )
}