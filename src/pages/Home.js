import MainContentHeader from '../components/common/MainContentHeader';
import HomeComp from '../components/home/HomeComp';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';

export default function Home() {
    const switchTypes = [
        {name: '推荐', href: '/home', default: true},
        {name: '最新', href: '/home?sort=latest', default: false}
    ];

    return (
        <>
            <CommonHeader />
            <main className="main">
                <MainContentHeader content='您有多久没有读过一篇长文了？那些记忆中有趣的博客还在更新吗？博友圈是博客人的专属朋友圈，连接还在写博的博友，让那属于文字的时代延续光辉！' />
                <SearchBox placeholder='搜索文章 ↵' gotoPage='/home' sortType='latest'/>
                <SwitchSortType types={switchTypes}/>
                <HomeComp />
            </main>
            <CommonFooter />
        </>
    )
}