import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V1_0 = {
    title: 'v1.0 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.0',
    description: '博友圈 v1.0 版本说明。'
};

const RELEASE_INFO_V1_0 = {
    title: 'v1.0 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2023 年 7 月 3 日发布了 v1.0 版本！该版本是博友圈建站以来的第一个版本，主要关注网站的基本功能，即博客搜集与文章展示。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                该版本收录的博客名单由网站维护者手动更新，后台会每隔 1 小时自动对名单中的博客根据 RSS 协议抓取一次最新文章。
            </Paragraph>
            <Paragraph>
                该版本只包含一个 Home 页，用于对所抓取的博客文章按发布时间倒序展示。
            </Paragraph>
            <Paragraph>
                Home 页的功能特性如下：
            </Paragraph>
            <ul style={{ paddingLeft: 20 }}>
                <li>按博客发布时间由新到旧分页展示文章条目；</li>
                <li>每个文章条目包含标题、描述、博主头像、发布时间和浏览次数；</li>
                <li>页面底部展示收录的博客总数、文章总数和浏览总数。</li>
            </ul>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 页面截图
            </Title>

            <Paragraph>Home 页</Paragraph>
            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v1.0/home-page.png"
                    alt="Home 页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>
        </>
    ),
    publishedAt: '2023年7月3日'
};

export { META_V1_0, RELEASE_INFO_V1_0 };