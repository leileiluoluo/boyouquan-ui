import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogDetail from '../components/blog/BlogDetail';

export default function BlogPage() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <BlogDetail />
            </main>
            <CommonFooter />
        </>
    )
}