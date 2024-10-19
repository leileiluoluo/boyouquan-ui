import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';

export default function ReleaseNoteV1_7() {
    const meta = {
        title: 'v1.7 版本说明 - 博友圈 · 博客人的朋友圈！',
        keywords: '博友圈, 版本说明, v1.7',
        description: '博友圈 v1.7 版本说明。'
    }

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <header className="post-header">
                    <h1 className="post-title">
                        v1.7 版本说明
                    </h1>
                    <div className="post-publish-date">
                        <p>2023年12月10日</p>
                    </div>
                </header>
                <article className="post-single">
                    <div className="post-content">
                        <p>博友圈于 2023 年 12 月 10 日发布了 v1.7 版本！该版本支持用户在「博客广场」页面自定义博客列表的排序方式。</p>

                        <h3>1 功能说明</h3>
                        <p>「博客广场」页面新增两种可选的排序方式：最多浏览和最近收录。选择最多浏览时，博客列表按照浏览总数降序排序；选择最近收录时，博客列表按照收录时间降序排序，默认排序方式为最多浏览。</p>

                        <h3>2 页面截图</h3>
                        <p>选择最多浏览</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.7/blog-sort-with-access-count-in-blog-list-page.png" /></p>

                        <p>选择最近收录</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.7/blog-sort-with-collect-time-in-blog-list-page.png" /></p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}