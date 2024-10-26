import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';
import LoginComp from '../../components/admin/LoginComp';

export default function Login() {
    const meta = {
        title: '登录 - 管理页面 - 博友圈 · 博客人的朋友圈！',
        keywords: '管理页面',
        description: '管理页面'
    }

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <LoginComp />
            </main>
            <CommonFooter />
        </>
    )
}