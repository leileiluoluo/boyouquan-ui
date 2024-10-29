import MainContentHeader from '../components/common/MainContentHeader';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import MonthlySelectedCardList from '../components/monthly-selected/MonthlySelectedCardList';

const meta = {
    title: '每月精选 - 博友圈 · 博客人的朋友圈！',
    keywords: '每月精选, 精选文章',
    description: '每个月的精选文章合集。'
}

export default function MonthlySelectedPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <MainContentHeader content='首页文章更新的太快？几天不刷就感觉错过了什么？快来每月精选看看过去几个月的精选文章吧！' />
                <MonthlySelectedCardList />
            </main>
            <CommonFooter />
        </>
    )
}