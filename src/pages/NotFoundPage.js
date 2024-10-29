import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';

const meta = {
    title: '404 - 博友圈 · 博客人的朋友圈！',
    keywords: '404',
    description: '404'
}

const titleStyle = { textAlign: 'center' };
const contentStyle = { textAlign: 'center', fontSize: '100px' };

const content = <>
    <h3 style={titleStyle}>抱歉，未找到您要访问的页面！</h3>
    <p style={contentStyle}>404</p>
</>;

export default function NotFoundPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Article content={content} />
            </main>
            <CommonFooter />
        </>
    )
}