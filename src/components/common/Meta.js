import { Helmet } from 'react-helmet';

export default function Meta({ meta }) {
    if (null == meta) {
        meta = {
            title: '首页 - 博友圈 · 博客人的朋友圈！',
            keywords: '博客, 博友, 博客圈, 博友圈, 朋友圈, 收录, RSS, 聚合, 中文, 独立博客',
            description: '您有多久没有读过一篇长文了？那些记忆中有趣的博客还在更新吗？博友圈是博客人的专属朋友圈，连接还在写博的博友，让那属于文字的时代延续光辉！'
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