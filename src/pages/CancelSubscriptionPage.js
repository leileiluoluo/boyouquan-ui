import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import { Box, Container, Flex } from '@radix-ui/themes';
import CancelSubscription from '../components/subscription/CancelSubscription';
import Meta from '../components/common/Meta';

const meta = {
    title: '取消订阅 - 博友圈 · 博客人的朋友圈！',
    keywords: '取消订阅, 博友圈',
    description: '取消博友圈邮件订阅。'
};

export default function CancelSubscriptionPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <CancelSubscription />
                        </Flex>
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}