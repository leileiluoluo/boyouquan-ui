import React from 'react';

const META_V1_1 = {
    title: 'v1.1 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.1',
    description: '博友圈 v1.1 版本说明。'
}

const RELEASE_INFO_V1_1 = {
    title: 'v1.1 版本说明',
    content: <>
        <p>博友圈于 2023 年 7 月 9 日发布了 v1.1 版本！该版本主要增加了博客广场页面，此外还在首页增加了文章搜索功能。</p>
        <h3>1 功能说明</h3>
        <p>该版本增加了一个新的页面——博客广场，主要用于展示所收录的全部博客，支持按域名或博客名搜索。</p>
        <p>博客广场的详细功能特性如下：</p>
        <p>
        </p><ul>
            <li>按最近更新时间分页展示博客条目；</li>
            <li>每个博客条目的信息包括博主头像、博客名称、博客描述、文章收录数、文章浏览数、最近更新时间，以及最新的 3 篇文章；</li>
            <li>支持按域名或博客名搜索博客。</li>
        </ul>
        <p></p>
        <p>此外，该版本还在首页增加了文章搜索功能（目前仅支持按文章标题搜索）。</p>
        <h3>2 页面截图</h3>
        <p>博客广场页</p>
        <p><img border="1" src="/assets/images/sites/release_notes/v1.1/blog-list-page.png" /></p>
        <p>首页</p>
        <p><img border="1" src="/assets/images/sites/release_notes/v1.1/home-page.png" /></p>
    </>,
    publishedAt: '2023年7月9日'
}

export { META_V1_1, RELEASE_INFO_V1_1 };