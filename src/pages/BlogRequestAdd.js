import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequestAddMainContentHeader from '../components/blog-request/BlogRequestAddMainContentHeader';
import BlogRequestAddContainerComp from '../components/blog-request/BlogRequestAddContainerComp';

export default function BlogRequestAdd() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <BlogRequestAddMainContentHeader />
                <BlogRequestAddContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}