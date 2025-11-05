import React from 'react';

const META_V2_0 = {
    title: 'v2.0 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.0',
    description: '博友圈 v2.0 版本说明。'
}

const RELEASE_INFO_V2_0 = {
    title: 'v2.0 版本说明',
    content: <>
        <p>博友圈于 2024 年 11 月 1 日发布了 v2.0 版本！该版本虽未在用户界面或功能上进行大的调整，但在技术架构上却作了一次非常大的变更，其将博友圈这个之前集前后端为一体的应用程序进行了前后端分离。</p>

        <h3>变更说明</h3>
        <p>「<a href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v1.10">v1 版本的博友圈项目</a>」是一个集前后端为一体的应用程序，其是一个 Maven 管理的 Java 工程，使用了 Spring Boot + Thymeleaf + MyBatis 框架。</p>

        <p>而本次的 v2 版本（前端：<a href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.0">boyouquan-ui</a>，后端：<a href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.0">boyouquan-api</a>）则将博友圈单体项目进行了前后端分离。前端使用了 React 框架；后端依然使用 Spring Boot + MyBatis 框架，但去除了 Thymeleaf 渲染页面的部分，使得后端变为了一个纯净的 REST API 提供者。</p>

        <p>关于博友圈项目 v2 版本的前后端架构、内部设计，及启动设置等相关介绍，请参阅站长的「<a href="https://leileiluoluo.com/posts/boyouquan-v2-introduction.html">这篇博客文章</a>」。</p>
    </>,
    publishedAt: '2024年11月1日'
}

export { META_V2_0, RELEASE_INFO_V2_0 };