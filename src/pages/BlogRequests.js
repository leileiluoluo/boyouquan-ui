import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequestsContainerComp from '../components/blog-requests/BlogRequestsContainerComp';
import BlogRequestsMainContentHeader from '../components/blog-requests/BlogRequestsMainContentHeader';
import SearchBox from '../components/common/SearchBox';
import Meta from '../components/common/Meta';

export default function BlogRequests() {
    const meta = {
        title: '博客审核结果 - 博友圈 · 博客人的朋友圈！',
        keywords: '博客收录申请',
        description: '博客收录申请。'
    }

    return (
        <>
            <Meta meta={meta}/>
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