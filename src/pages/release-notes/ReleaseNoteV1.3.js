import { useEffect } from 'react';
import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';

export default function ReleaseNoteV1_3() {
    useEffect(() => {
        document.title = 'v1.3 版本说明 - 博友圈 · 博客人的朋友圈！';
    }, []);

    return (
        <>
            <CommonHeader />
            <main class="main">
                <header class="post-header">
                    <h1 class="post-title">
                        v1.3 版本说明
                    </h1>
                    <div class="post-publish-date">
                        <p>2023年7月12日</p>
                    </div>
                </header>
                <article class="post-single">
                    <div class="post-content">
                        <p>博友圈于 2023 年 7 月 12 日发布了 v1.3 版本！该版本有两项小改动：一是在首页增加了站内广播功能；二是对博客广场页面的排序算法做了修改，由原先的「按博客更新时间由近及远排序」改为了当前的「按博客收录时间由近及远排序」。</p>

                        <h3>1 功能说明</h3>
                        <p>经过站长这几天的琢磨，个人觉得首页需要有一个「站内广播」的功能，即把网站最新的动态以广播的方式在首页展示出来。这些动态包括新收录的博客、最近一段时间更新最频繁的博客、最近一段时间访问最多的博客等，这样可以让大家在进入网站首页时就能获取到网站的最新动态。</p>
                        <p>再一个是博客广场的排序算法，个人认为原先的「按更新时间由近及远排序」算法并不妥当，因为关注该页面的用户可能是近期提交完博客的博友，想在该页面查看自己的博客有没有被收录，而「按收录时间由近及远排序」就刚好适合这样的用户场景，使用起来也就更方便一些。</p>

                        <h3>2 页面截图</h3>
                        <p>首页</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.3/home-page.png" /></p>
                        <p>博客广场页</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.3/blog-list-page.png" /></p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}