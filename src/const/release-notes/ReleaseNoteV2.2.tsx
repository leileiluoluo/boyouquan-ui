import { Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const META_V2_2 = {
    title: 'v2.2 版本说明 - 博友圈 · 博客人的朋友圈！',
    keywords: '博友圈, 版本说明, v2.2',
    description: '博友圈 v2.2 版本说明。'
};

const RELEASE_INFO_V2_2 = {
    title: 'v2.2 版本说明',
    content: (
        <>
            <Paragraph>
                博友圈于 2025 年 4 月 20 日发布了 v2.2 版本！该版本对「提交博客」页面进行了优化，由之前的无邮箱验证即可直接提交博客，改为了先验证邮箱后提交博客。
            </Paragraph>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                1 功能说明
            </Title>
            <Paragraph>
                针对之前「提交博客」页面没有邮箱验证即可提交博客的情形，本次版本对该功能进行了安全加固，即只有邮箱验证通过后才能提交博客。
            </Paragraph>

            <Paragraph>
                这样，当用户在首页点击「提交博客」菜单时，会首先跳转到邮箱验证页面，点击发送验证码并且当邮箱验证通过后，才可以填写博客信息进行提交。
            </Paragraph>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.2/email_validation.png"
                    alt="邮箱验证"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <div style={{ marginBottom: 14, textAlign: 'center' }}>
                <Image
                    src="/assets/images/sites/release_notes/v2.2/blog_request_input.png"
                    alt="博客提交信息"
                    style={{ width: '60%', border: '1px solid #d9d9d9', borderRadius: 4 }}
                />
            </div>

            <Title level={5} style={{ marginTop: 24, marginBottom: 16 }}>
                2 代码标签
            </Title>
            <Paragraph>
                博友圈前端：<a href="https://github.com/leileiluoluo/boyouquan-ui/releases/tag/v2.2" target="_blank">boyouquan-ui</a>
            </Paragraph>
            <Paragraph>
                博友圈后端：<a href="https://github.com/leileiluoluo/boyouquan-api/releases/tag/v2.2" target="_blank">boyouquan-api</a>
            </Paragraph>
        </>
    ),
    publishedAt: '2025年4月20日'
};

export { META_V2_2, RELEASE_INFO_V2_2 };