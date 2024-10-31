import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequest from '../components/blog-request/BlogRequest';

export default function BlogRequestPage() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <BlogRequest />
            </main>
            <CommonFooter />
        </>
    )
}