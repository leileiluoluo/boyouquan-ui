import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import HomeLatestNewsComp from '../components/home/HomeLatestNewsComp';
import HomeMainContentHeaderComp from '../components/home/HomeMainContentHeaderComp';
import HomeContainerComp from '../components/home/HomeContainerComp';
import Meta from '../components/common/Meta';

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
                <HomeLatestNewsComp />
                <SearchBox placeholder='搜索文章 ↵' gotoPage='/home' sortType='latest' />
                <SwitchSortType types={switchTypes} />
                <HomeContainerComp />
            </main>
            <CommonFooter />
        </>
    )
}