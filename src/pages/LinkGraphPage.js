import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import { Box, Container, Flex } from '@radix-ui/themes';
import LinkGraphInput from '../components/link-graphs/LinkGraphInput';
import LinkGraphResult from '../components/link-graphs/LinkGraphResult';
import MainContentHeader from '../components/common/MainContentHeader';
import { useState } from 'react';

const meta = {
    title: "连接系数 - 博友圈 · 博客人的朋友圈！",
    keywords: "连接系数",
    description: "连接系数，探索友链的世界。",
};

export default function LinkGraphPage() {
    const [sourceDomainName, setSourceDomainName] = useState('');
    const [targetDomainName, setTargetDomainName] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <MainContentHeader content='一个友链连向另一个友链，形成了友链的海洋。一个博客与另一个博客的「赛博距离」有多远？欢迎使用「连接系数」来探索博客间的连接度！' />
                            <LinkGraphInput
                                sourceDomainName={sourceDomainName}
                                targetDomainName={targetDomainName}
                                setSourceDomainName={setSourceDomainName}
                                setTargetDomainName={setTargetDomainName}
                                loading={loading}
                            />
                            <LinkGraphResult
                                sourceDomainName={sourceDomainName}
                                targetDomainName={targetDomainName}
                                setLoading={setLoading}
                            />
                        </Flex>
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    );
}
