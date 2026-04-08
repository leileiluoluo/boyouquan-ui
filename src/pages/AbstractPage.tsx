import { Container } from '@radix-ui/themes';

import { CommonHeader, CommonFooter } from '@components/common';
import Abstract from '@components/abstract/Abstract';

interface AbstractPageProps {
    isSharingPage: boolean;
}

export default function AbstractPage({ isSharingPage }: AbstractPageProps) {
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
    );
}

