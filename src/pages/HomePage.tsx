import React, { lazy, Suspense } from 'react';
import { Flex, Typography } from 'antd';

import { MainContentHeader, Meta, SearchBox, SwitchSortType } from '@components/common';
import PostCardList from '@components/post-card/PostCardList';

import { SwitchType } from '@types';
import { getURLParameter } from '@utils/CommonUtil';
import { HomeLatestNews } from '@components/home';

const SpecialThanks = lazy(() => import('@components/common/special-thanks/SpecialThanks'));

const { Text, Link } = Typography;

const SWITCH_TYPES = [
    { name: '推荐', href: '/home', default: true },
    { name: '最新', href: '/home?sort=latest', default: false },
] as const satisfies readonly SwitchType[];

interface SortKeywordShowPinned {
    sort: string;
    keyword: string;
    showPinned: boolean;
}

const getSortAndKeywordAndShowPinned = (): SortKeywordShowPinned => {
    let sort = getURLParameter('sort') || 'recommended';
    const keyword = getURLParameter('keyword') || '';
    let showPinned = false;
    if (keyword && keyword.length > 0) {
        sort = 'latest';
    }
    if ('recommended' === sort) {
        showPinned = true;
    }

    return { sort, keyword: keyword || '', showPinned };
};

const HomePage: React.FC = () => {
    const { sort, keyword, showPinned } = getSortAndKeywordAndShowPinned();

    return (
        <>
            <Meta />
            <Flex vertical gap={16}>
                <MainContentHeader content='博友圈是博客人的专属朋友圈，我们的愿景是将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！' />
                <HomeLatestNews />
                <SearchBox placeholder="搜索文章 ↵" gotoPage="/home" sortType="latest" />
                <SwitchSortType types={SWITCH_TYPES} />
                <PostCardList sort={sort} keyword={keyword} showPinned={showPinned} />
            </Flex>
            <Suspense>
                <SpecialThanks isHome={true} />
            </Suspense>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Text type="secondary">
                    特别声明：包含政治、色情、赌博与暴力等违规内容的博客，一经发现，将被永久移出收录名单！举报违规博客，请「
                    <Link href="mailto:support@boyouquan.com?subject=违规内容举报&amp;body=收录页面：%0d%0a违规内容：%0d%0a">
                        联系站长
                    </Link>
                    」！
                </Text>
            </div>
        </>
    );
};

export default HomePage;