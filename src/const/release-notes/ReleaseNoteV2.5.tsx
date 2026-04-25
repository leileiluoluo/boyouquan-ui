import { Typography, Space, Image } from 'antd';

const { Title, Paragraph, Link } = Typography;

const META_V2_5 = {
    title: 'v2.5 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.5',
    description: '博友圈 v2.5 版本说明。'
};

const RELEASE_INFO_V2_5 = {
    title: 'v2.5 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2025 年 9 月 24 日发布了 v2.5 版本！该版本对「<Link href="/monthly-selected">每月精选</Link>」页面进行了优化，将之前的表格展示改为了现在的图文展示。
            </Paragraph>

            <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>
                1 功能说明
            </Title>
            <Paragraph>
                在之前的版本，「每月精选」页面的精选文章是按表格来展示的。这种方式虽然简洁，但没有缩略图，有一些风景类的精选博文并未能很好的吸引读者的注意。
            </Paragraph>
            <Paragraph>
                而该版本特别对这部分进行了优化，将表格展示改为了现在的图文展示，相信图文并貌的方式能更好的预展示一部分内容，从而更好的吸引读者的注意。
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.5/monthly-selected.png"
                    alt="每月精选优化"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>
                2 代码标签
            </Title>
            <Paragraph>
                博友圈前端：<Link href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.5">boyouquan-ui</Link>
            </Paragraph>
            <Paragraph>
                博友圈后端：<Link href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.5">boyouquan-api</Link>
            </Paragraph>
        </>
    ),
    publishedAt: '2025年9月24日'
};

export { META_V2_5, RELEASE_INFO_V2_5 };