import React from 'react';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Abstract from '../components/abstract/Abstract';
import { Container } from '@radix-ui/themes';

interface AbstractPageProps {
    isSharingPage?: string;
}

export default function AbstractPage({ isSharingPage }: AbstractPageProps): React.JSX.Element {
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

