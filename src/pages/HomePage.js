import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import SearchBox from '../components/common/SearchBox';
import SwitchSortType from '../components/common/SwitchSortType';
import PostCardList from '../components/post-card/PostCardList';
import Meta from '../components/common/Meta';
import { getURLParameter } from '../utils/CommonUtil';
import { Box, Container, Flex } from '@radix-ui/themes';
import MainContentHeader from '../components/common/MainContentHeader';
import HomePopularBlogsHeader from '../components/home/HomePopularBlogsHeader';
import HomeLatestNews from '../components/home/HomeLatestNews';
import HomeBanner from '../components/home/HomeBanner';

const switchTypes = [
    { name: '推荐', href: '/home', default: true },
    { name: '最新', href: '/home?sort=latest', default: false }
];

const getSortAndKeywordAndShowPinned = () => {
    let sort = getURLParameter('sort') || 'recommended';
    const keyword = getURLParameter('keyword') || '';
    let showPinned = false;
    if (keyword.length > 0) {
        sort = 'latest';
    }
    if ('recommended' === sort) {
        showPinned = true;
    }

    return { sort, keyword, showPinned };
}

export default function HomePage() {
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
                            {/* <HomePopularBlogsHeader /> */}
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
    )
}