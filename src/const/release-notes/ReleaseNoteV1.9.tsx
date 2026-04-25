import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V1_9 = {
    title: 'v1.9 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.9',
    description: '博友圈 v1.9 版本说明。'
};

const RELEASE_INFO_V1_9 = {
    title: 'v1.9 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2024 年 01 月 26 日发布了 v1.9 版本！该版本发布了一个新的页面「每月精选」，用于展示过去每个月的精选文章。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                「每月精选」会从每个月筛选 10 篇人气最旺的文章，然后在该页面进行统一展示。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 页面截图
            </Title>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v1.9/monthly-selected-page.png"
                    alt="每月精选页面"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>
        </>
    ),
    publishedAt: '2024年01月26日'
};

export { META_V1_9, RELEASE_INFO_V1_9 };