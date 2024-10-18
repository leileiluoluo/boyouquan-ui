import { useEffect } from 'react';
import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';

export default function ReleaseNoteV1_2() {
    useEffect(() => {
        document.title = 'v1.2 版本说明 - 博友圈 · 博客人的朋友圈！';
    }, []);

    return (
        <>
            <CommonHeader />
            <main class="main">
                <header class="post-header">
                    <h1 class="post-title">
                        v1.2 版本说明
                    </h1>
                    <div class="post-publish-date">
                        <p>2023年7月10日</p>
                    </div>
                </header>
                <article class="post-single">
                    <div class="post-content">
                        <p>博友圈于 2023 年 7 月 10 日发布了 v1.2 版本！该版本主要增加了「星球穿梭」页面。</p>
                        <h3>1 功能说明</h3>
                        <p>访问「星球穿梭」页面可以随机穿梭到一位博友的星球，即该页面会从博友圈所收录的博客中随机找一个，等待几秒钟后跳转过去。</p>
                        <h3>2 页面截图</h3>
                        <p>星球穿梭页</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.2/planet-shuttle-page.png" /></p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}