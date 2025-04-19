import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequestAddMainContentHeader from '../components/blog-request/BlogRequestAddMainContentHeader';
import Meta from '../components/common/Meta';
import BlogRequestEmailValidation from '../components/blog-request/BlogRequestEmailValidation';

const meta = {
    title: '提交博客 - 博友圈 · 博客人的朋友圈！',
    keywords: '提交博客, 邮箱验证',
    description: '提交博客，邮箱验证。'
}

export default function BlogRequestEmailValidationPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <BlogRequestAddMainContentHeader />
                <BlogRequestEmailValidation />
            </main>
            <CommonFooter />
        </>
    )
}