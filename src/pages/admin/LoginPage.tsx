import Meta from '../../components/common/Meta';
import Login from '../../components/admin/Login';

const meta = {
    title: '登录 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '登录',
    description: '博友全管理后台登录页面。'
}

export default function LoginPage() {
    return (
        <>
            <Meta meta={meta} />
            <Login />
        </>
    )
}