import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';

export default function ReleaseNoteV1_0() {
    const meta = {
        title: 'v1.0 版本说明 - 博友圈 · 博客人的朋友圈！',
        keywords: '博友圈, 版本说明, v1.0',
        description: '博友圈 v1.0 版本说明。'
    }

    return (
        <>
            <Meta meta={meta}/>
            <CommonHeader />
            <main className="main">
                <header className="post-header">
                    <h1 className="post-title">
                        v1.0 版本说明
                    </h1>
                    <div className="post-publish-date">
                        <p>2023年7月3日</p>
                    </div>
                </header>
                <article className="post-single">
                    <div className="post-content">
                        <p>博友圈于 2023 年 7 月 3 日发布了 v1.0 版本！该版本是博友圈建站以来的第一个版本，主要关注网站的基本功能，即博客搜集与文章展示。</p>
                        <h3>1 功能说明</h3>
                        <p>该版本收录的博客名单由网站维护者手动更新，后台会每隔 1 小时自动对名单中的博客根据 RSS 协议抓取一次最新文章。</p>
                        <p>该版本只包含一个 Home 页，用于对所抓取的博客文章按发布时间倒序展示。</p>
                        <p>Home 页的功能特性如下：</p>
                        <p>
                        </p><ul>
                            <li>按博客发布时间由新到旧分页展示文章条目；</li>
                            <li>每个文章条目包含标题、描述、博主头像、发布时间和浏览次数；</li>
                            <li>页面底部展示收录的博客总数、文章总数和浏览总数。</li>
                        </ul>
                        <p></p>
                        <h3>2 页面截图</h3>
                        <p>Home 页</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.0/home-page.png" /></p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}