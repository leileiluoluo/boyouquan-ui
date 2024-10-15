import MainContentHeader from '../components/common/MainContentHeader';
import MonthlySelectedComp from '../components/monthly-selected/MonthlySelectedComp';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';

export default function MonthlySelected() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <MainContentHeader />
                <MonthlySelectedComp />
            </main>
            <CommonFooter />
        </>
    )
}