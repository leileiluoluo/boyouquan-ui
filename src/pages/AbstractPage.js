import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import AbstractComp from '../components/abstract/AbstractComp';

export default function AbstractPage() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <AbstractComp />
            </main>
            <CommonFooter />
        </>
    )
}