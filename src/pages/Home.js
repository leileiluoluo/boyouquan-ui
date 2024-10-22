import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import HomeMainContentHeaderComp from '../components/home/HomeMainContentHeaderComp';
import HomeContainerComp from '../components/home/HomeContainerComp';
import Meta from '../components/common/Meta';
import { Suspense, lazy } from 'react';

const HomeLatestNewsComp = lazy(() => import('../components/home/HomeLatestNewsComp'));

export default function Home() {
    const switchTypes = [
        { name: '推荐', href: '/home', default: true },
        { name: '最新', href: '/home?sort=latest', default: false }
    ];

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
                <HomeContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}