import { Flex } from '@radix-ui/themes';

import { MainContentHeader, Meta } from '@components/common';
import MonthlySelectedCardList from '@components/monthly-selected/MonthlySelectedCardList';
import Subscription from '@components/monthly-selected/Subscription';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: '每月精选 - 博友圈 · 博客人的朋友圈！',
    keywords: '每月精选, 精选文章',
    description: '每个月的精选文章合集。'
}

export default function MonthlySelectedPage() {
    return (
        <>
            <Meta meta={meta} />
            <Flex direction="column" gap="4">
                <MainContentHeader content="首页文章更新的太快？几天不刷就感觉错过了什么？快来每月精选看看过去几个月的精选文章吧！" />
                <Subscription />
                <MonthlySelectedCardList />
            </Flex>
        </>
    )
}