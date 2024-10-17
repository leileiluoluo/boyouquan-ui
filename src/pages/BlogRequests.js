import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequestsContainerComp from '../components/blog-requests/BlogRequestsContainerComp';
import BlogRequestsMainContentHeader from '../components/blog-requests/BlogRequestsMainContentHeader';
import SearchBox from '../components/common/SearchBox';

export default function BlogRequests() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <BlogRequestsMainContentHeader />
                <SearchBox placeholder='搜索已提交的博客 ↵' gotoPage='/blog-requests' />
                <BlogRequestsContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}