import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V1_6 = {
    title: 'v1.6 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.6',
    description: '博友圈 v1.6 版本说明。'
};

const RELEASE_INFO_V1_6 = {
    title: 'v1.6 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2023 年 11 月 5 日发布了 v1.6 版本！该版本在「博客详情」页面增加了随机链接功能。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                「博客详情」页面的底部，会随机展示两个博客，提高博客的曝光率和互联度。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 页面截图
            </Title>

            <Paragraph>博客详情页</Paragraph>
            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v1.6/random-links-in-blog-detail-page.png"
                    alt="博客详情页随机链接"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>
        </>
    ),
    publishedAt: '2023年11月5日'
};

export { META_V1_6, RELEASE_INFO_V1_6 };