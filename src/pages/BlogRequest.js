import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequestContainerComp from '../components/blog-request/BlogRequestContainerComp';

export default function BlogRequest() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <BlogRequestContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}