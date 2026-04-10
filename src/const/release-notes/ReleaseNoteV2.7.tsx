import React from 'react';
import { Typography, Image, Space, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const META_V2_7 = {
    title: 'v2.7 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.7',
    description: '博友圈 v2.7 版本说明。'
}

const RELEASE_INFO_V2_7 = {
    title: 'v2.7 版本说明',
    content: (
        <>
            <Paragraph style={{ marginBottom: 16 }}>
                博友圈于 2025 年 10 月 19 日发布了 v2.7 版本！该版本增加了「
                <Link href="/certificates/leileiluoluo.com">履约证书</Link>」和「
                <Link href="/link-graphs">连接系数</Link>」两个新的页面。前者用于展示博客在博友圈的履约情况；后者用于发现一个博客和另一个博客的连接度。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 12, fontWeight: 'bold' }}>
                1「履约证书」功能说明
            </Title>
            <Paragraph style={{ marginBottom: 16 }}>
                「履约证书」用于展示一个博客在博友圈的履约情况，若从收录之日起到现在未有断更和闭站的情况，即认为该博客在与博友圈正常履约中；否则，会被认为单方面毁约。建立该页面的初衷是希望博友能以此督促自己不断更、不闭站，将博客好好写下去。
            </Paragraph>
            <Paragraph style={{ marginBottom: 16 }}>
                用户可以从博客详情页点击履约进度条来查看对应博客的履约证书。
            </Paragraph>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                博客详情页履约进度条：
            </Paragraph>
            <div style={{ marginBottom: 24 }}>
                <Image
                    width={480}
                    src="/assets/images/sites/release_notes/v2.7/blog-detail-page.png"
                    alt="博客详情页履约进度条"
                    style={{ border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                履约证书：
            </Paragraph>
            <div style={{ marginBottom: 24 }}>
                <Image
                    width={480}
                    src="/assets/images/sites/release_notes/v2.7/performance-page.png"
                    alt="履约证书"
                    style={{ border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 12, fontWeight: 'bold' }}>
                2「连接系数」功能说明
            </Title>

            <Paragraph style={{ marginBottom: 16 }}>
                「连接系数」功能基于博客的友情链接数据构建，用于展示一个博客和另一个博客的连接度，连接度越高，说明两个博客之间的关系越密切。用户可以通过输入两个博客的域名来查看它们之间的连接系数。
            </Paragraph>

            <Paragraph style={{ marginBottom: 8, fontWeight: 500 }}>
                连接系数页面：
            </Paragraph>
            <div style={{ marginBottom: 24 }}>
                <Image
                    width={480}
                    src="/assets/images/sites/release_notes/v2.7/link-graph-page.png"
                    alt="连接系数页面"
                    style={{ border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 12, fontWeight: 'bold' }}>
                3 代码标签
            </Title>
            <Paragraph style={{ marginBottom: 8 }}>
                博友圈前端：<Link href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.7" target="_blank">boyouquan-ui</Link>
            </Paragraph>
            <Paragraph style={{ marginBottom: 16 }}>
                博友圈后端：<Link href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.7" target="_blank">boyouquan-api</Link>
            </Paragraph>
        </>
    ),
    publishedAt: '2025年10月19日'
}

export { META_V2_7, RELEASE_INFO_V2_7 };