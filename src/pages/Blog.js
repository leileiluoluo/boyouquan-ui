import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogContainerComp from '../components/blog/BlogContainerComp';

export default function Blog() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <BlogContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}