import React from 'react';
import { Helmet } from 'react-helmet';

export default function Meta({ meta }) {
    if (null == meta) {
        meta = {
            title: '首页 - 博友圈 · 博客人的朋友圈！',
            keywords: '博客, 博友, 博客圈, 博友圈, 朋友圈, 收录, RSS, 聚合, 中文, 独立博客',
            description: '博友圈是博客人的专属朋友圈。我们的愿景是：将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！'
        }
    }
    return (
        <Helmet>
            <title>{meta.title}</title>
            <meta name="keywords" content={meta.keywords} />
            <meta name="description" content={meta.description} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
        </Helmet>
    )
}