import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V1_2 = {
    title: 'v1.2 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.2',
    description: '博友圈 v1.2 版本说明。'
};

const RELEASE_INFO_V1_2 = {
    title: 'v1.2 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2023 年 7 月 10 日发布了 v1.2 版本！该版本主要增加了「星球穿梭」页面。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                访问「星球穿梭」页面可以随机穿梭到一位博友的星球，即该页面会从博友圈所收录的博客中随机找一个，等待几秒钟后跳转过去。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 页面截图
            </Title>

            <Paragraph>星球穿梭页</Paragraph>
            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v1.2/planet-shuttle-page.png"
                    alt="星球穿梭页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>
        </>
    ),
    publishedAt: '2023年7月10日'
};

export { META_V1_2, RELEASE_INFO_V1_2 };