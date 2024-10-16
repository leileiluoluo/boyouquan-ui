import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogsContainerComp from '../components/blogs/BlogsContainerComp';
import BlogsMainContentHeader from '../components/blogs/BlogsMainContentHeader';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';

export default function Blogs() {
    const switchTypes = [
        {name: '最近收录', href: '/blogs', default: true},
        {name: '最多浏览', href: '/blogs?sort=access_count', default: false}
    ];

    return (
        <>
            <CommonHeader />
            <main className="main">
                <BlogsMainContentHeader />
                <SearchBox placeholder='搜索博客 ↵' />
                <SwitchSortType types={switchTypes}/>
                <BlogsContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}