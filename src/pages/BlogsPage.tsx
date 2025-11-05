import React from 'react';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogsMainContentHeader from '../components/blogs/BlogsMainContentHeader';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import Meta from '../components/common/Meta';
import BlogCardList from '../components/blogs/BlogCardList';
import HotSearch from '../components/common/HotSearch';
import { Box, Container, Flex } from '@radix-ui/themes';

interface MetaData {
    title: string;
    keywords: string;
    description: string;
}

const meta: MetaData = {
    title: '博客广场 - 博友圈 · 博客人的朋友圈！',
    keywords: '博客广场, 博客列表',
    description: '展示博友圈所收录的全部博客。'
};

interface SwitchType {
    name: string;
    href: string;
    default: boolean;
}

const switchTypes: SwitchType[] = [
    { name: '最近收录', href: '/blogs', default: true },
    { name: '最多浏览', href: '/blogs?sort=access_count', default: false },
    { name: '最长博龄', href: '/blogs?sort=create_time', default: false }
];

export default function BlogsPage(): React.JSX.Element {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <BlogsMainContentHeader />
                            <SearchBox placeholder='搜索博客 ↵' gotoPage='/blogs' />
                            <HotSearch />
                            <SwitchSortType types={switchTypes} />
                            <BlogCardList />
                        </Flex>
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    );
}

