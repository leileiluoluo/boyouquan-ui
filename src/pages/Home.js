import MainContentHeader from '../components/common/MainContentHeader';
import HomeComp from '../components/home/HomeComp';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import HomeLatestNewsComp from '../components/home/HomeLatestNewsComp';
import HomeMainContentHeaderComp from '../components/home/HomeMainContentHeaderComp';

export default function Home() {
    const switchTypes = [
        {name: '推荐', href: '/home', default: true},
        {name: '最新', href: '/home?sort=latest', default: false}
    ];

    return (
        <>
            <CommonHeader />
            <main className="main">
                <HomeMainContentHeaderComp />
                <HomeLatestNewsComp />
                <SearchBox placeholder='搜索文章 ↵' gotoPage='/home' sortType='latest'/>
                <SwitchSortType types={switchTypes}/>
                <HomeComp />
            </main>
            <CommonFooter />
        </>
    )
}