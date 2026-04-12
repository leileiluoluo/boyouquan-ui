import React from 'react';
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

const HomePage: React.FC = () => {
    const { sort, keyword, showPinned } = getSortAndKeywordAndShowPinned();

    return (
        <>
            <Meta />
            <Flex vertical gap={16}>
                <SearchBox placeholder="搜索文章 ↵" gotoPage="/home" sortType="latest" />
                <SwitchSortType types={SWITCH_TYPES} />
                <PostCardList sort={sort} keyword={keyword} showPinned={showPinned} />
            </Flex>
        </>
    );
};

export default HomePage;