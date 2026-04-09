import { Flex } from '@radix-ui/themes';

import { Meta } from '@components/common';
import CancelSubscription from '@components/subscription/CancelSubscription';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: '取消订阅 - 博友圈 · 博客人的朋友圈！',
    keywords: '取消订阅, 博友圈',
    description: '取消博友圈邮件订阅。'
};

export default function CancelSubscriptionPage() {
    return (
        <>
            <Meta meta={meta} />
            <Flex direction="column" gap="4">
                <CancelSubscription />
            </Flex>
        </>
    )
}