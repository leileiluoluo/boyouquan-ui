import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminBlogRequest from '../../components/admin/AdminBlogRequest';

export default function AdminBlogRequestPage() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <AdminBlogRequest />
            </main>
            <CommonFooter />
        </>
    )
}