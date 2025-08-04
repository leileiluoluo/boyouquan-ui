import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';
import { Box, Container } from '@radix-ui/themes';

const meta = {
    title: '404 - 博友圈 · 博客人的朋友圈！',
    keywords: '404',
    description: '404'
}

const titleStyle = { textAlign: 'center' };
const contentStyle = { textAlign: 'center', fontSize: '60px' };

const content = <>
    <h4 style={titleStyle}>抱歉，未找到您要访问的页面！</h4>
    <p style={contentStyle}>404</p>
</>;

export default function NotFoundPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">

                <Box>
                    <Container size="2">
                        <Article content={content} />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}