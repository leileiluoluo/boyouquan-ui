import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogsMainContentHeader from '../components/blogs/BlogsMainContentHeader';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import Meta from '../components/common/Meta';
import BlogCardList from '../components/blogs/BlogCardList';
import HotSearch from '../components/common/HotSearch';

const meta = {
    title: '博客广场 - 博友圈 · 博客人的朋友圈！',
    keywords: '博客广场, 博客列表',
    description: '展示博友圈所收录的全部博客。'
}

const switchTypes = [
    { name: '最近收录', href: '/blogs', default: true },
    { name: '最多浏览', href: '/blogs?sort=access_count', default: false }
];

export default function BlogsPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <BlogsMainContentHeader />
                <SearchBox placeholder='搜索博客 ↵' gotoPage='/blogs' />
                <HotSearch />
                <SwitchSortType types={switchTypes} />
                <BlogCardList />
            </main>
            <CommonFooter />
        </>
    )
}