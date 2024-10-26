import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';
import AdminBlogRequestsComp from '../../components/admin/AdminBlogRequestsComp';

export default function AdminBlogRequests() {
    const meta = {
        title: '博客审核 - 管理页面 - 博友圈 · 博客人的朋友圈！',
        keywords: '管理页面',
        description: '管理页面'
    }

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <AdminBlogRequestsComp />
            </main>
            <CommonFooter />
        </>
    )
}