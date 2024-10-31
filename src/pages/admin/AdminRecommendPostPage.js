import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminRecommendPost from '../../components/admin/AdminRecommendPost';
import Meta from '../../components/common/Meta';

const meta = {
    title: '推荐文章 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '管理页面',
    description: '管理页面'
}

export default function AdminRecommendPostPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <AdminRecommendPost />
            </main>
            <CommonFooter />
        </>
    )
}