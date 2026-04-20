import { Typography } from 'antd';
import { Meta } from '@components/common';
import Article from '@components/article/Article';
import { MetaFields } from '@types';

const { Title, Paragraph } = Typography;

const meta: MetaFields = {
    title: '年度报告 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 年度报告',
    description: '博友圈网站年度报告。'
};

const content = (
    <>
        {/* 2025 年度报告 */}
        <Title level={3} style={{ marginBottom: 16, fontWeight: 'bold' }}>
            2025 年度报告
        </Title>
        <Paragraph style={{ marginBottom: 8 }}>
            <a href="/annual-reports/2025">点击查看详情！</a>
        </Paragraph>

        {/* 2024 年度报告 */}
        <Title level={3} style={{ marginTop: 16, marginBottom: 16, fontWeight: 'bold' }}>
            2024 年度报告
        </Title>
        <Paragraph style={{ marginBottom: 8 }}>
            <a href="/annual-reports/2024">点击查看详情！</a>
        </Paragraph>
    </>
);

export default function AnnualReportsPage() {
    return (
        <>
            <Meta meta={meta} />
            <Article
                title="年度报告"
                content={content}
            />
        </>
    );
}