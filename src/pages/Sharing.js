import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SharingComp from '../components/sharing/SharingComp';

export default function Sharing() {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <SharingComp />
            </main>
            <CommonFooter />
        </>
    )
}