import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import HomeMainContentHeaderComp from '../components/home/HomeMainContentHeaderComp';
import PostCardList from '../components/post-card/PostCardList';
import getURLParameter from '../utils/CommonUtil';
import Meta from '../components/common/Meta';
import { Suspense, lazy } from 'react';

const HomeLatestNewsComp = lazy(() => import('../components/home/HomeLatestNewsComp'));

export default function HomePage() {
    const switchTypes = [
        { name: '推荐', href: '/home', default: true },
        { name: '最新', href: '/home?sort=latest', default: false }
    ];

    let sort = getURLParameter('sort') || 'recommended';
    const keyword = getURLParameter('keyword') || '';
    let showPinned = false;
    if (keyword.length > 0) {
        sort = 'latest';
    }
    if ('recommended' === sort) {
        showPinned = true;
    }

    return (
        <>
            <Meta />
            <CommonHeader />
            <main className="main">
                <HomeMainContentHeaderComp />
                <Suspense>
                    <HomeLatestNewsComp />
                </Suspense>
                <SearchBox placeholder='搜索文章 ↵' gotoPage='/home' sortType='latest' />
                <SwitchSortType types={switchTypes} />
                <Suspense>
                    <PostCardList sort={sort} keyword={keyword} showPinned={showPinned} />
                </Suspense>
            </main>
            <CommonFooter />
        </>
    )
}