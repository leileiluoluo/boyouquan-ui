import React from 'react';

const META_V2_1 = {
    title: 'v2.1 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.1',
    description: '博友圈 v2.1 版本说明。'
}

const RELEASE_INFO_V2_1 = {
    title: 'v2.1 版本说明',
    content: <>
        <p>博友圈于 2025 年 3 月 2 日发布了 v2.1 版本！该版本采纳了博友「<a href="/blogs/howiehz.top">皓子</a>」的建议，为「博客广场」的博客列表返回新增了一种排序方式 ——「最长博龄」；同时，在「博客详情」页面新增了「博客年龄」的显示。</p>

        <h3>1 功能说明</h3>
        <p>针对「博客广场」页面中博客列表的展示，该版本在原有「最近收录」、「最多浏览」的基础上，新增了一种新的排序方式 ——「最长博龄」，即可以根据建博时间的早晚来分页展示博客列表。</p>
        <p><img border="1" src="/assets/images/sites/release_notes/v2.1/blogs.png" /></p>

        <p>同时，当进入「博客详情」页面时，新增了「博客年龄」的显示。</p>
        <p><img border="1" src="/assets/images/sites/release_notes/v2.1/blog-detail.png" /></p>

        <h3>2 代码标签</h3>
        <p>博友圈前端：<a href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.1">boyouquan-ui</a></p>
        <p>博友圈后端：<a href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.1">boyouquan-api</a></p>
    </>,
    publishedAt: '2025年3月2日'
}

export { META_V2_1, RELEASE_INFO_V2_1 };