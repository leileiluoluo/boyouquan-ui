import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V1_8 = {
    title: 'v1.8 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.8',
    description: '博友圈 v1.8 版本说明。'
};

const RELEASE_INFO_V1_8 = {
    title: 'v1.8 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2023 年 12 月 13 日发布了 v1.8 版本！该版本支持用户在「首页」文章聚合页面自定义排序方式。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                「首页」文章聚合页面新增两种可选的排序方式：推荐和最新。选择推荐时，会按发布时间降序展示推荐的文章；选择最新时，会按发布时间降序展示收录的文章，默认排序方式为推荐。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 页面截图
            </Title>

            <Paragraph>选择推荐</Paragraph>
            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v1.8/post-sort-with-recommended-in-home-page.png"
                    alt="首页排序-推荐"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph>选择最新</Paragraph>
            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v1.8/post-sort-with-latest-in-home-page.png"
                    alt="首页排序-最新"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>
        </>
    ),
    publishedAt: '2023年12月13日'
};

export { META_V1_8, RELEASE_INFO_V1_8 };