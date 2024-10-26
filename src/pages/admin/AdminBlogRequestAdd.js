import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminBlogRequestAddComp from '../../components/admin/AdminBlogRequestAdd';

export default function AdminBlogRequestAdd() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <AdminBlogRequestAddComp />
            </main>
            <CommonFooter />
        </>
    )
}