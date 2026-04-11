import { Flex } from 'antd';

import { MainContentHeader, Meta, SearchBox, HotSearch, SwitchSortType } from '@components/common';
import { HomeLatestNews, HomePopularBlogsHeader } from '@components/home';
import PostCardList from '@components/post-card/PostCardList';

import { SwitchType } from '@types';
import { getURLParameter } from '@utils/CommonUtil';

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

export default function HomePage() {
    const { sort, keyword, showPinned } = getSortAndKeywordAndShowPinned();

    return (
        <>
            <Meta />
            <Flex vertical gap={16}>
                <MainContentHeader content="博友圈是博客人的专属朋友圈。我们的愿景是：将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！" />
                <HomePopularBlogsHeader />
                <HomeLatestNews />
                <SearchBox placeholder="搜索文章 ↵" gotoPage="/home" sortType="latest" />
                <HotSearch label="近期热搜" title="OpenClaw" link="/home?sort=latest&keyword=OpenClaw" />
                <SwitchSortType types={SWITCH_TYPES} />
                <PostCardList sort={sort} keyword={keyword} showPinned={showPinned} />
            </Flex>
        </>
    );
}

