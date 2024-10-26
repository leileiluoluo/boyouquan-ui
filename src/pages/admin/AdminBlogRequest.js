import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminBlogRequestComp from '../../components/admin/AdminBlogRequestComp';

export default function AdminBlogRequest() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <AdminBlogRequestComp />
            </main>
            <CommonFooter />
        </>
    )
}