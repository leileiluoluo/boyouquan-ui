import React from 'react';

const META_V1_10 = {
    title: 'v1.10 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.10',
    description: '博友圈 v1.10 版本说明。'
}

const RELEASE_INFO_V1_10 = {
    title: 'v1.10 版本说明',
    content: <>
        <p>博友圈于 2024 年 03 月 31 日发布了 v1.10 版本！该版本对星球穿梭功能进行了整体优化。</p>

        <h3>功能说明</h3>
        <p>上一个版本，星球穿梭只是一个可以跳转到随机博客的简单页面。而本次则对星球穿梭进行了全链路的优化，将数据与行为完整的连接了起来。下面对具体的优化细节进行说明。</p>

        <p>1）当博友在其博客的任一页面添加了博友圈「<a href="/planet-shuttle">星球穿梭链接</a>」时，其即开启了星球穿梭功能。</p>
        <p><img border="1" src="/assets/images/sites/release_notes/v1.10/from-blog.png" /></p>

        <p>2）当访问者点击星球穿梭链接时，即会跳转到博友圈星球穿梭页面。该页面会自动检测来源博客，并显示其博客名、助力值（助力次数）与博客的博友圈链接。</p>
        <p><img border="1" src="/assets/images/sites/release_notes/v1.10/planet-shuttle.png" /></p>

        <p>3）5 秒后，星球穿梭页面即会自动跳转到一个随机博客。跳转到的博客链接会添加原始的来源博客地址（如：?from=https://leileiluoluo.com），方便对发起穿梭的博客进行推广！</p>
        <p><img border="1" src="/assets/images/sites/release_notes/v1.10/to-blog.png" /></p>

        <p>4）此外，在博客详情页面还会展示穿梭发起者的详细助力数据。</p>
        <p><img border="1" src="/assets/images/sites/release_notes/v1.10/blog-detail.png" /></p>

        <p>所以，本次的优化即对星球穿梭功能进行了全链路的数据整合，相信会较之前的版本提升了用户体验。</p>

        <p><strong>想马上体验一下？</strong>那就快戳示例博客：<a href="https://leileiluoluo.com">leileiluoluo.com</a>，然后拉至网站底部，点击「博友圈 · 星球穿梭」试试吧！</p>
    </>,
    publishedAt: '2024年03月31日'
}

export { META_V1_10, RELEASE_INFO_V1_10 };