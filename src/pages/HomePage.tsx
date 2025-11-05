import React from 'react';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import PostCardList from '../components/post-card/PostCardList';
import Meta from '../components/common/Meta';
import { getURLParameter } from '../utils/CommonUtil';
import { Box, Container, Flex } from '@radix-ui/themes';
import MainContentHeader from '../components/common/MainContentHeader';
import HomeLatestNews from '../components/home/HomeLatestNews';
import HomePopularBlogsHeader from '../components/home/HomePopularBlogsHeader';

interface SwitchType {
    name: string;
    href: string;
    default: boolean;
}

const switchTypes: SwitchType[] = [
    { name: '推荐', href: '/home', default: true },
    { name: '最新', href: '/home?sort=latest', default: false }
];

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

export default function HomePage(): React.JSX.Element {
    const { sort, keyword, showPinned } = getSortAndKeywordAndShowPinned();

    return (
        <>
            <Meta />
            <CommonHeader />
            <main>
                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <MainContentHeader content='博友圈是博客人的专属朋友圈。我们的愿景是：将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！' />
                            {/* <HomeBanner /> */}
                            <HomePopularBlogsHeader />
                            <HomeLatestNews />
                            <SearchBox placeholder='搜索文章 ↵' gotoPage='/home' sortType='latest' />
                            <SwitchSortType types={switchTypes} />
                            <PostCardList sort={sort} keyword={keyword} showPinned={showPinned} />
                        </Flex>
                        <CommonFooter isHome="true" />
                    </Container>
                </Box>
            </main>
        </>
    );
}

