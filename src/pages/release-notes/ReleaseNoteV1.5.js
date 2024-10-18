import { useEffect } from 'react';
import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';

export default function ReleaseNoteV1_5() {
    useEffect(() => {
        document.title = 'v1.5 版本说明 - 博友圈 · 博客人的朋友圈！';
    }, []);

    return (
        <>
            <CommonHeader />
            <main class="main">
                <header class="post-header">
                    <h1 class="post-title">
                        v1.5 版本说明
                    </h1>
                    <div class="post-publish-date">
                        <p>2023年7月20日</p>
                    </div>
                </header>
                <article class="post-single">
                    <div class="post-content">
                        <p>博友圈于 2023 年 7 月 20 日发布了 v1.5 版本！该版本新加了一个在线自助「提交博客」的页面、「审核结果」页面和邮件推送功能。</p>

                        <h3>1 功能说明</h3>
                        <p>该版本之前，提交博客需要发送邮件，而且审核通过后，需要站长提交代码来手动添加博客记录，很耗时。</p>
                        <p>该版本新增了一个「提交博客」的页面，在线可以填写表单，所有字段的校验都是程序自动来做的，很方便快捷，而且审核通过或被驳回时，博客提交人会收到邮件提醒。</p>

                        <p>「审核结果」有列表和详情两个页面，用于展示提交博客后博客的审核状态。</p>

                        <h3>2 页面截图</h3>
                        <p>提交博客页</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.5/blog-requests-add-page.png" /></p>

                        <p>审核结果列表页</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.5/blog-requests-page.png" /></p>

                        <p>审核结果详情页</p>
                        <p><img border="1" src="/assets/images/sites/release_notes/v1.5/blog-requests-detail-page.png" /></p>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}