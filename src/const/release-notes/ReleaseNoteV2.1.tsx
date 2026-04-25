import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V2_1 = {
    title: 'v2.1 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.1',
    description: '博友圈 v2.1 版本说明。'
};

const RELEASE_INFO_V2_1 = {
    title: 'v2.1 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2025 年 3 月 2 日发布了 v2.1 版本！该版本采纳了博友「<a href="/blogs/howiehz.top" target="_blank">皓子</a>」的建议，为「博客广场」的博客列表返回新增了一种排序方式 ——「最长博龄」；同时，在「博客详情」页面新增了「博客年龄」的显示。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                针对「博客广场」页面中博客列表的展示，该版本在原有「最近收录」、「最多浏览」的基础上，新增了一种新的排序方式 ——「最长博龄」，即可以根据建博时间的早晚来分页展示博客列表。
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.1/blogs.png"
                    alt="博客广场列表"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph>
                同时，当进入「博客详情」页面时，新增了「博客年龄」的显示。
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.1/blog-detail.png"
                    alt="博客详情"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 代码标签
            </Title>
            <Paragraph>
                博友圈前端：<a href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.1" target="_blank">boyouquan-ui</a>
            </Paragraph>
            <Paragraph>
                博友圈后端：<a href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.1" target="_blank">boyouquan-api</a>
            </Paragraph>
        </>
    ),
    publishedAt: '2025年3月2日'
};

export { META_V2_1, RELEASE_INFO_V2_1 };