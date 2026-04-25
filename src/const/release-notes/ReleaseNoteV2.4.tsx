import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V2_4 = {
    title: 'v2.4 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.4',
    description: '博友圈 v2.4 版本说明。'
};

const RELEASE_INFO_V2_4 = {
    title: 'v2.4 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2025 年 8 月 23 日发布了 v2.4 版本！该版本在「<a href="/monthly-selected">每月精选</a>」页面新增了邮件订阅功能；对「<a href="/blogs/leileiluoluo.com">博客详情</a>」页面作了优化，优化后的数据统计模块和收录文章模块更加简洁大方。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                该版本在「每月精选」页面新增了邮件订阅功能。用户在浏览该页面时，若对每月精选文章感兴趣，可以在该页面上方输入框直接键入邮件并点击订阅按钮，这样在每个月初就可以收到上个月的精选文章了。
            </Paragraph>


            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.4/monthly-selected.png"
                    alt="每月精选"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph>
                此外，该版本还对「博客详情」页面作了优化。
            </Paragraph>
            <Paragraph>
                将详情页面数据统计模块中的多个图表由之前的上下堆叠展示改为了现在的固定区域展示，且可以点击类型自动切换图表。
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.4/blog-page-charts.png"
                    alt="博客图表"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph>
                还将详情页面收录文章模块中的文章由之前的表格展示改为了现在的时间线展示，这样不仅美观，且按年份分类后博友对自己每年的文章发布情况会更加了如指掌。
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.4/blog-page-posts.png"
                    alt="博客文章时间线"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Paragraph>
                此外，该版本还对「星球穿梭」页面和全站底部区域作了微调，希望该版本会给大家带来更好的使用体验。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 代码标签
            </Title>
            <Paragraph>
                博友圈前端：<a href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.4" target="_blank">boyouquan-ui</a>
            </Paragraph>
            <Paragraph>
                博友圈后端：<a href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.4" target="_blank">boyouquan-api</a>
            </Paragraph>
        </>
    ),
    publishedAt: '2025年8月23日'
};

export { META_V2_4, RELEASE_INFO_V2_4 };