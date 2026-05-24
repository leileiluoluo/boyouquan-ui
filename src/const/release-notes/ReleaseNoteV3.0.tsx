import { Typography, Image, Space, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const META_V3_0 = {
    title: 'v3.0 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v3.0',
    description: '博友圈 v3.0 版本说明。'
}

const RELEASE_INFO_V3_0 = {
    title: 'v3.0 版本说明',
    content: (
        <>
            <Paragraph style={{ marginBottom: 16 }}>
                博友圈于 2026 年 5 月 24 日发布了 v3.0 版本！这是一个大的版本升级，该版本启用了基于 antd 的全新 UI，并开发了「博友圈 Mini」微信小程序。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 12, fontWeight: 'bold' }}>
                1 新 UI 说明
            </Title>
            <Paragraph style={{ marginBottom: 16 }}>
                这次的版本升级，博友圈将前端 UI 组件由 <Link href="https://radix-ui.com/" target="_blank">RadixUI</Link> 替换为了 <Link href="https://ant.design/" target="_blank">Ant Design</Link>，并对首页、博客广场、博客详情、随手一拍等几乎所有页面进行了全新的设计，力求页面简洁美观、交互轻便好用。
            </Paragraph>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                首页：
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v3.0/home.png"
                    alt="首页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                博客广场页：
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v3.0/blogs.png"
                    alt="博客广场页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                博客详情页：
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v3.0/blog.png"
                    alt="博客详情页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                每月精选页：
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v3.0/monthly-selected.png"
                    alt="每月精选页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                连接系数页：
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v3.0/link-graphs.png"
                    alt="连接系数页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 12, fontWeight: 'bold' }}>
                2 微信小程序功能说明
            </Title>

            <Paragraph style={{ marginBottom: 16 }}>
                这次的版本升级，博友圈首次开发了博友圈微信小程序「博友圈 Mini」。但本次只开发了三个基础页面：首页、博客详情页和文章页。
            </Paragraph>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                小程序首页：
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v3.0/mini-program-home.jpg"
                    alt="小程序首页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                小程序博客详情页：
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v3.0/mini-program-blog.jpg"
                    alt="小程序博客详情页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                小程序文章页：
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v3.0/mini-program-article.jpg"
                    alt="小程序文章页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 12, fontWeight: 'bold' }}>
                3 代码标签
            </Title>
            <Paragraph style={{ marginBottom: 8 }}>
                博友圈前端：<Link href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v3.0" target="_blank">boyouquan-ui</Link>
            </Paragraph>
            <Paragraph style={{ marginBottom: 16 }}>
                博友圈后端：<Link href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v3.0" target="_blank">boyouquan-api</Link>
            </Paragraph>
        </>
    ),
    publishedAt: '2026 年 5 月 24 日'
}

export { META_V3_0, RELEASE_INFO_V3_0 };