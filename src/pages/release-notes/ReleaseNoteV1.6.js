import { useEffect } from 'react';
import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';

export default function ReleaseNoteV1_6() {
    useEffect(() => {
        document.title = 'v1.6 版本说明 - 博友圈 · 博客人的朋友圈！';
    }, []);

    return (
        <>
            <CommonHeader />
            <main class="main">
                <header class="post-header">
                    <h1 class="post-title">
                        v1.6 版本说明
                    </h1>
                    <div class="post-publish-date">
                        <p>2023年11月5日</p>
                    </div>
                </header>
                <article class="post-single">
                    <div class="post-content">
                        <p>博友圈于 2023 年 11 月 5 日发布了 v1.6 版本！该版本在「博客详情」页面增加了随机链接功能。</p>

                        <h3>1 功能说明</h3>
                        <p>「博客详情」页面的底部，会随机展示两个博客，提高博客的曝光率和互联度。</p>

                        <h3>2 页面截图</h3>
                        <p>博客详情页</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.6/random-links-in-blog-detail-page.png" /></p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}