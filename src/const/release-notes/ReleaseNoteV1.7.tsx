import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V1_7 = {
    title: 'v1.7 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.7',
    description: '博友圈 v1.7 版本说明。'
};

const RELEASE_INFO_V1_7 = {
    title: 'v1.7 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2023 年 12 月 10 日发布了 v1.7 版本！该版本支持用户在「博客广场」页面自定义博客列表的排序方式。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                「博客广场」页面新增两种可选的排序方式：最多浏览和最近收录。选择最多浏览时，博客列表按照浏览总数降序排序；选择最近收录时，博客列表按照收录时间降序排序，默认排序方式为最多浏览。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 页面截图
            </Title>

            <Paragraph>选择最多浏览</Paragraph>
            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v1.7/blog-sort-with-access-count-in-blog-list-page.png"
                    alt="博客广场排序-最多浏览"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph>选择最近收录</Paragraph>
            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v1.7/blog-sort-with-collect-time-in-blog-list-page.png"
                    alt="博客广场排序-最近收录"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>
        </>
    ),
    publishedAt: '2023年12月10日'
};

export { META_V1_7, RELEASE_INFO_V1_7 };