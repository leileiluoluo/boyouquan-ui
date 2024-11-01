import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import PostCardList from '../components/post-card/PostCardList';
import Meta from '../components/common/Meta';
import { Suspense, lazy } from 'react';
import { getURLParameter } from '../utils/CommonUtil';

const HomePopularBlogsHeader = lazy(() => import('../components/home/HomePopularBlogsHeader'));
const HomeLatestNews = lazy(() => import('../components/home/HomeLatestNews'));

const switchTypes = [
    { name: '推荐', href: '/home', default: true },
    { name: '最新', href: '/home?sort=latest', default: false }
];

const getSortAndKeywordAndShowPinned = () => {
    let sort = getURLParameter('sort') || 'recommended';
    const keyword = getURLParameter('keyword') || '';
    let showPinned = false;
    if (keyword.length > 0) {
        sort = 'latest';
    }
    if ('recommended' === sort) {
        showPinned = true;
    }

    return { sort, keyword, showPinned };
}

export default function HomePage() {
    const { sort, keyword, showPinned } = getSortAndKeywordAndShowPinned();

    return (
        <>
            <Meta />
            <CommonHeader />
            <main className="main">
                <Suspense>
                    <HomePopularBlogsHeader />
                    <HomeLatestNews />
                </Suspense>
                <SearchBox placeholder='搜索文章 ↵' gotoPage='/home' sortType='latest' />
                <SwitchSortType types={switchTypes} />
                <PostCardList sort={sort} keyword={keyword} showPinned={showPinned} />
            </main>
            <CommonFooter />
        </>
    )
}