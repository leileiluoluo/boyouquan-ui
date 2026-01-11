import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';
import { Box, Container, Text } from '@radix-ui/themes';
import similarSites from '../json/similarSites.json';

const meta = {
    title: '同类网站 - 博友圈 · 博客人的朋友圈！',
    keywords: '同类网站',
    description: '博友圈同类网站列表。'
};

const content = <>
    <Text as="p" mb="2">下面列出一些与博友圈类似的博客收录网站，希望关注博友圈的朋友们也可以同时关注一下这些同类网站，其中有的收录站点已有接近 20 年的站龄，感谢他们的陪伴与引流，让这个年代还在坚持写博的人有了一丝欣慰！</Text>
    <ul>
        {
            similarSites.map(
                (site, index) => (
                    <li key={index}><a href={site.link} target="_blank">{site.name}</a> · {site.description}</li>
                ))
        }
    </ul>
</>;

export default function SimilarSitesPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Article
                            title='同类网站'
                            content={content} />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}