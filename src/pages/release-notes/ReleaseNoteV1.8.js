import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';

export default function ReleaseNoteV1_8() {
    const meta = {
        title: 'v1.8 版本说明 - 博友圈 · 博客人的朋友圈！',
        keywords: '博友圈, 版本说明, v1.8',
        description: '博友圈 v1.8 版本说明。'
    }

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <header className="post-header">
                    <h1 className="post-title">
                        v1.8 版本说明
                    </h1>
                    <div className="post-publish-date">
                        <p>2023年12月13日</p>
                    </div>
                </header>
                <article className="post-single">
                    <div className="post-content">
                        <p>博友圈于 2023 年 12 月 13 日发布了 v1.8 版本！该版本支持用户在「首页」文章聚合页面自定义排序方式。</p>

                        <h3>1 功能说明</h3>
                        <p>「首页」文章聚合页面新增两种可选的排序方式：推荐和最新。选择推荐时，会按发布时间降序展示推荐的文章；选择最新时，会按发布时间降序展示收录的文章，默认排序方式为推荐。</p>

                        <h3>2 页面截图</h3>
                        <p>选择推荐</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.8/post-sort-with-recommended-in-home-page.png" /></p>

                        <p>选择最新</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.8/post-sort-with-latest-in-home-page.png" /></p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}