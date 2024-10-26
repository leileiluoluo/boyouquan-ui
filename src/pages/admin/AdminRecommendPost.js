import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import AdminRecommendPostComp from '../../components/admin/AdminRecommendPostComp';

export default function AdminRecommendPost() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <AdminRecommendPostComp />
            </main>
            <CommonFooter />
        </>
    )
}