import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V2_3 = {
    title: 'v2.3 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.3',
    description: '博友圈 v2.3 版本说明。'
};

const RELEASE_INFO_V2_3 = {
    title: 'v2.3 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2025 年 7 月 29 日发布了 v2.3 版本！该版本使用「<a href="https://www.radix-ui.com/" target="_blank">Radix UI</a>」组件库对前端 React 工程进行了重写。重写后的前端页面变得更加轻巧、简洁、标准、统一。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 页面截图
            </Title>
            <Paragraph>
                下面即是重写后各个主要页面的截图。
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.3/home.png"
                    alt="首页"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.3/blogs.png"
                    alt="博客列表"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.3/email-validation.png"
                    alt="邮箱验证"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.3/monthly-selected.png"
                    alt="每月精选"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.3/blog.png"
                    alt="博客详情"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 代码标签
            </Title>
            <Paragraph>
                博友圈前端：<a href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.3" target="_blank">boyouquan-ui</a>
            </Paragraph>
            <Paragraph>
                博友圈后端：<a href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.3" target="_blank">boyouquan-api</a>
            </Paragraph>
        </>
    ),
    publishedAt: '2025年7月29日'
};

export { META_V2_3, RELEASE_INFO_V2_3 };