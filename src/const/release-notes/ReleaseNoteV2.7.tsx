import React from 'react';

const META_V2_7 = {
    title: 'v2.7 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.7',
    description: '博友圈 v2.7 版本说明。'
}

const RELEASE_INFO_V2_7 = {
    title: 'v2.7 版本说明',
    content: <>
        <p>博友圈于 2025 年 10 月 19 日发布了 v2.7 版本！该版本增加了「<a href="/certificates/leileiluoluo.com">履约证书</a>」和「<a href="/link-graphs">连接系数</a>」两个新的页面。前者用于展示博客在博友圈的履约情况；后者用于发现一个博客和另一个博客的连接度。</p>

        <h4>1「履约证书」功能说明</h4>
        <p>「履约证书」用于展示一个博客在博友圈的履约情况，若从收录之日起到现在未有断更和闭站的情况，即认为该博客在与博友圈正常履约中；否则，会被认为单方面毁约。建立该页面的初衷是希望博友能以此督促自己不断更、不闭站，将博客好好写下去。</p>
        <p>用户可以从博客详情页点击履约进度条来查看对应博客的履约证书。</p>

        <p>博客详情页履约进度条：</p>
        <p><img align="center" width="480px" border="1" src="/assets/images/sites/release_notes/v2.7/blog-detail-page.png" /></p>

        <p>履约证书：</p>
        <p><img align="center" width="480px" border="1" src="/assets/images/sites/release_notes/v2.7/performance-page.png" /></p>

        <h4>2「连接系数」功能说明</h4>

        <p>「连接系数」功能基于博客的友情链接数据构建，用于展示一个博客和另一个博客的连接度，连接度越高，说明两个博客之间的关系越密切。用户可以通过输入两个博客的域名来查看它们之间的连接系数。</p>

        <p>连接系数页面：</p>
        <p><img align="center" width="480px" border="1" src="/assets/images/sites/release_notes/v2.7/link-graph-page.png" /></p>

        <h4>3 代码标签</h4>
        <p>博友圈前端：<a href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.7">boyouquan-ui</a></p>
        <p>博友圈后端：<a href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.7">boyouquan-api</a></p>
    </>,
    publishedAt: '2025年10月19日'
}

export { META_V2_7, RELEASE_INFO_V2_7 };