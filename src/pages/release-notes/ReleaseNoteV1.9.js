import { useEffect } from 'react';
import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';

export default function ReleaseNoteV1_9() {
    useEffect(() => {
        document.title = 'v1.9 版本说明 - 博友圈 · 博客人的朋友圈！';
    }, []);

    return (
        <>
            <CommonHeader />
            <main className="main">
                <header className="post-header">
                    <h1 className="post-title">
                        v1.9 版本说明
                    </h1>
                    <div className="post-publish-date">
                        <p>2024年01月26日</p>
                    </div>
                </header>
                <article className="post-single">
                    <div className="post-content">
                        <p>博友圈于 2024 年 01 月 26 日发布了 v1.9 版本！该版本发布了一个新的页面「每月精选」，用于展示过去每个月的精选文章。</p>

                        <h3>1 功能说明</h3>
                        <p>「每月精选」会从每个月筛选 10 篇人气最旺的文章，然后在该页面进行统一展示。</p>

                        <h3>2 页面截图</h3>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.9/monthly-selected-page.png" /></p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}