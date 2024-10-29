const META_V1_5 = {
    title: 'v1.5 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v1.5',
    description: '博友圈 v1.5 版本说明。'
}

const RELEASE_INFO_V1_5 = {
    title: 'v1.5 版本说明',
    content: <>
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
    </>,
    publishedAt: '2023年7月20日'
}

export { META_V1_5, RELEASE_INFO_V1_5 };