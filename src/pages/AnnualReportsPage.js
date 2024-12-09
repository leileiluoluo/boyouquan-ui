import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';

const meta = {
    title: '年度报告 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 年度报告',
    description: '博友圈网站年度报告。'
}

const content = <>
    <h3>2024 年度报告</h3>
    <p><a href="/annual-reports/2024">点击查看详情！</a></p>
</>

export default function AnnualReportsPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Article
                    title='年度报告'
                    content={content} />
            </main>
            <CommonFooter />
        </>
    )
}