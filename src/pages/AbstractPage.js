import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Abstract from '../components/abstract/Abstract';

export default function AbstractPage({ isSharingPage }) {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <Abstract isSharingPage={isSharingPage} />
            </main>
            <CommonFooter />
        </>
    )
}