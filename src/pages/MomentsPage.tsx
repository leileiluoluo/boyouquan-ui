import React from 'react';
import MainContentHeader from '../components/common/MainContentHeader';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import { Box, Container, Flex } from '@radix-ui/themes';
import MomentsInput from '../components/moments/MomentsInput';
import MomentsCardList from '../components/moments/MomentsCardList';

interface MetaData {
    title: string;
    keywords: string;
    description: string;
}

const meta: MetaData = {
    title: '随手一拍 - 博友圈 · 博客人的朋友圈！',
    keywords: '随手一拍，分享照片',
    description: '随手一拍，分享此刻的一个瞬间。'
};

export default function MomentsPage(): React.JSX.Element {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <MainContentHeader content='随手拍一张照片，然后附上一段话，分享您此刻看到的一处美景或一个瞬间！' />
                            <MomentsInput />
                            <MomentsCardList />
                        </Flex>
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    );
}

