import MainContentHeader from '../components/common/MainContentHeader';
import MonthlySelectedComp from '../components/monthly-selected/MonthlySelectedComp';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';

export default function MonthlySelected() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <MainContentHeader content='首页文章更新的太快？几天不刷就感觉错过了什么？快来每月精选看看过去几个月的精选文章吧！' />
                <MonthlySelectedComp />
            </main>
            <CommonFooter />
        </>
    )
}