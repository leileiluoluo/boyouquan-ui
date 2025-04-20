import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';

const meta = {
    title: '发布历史 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 发布历史',
    description: '博友圈网站发布历史。'
}

const content = <>
    <h3>v2.2（当前版本）</h3>
    <p>博友圈于 2025 年 4 月 20 日发布了 v2.2 版本！该版本对「提交博客」页面进行了优化，由之前的无邮箱验证即可直接提交博客，改为了先验证邮箱后提交博客。</p>
    <p><a href="/release-notes/v2.2">点击查看版本详情！</a></p>

    <h3>v2.1</h3>
    <p>博友圈于 2025 年 3 月 2 日发布了 v2.1 版本！该版本采纳了博友「皓子」的建议，为「博客广场」的博客列表返回新增了一种排序方式 ——「最长博龄」；同时，在「博客详情」页面新增了「博客年龄」的显示。</p>
    <p><a href="/release-notes/v2.1">点击查看版本详情！</a></p>

    <h3>v2.0</h3>
    <p>博友圈于 2024 年 11 月 1 日发布了 v2.0 版本！该版本虽未在用户界面或功能上进行大的调整，但在技术架构上却作了一次非常大的变更，其将博友圈这个之前集前后端为一体的应用程序进行了前后端分离。</p>
    <p><a href="/release-notes/v2.0">点击查看版本详情！</a></p>

    <h3>v1.10</h3>
    <p>博友圈于 2024 年 03 月 31 日发布了 v1.10 版本！该版本对星球穿梭功能进行了整体优化。</p>
    <p><a href="/release-notes/v1.10">点击查看版本详情！</a></p>

    <h3>v1.9</h3>
    <p>博友圈于 2024 年 01 月 26 日发布了 v1.9 版本！该版本发布了一个新的页面「每月精选」，用于展示过去每个月的精选文章。</p>
    <p><a href="/release-notes/v1.9">点击查看版本详情！</a></p>

    <h3>v1.8</h3>
    <p>博友圈于 2023 年 12 月 13 日发布了 v1.8 版本！该版本支持用户在「首页」文章聚合页面自定义排序方式。</p>
    <p><a href="/release-notes/v1.8">点击查看版本详情！</a></p>

    <h3>v1.7</h3>
    <p>博友圈于 2023 年 12 月 10 日发布了 v1.7 版本！该版本支持用户在「博客广场」页面自定义博客列表的排序方式。</p>
    <p><a href="/release-notes/v1.7">点击查看版本详情！</a></p>

    <h3>v1.6</h3>
    <p>博友圈于 2023 年 11 月 5 日发布了 v1.6 版本！该版本在「博客详情」页面增加了随机链接功能。</p>
    <p><a href="/release-notes/v1.6">点击查看版本详情！</a></p>

    <h3>v1.5</h3>
    <p>博友圈于 2023 年 7 月 20 日发布了 v1.5 版本！该版本新加了一个在线自助「提交博客」的页面、「审核结果」页面和邮件推送功能。</p>
    <p><a href="/release-notes/v1.5">点击查看版本详情！</a></p>

    <h3>v1.4</h3>
    <p>博友圈于 2023 年 7 月 15 日发布了 v1.4 版本！该版本增加了一个新的页面 —— 「博客详情」，用于展示单个博客的详细信息，包括：博客基本信息、总体统计信息、浏览统计信息和收录文章列表。</p>
    <p><a href="/release-notes/v1.4">点击查看版本详情！</a></p>

    <h3>v1.3</h3>
    <p>博友圈于 2023 年 7 月 12 日发布了 v1.3 版本！该版本有两项小改动：一是在首页增加了站内广播功能；二是对博客广场页面的排序算法做了修改，由原先的「按博客更新时间由近及远排序」改为了当前的「按博客收录时间由近及远排序」。</p>
    <p><a href="/release-notes/v1.3">点击查看版本详情！</a></p>

    <h3>v1.2</h3>
    <p>博友圈于 2023 年 7 月 10 日发布了 v1.2 版本！该版本主要增加了「星球穿梭」页面。</p>
    <p><a href="/release-notes/v1.2">点击查看版本详情！</a></p>

    <h3>v1.1</h3>
    <p>博友圈于 2023 年 7 月 9 日发布了 v1.1 版本！该版本主要增加了博客广场页面，此外还在首页增加了文章搜索功能。</p>
    <p><a href="/release-notes/v1.1">点击查看版本详情！</a></p>

    <h3>v1.0</h3>
    <p>博友圈于 2023 年 7 月 3 日发布了 v1.0 版本！该版本是博友圈建站以来的第一个版本，主要关注网站的基本功能，即博客搜集与文章展示。</p>
    <p><a href="/release-notes/v1.0">点击查看版本详情！</a></p></>

export default function ReleaseNotesPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Article
                    title='发布历史'
                    content={content} />
            </main>
            <CommonFooter />
        </>
    )
}