import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminBlogRequestAdd from '../../components/admin/AdminBlogRequestAdd';
import Meta from '../../components/common/Meta';

const meta = {
    title: '提交博客 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '管理页面',
    description: '管理页面'
}

export default function AdminBlogRequestAddPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <AdminBlogRequestAdd />
            </main>
            <CommonFooter />
        </>
    )
}