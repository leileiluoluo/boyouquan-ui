import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Abstract from '../components/abstract/Abstract';
import { Container } from '@radix-ui/themes';

export default function AbstractPage({ isSharingPage }) {
    return (
        <>
            <CommonHeader />
            <main className="main">
                <Container size="2">
                    <Abstract isSharingPage={isSharingPage} />
                </Container>
            </main>
            <CommonFooter />
        </>
    )
}