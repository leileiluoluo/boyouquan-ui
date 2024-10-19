import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequestAddMainContentHeader from '../components/blog-request/BlogRequestAddMainContentHeader';
import BlogRequestAddContainerComp from '../components/blog-request/BlogRequestAddContainerComp';
import Meta from '../components/common/Meta';

export default function BlogRequestAdd() {
    const meta = {
        title: '提交博客 - 博友圈 · 博客人的朋友圈！',
        keywords: '提交博客',
        description: '提交博客。'
    }

    return (
        <>
            <Meta meta={meta}/>
            <CommonHeader />
            <main className="main">
                <BlogRequestAddMainContentHeader />
                <BlogRequestAddContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}