import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogsContainerComp from '../components/blogs/BlogsContainerComp';
import BlogsMainContentHeader from '../components/blogs/BlogsMainContentHeader';
import SearchBox from '../components/common/SearchBox';
import BlogsSwitchSortType from '../components/blogs/BlogsSwitchSortType';

export default function Blogs() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <BlogsMainContentHeader />
                <SearchBox placeholder='搜索博客 ↵' />
                <BlogsSwitchSortType />
                <BlogsContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}