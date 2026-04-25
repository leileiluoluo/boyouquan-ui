import { Typography, Space, Image } from 'antd';

const { Title, Paragraph, Link } = Typography;

const META_V2_6 = {
    title: 'v2.6 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.6',
    description: '博友圈 v2.6 版本说明。'
};

const RELEASE_INFO_V2_6 = {
    title: 'v2.6 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2025 年 10 月 10 日发布了 v2.6 版本！该版本增加了一个新的页面「
                <Link href="/moments">随手一拍</Link>
                」，用于分享一处美景或一个瞬间。
            </Paragraph>

            <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>
                1 功能说明
            </Title>
            <Paragraph>
                「随手一拍」是该版本新加的一个页面，用户在该页面填写邮箱后即可发布一处美景或一个瞬间，增加互动感和活跃度。
            </Paragraph>
            <Paragraph>
                此外，用户在发布随拍后，对应的头像会出现在首页顶部的「活跃博客」一栏，也会促进访客的点击及文章的查看。
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.6/moments.png"
                    alt="随手一拍功能"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>
                2 代码标签
            </Title>
            <Paragraph>
                博友圈前端：
                <Link href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.6">
                    boyouquan-ui
                </Link>
            </Paragraph>
            <Paragraph>
                博友圈后端：
                <Link href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.6">
                    boyouquan-api
                </Link>
            </Paragraph>
        </>
    ),
    publishedAt: '2025年10月10日'
};

export { META_V2_6, RELEASE_INFO_V2_6 };