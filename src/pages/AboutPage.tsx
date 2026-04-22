import { useEffect } from 'react';
import { Typography, Table, Space, Card, Divider } from 'antd';
import { Meta } from '@components/common';
import { scrollToHash } from '@utils/ScrollUtil';
import Article from '@components/article/Article';
import { MetaFields } from '@types';

const { Title, Paragraph, Text, Link } = Typography;

const meta: MetaFields = {
    title: '关于本站 - 博友圈 · 博客人的朋友圈！',
    keywords: '关于本站',
    description: '博友圈网站介绍。'
}

const content = (
    <>
        <Paragraph style={{ marginBottom: 16 }}>
            您好，欢迎来到博友圈！
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            博友圈成立于 2023 年 7 月，旨在打造一个独立博客人专属的朋友圈！
        </Paragraph>

        <Title level={5} style={{ marginTop: 24, marginBottom: 16, fontWeight: 'bold' }} id="site-origin">
            建站初衷
        </Title>
        <Paragraph style={{ marginBottom: 16 }}>
            博友圈的建站初衷源于对独立博客坚守者的敬佩，秉持「不能让好的独立博客无人问津，更不能让它们在时光的长河中就此消亡」。博友圈致力于建立一个博客人的专属朋友圈，提供一个免费的平台，让各个领域的优质独立博客博主连接起来，让博主间有一个可以发现彼此、关注彼此、助力彼此的共同圈子。
        </Paragraph>

        <Title level={5} style={{ marginTop: 24, marginBottom: 16, fontWeight: 'bold' }} id="submit-blog">
            提交博客
        </Title>
        <Paragraph style={{ marginBottom: 16 }}>
            若您想申请自己的博客被本站收录，请先确认您的博客满足如下要求：
        </Paragraph>
        <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li>基础要求：仅限个人独立博客；</li>
            <li>内容要求：满足我国法律法规要求，勿含有政治（不得有任何贬低我国领导人，政治制度等言论）、色情（不得有任何衣着特别暴露的图片，包含动漫图片）、赌博、暴力等内容；</li>
            <li>原创要求：原创文章数占总文章数比例不少于 80%；</li>
            <li>站龄要求：建站已有一年或以上；</li>
            <li>RSS 要求：拥有可以访问的 RSS 地址（如：<Link href="https://www.boyouquan.com/feed.xml" target="_blank">https://www.boyouquan.com/feed.xml</Link>），且若您的博客有多种语言的文章，请为中文文章提供一个单独的 RSS 地址；</li>
            <li>性能要求：确保在中国大陆地区拥有良好的访问性能；</li>
            <li>个人承诺：十年不停更，十年不闭站！</li>
        </ul>
        <Paragraph style={{ marginBottom: 16 }}>
            确认满足如上要求并承诺十年不闭站后，可以通过点击导航栏「<Link href="https://www.boyouquan.com/blog-requests/add/email-validation" target="_blank">提交博客</Link>」按钮来填写申请表单，提交后一般在 24 小时内会得到审核，审核通过或未通过都会收到邮件提醒。
        </Paragraph>

        <Title level={5} style={{ marginTop: 24, marginBottom: 16, fontWeight: 'bold' }} id="del-link">
            修改博客
        </Title>
        <Paragraph style={{ marginBottom: 16 }}>
            若您因域名更换、站点重建等各种原因，想对已收录的博客信息进行修改，请使用能证明您是博客所有者的邮箱「<Link href="mailto:support@boyouquan.com?subject=博客信息修改&amp;body=博客地址：%0d%0a需要修改的信息：%0d%0a">给我们发送邮件</Link>」，信息修改成功后会收到邮件通知！
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            若您因任何原因，不想自己的博客被博友圈收录，也可以「<Link href="mailto:support@boyouquan.com?subject=博客删除申请&amp;body=博客地址：%0d%0a原因：%0d%0a">联系我们</Link>」进行删除，博客删除成功后也会收到邮件通知！
        </Paragraph>

        <Title level={5} style={{ marginTop: 24, marginBottom: 16, fontWeight: 'bold' }} id="add-link">
            添加链接
        </Title>
        <Paragraph style={{ marginBottom: 16 }}>
            希望您在收到博客通过审核的邮件通知后，将博友圈链接添加到您博客的适当位置，以让更多的博客人发现我们这个圈子！
        </Paragraph>

        <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li>站名：博友圈</li>
            <li>网址：<Link href="https://www.boyouquan.com/home" target="_blank">https://www.boyouquan.com/home</Link></li>
            <li>描述：博客人的朋友圈，将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！</li>
            <li>星球穿梭页：<Link href="https://www.boyouquan.com/planet-shuttle" target="_blank">https://www.boyouquan.com/planet-shuttle</Link></li>
            <li>素材：各尺寸 Logo 如下，请按需自取！</li>
        </ul>

        <Table
            dataSource={[
                {
                    key: '1',
                    size: '40px * 40px',
                    light: '/assets/images/sites/logo/logo-small.svg',
                    dark: '/assets/images/sites/logo/logo-small-dark.svg',
                },
                {
                    key: '2',
                    size: '84px * 30px',
                    light: '/assets/images/sites/logo/logo.svg',
                    dark: '/assets/images/sites/logo/logo-dark.svg',
                },
                {
                    key: '3',
                    size: '100px * 30px',
                    light: '/assets/images/sites/logo/planet-shuttle.svg',
                    dark: '/assets/images/sites/logo/planet-shuttle-dark.svg',
                },
                {
                    key: '4',
                    size: '100px * 30px',
                    light: {
                        src: 'https://www.boyouquan.com/images/logo/performance.svg?domainName=leileiluoluo.com',
                        tip: '请将链接中的 domainName 替换为您自己的',
                    },
                    dark: {
                        src: 'https://www.boyouquan.com/images/logo/performance-dark.svg?domainName=leileiluoluo.com',
                        tip: '请将链接中的 domainName 替换为您自己的',
                    },
                },
            ]}
            columns={[
                {
                    title: '尺寸',
                    dataIndex: 'size',
                    key: 'size',
                    width: '20%',
                },
                {
                    title: '亮色背景时使用',
                    dataIndex: 'light',
                    key: 'light',
                    width: '40%',
                    render: (value: string | { src: string; tip: string }) => {
                        if (typeof value === 'object') {
                            return (
                                <Space direction="vertical" size={4}>
                                    <Link href={value.src} target="_blank">
                                        <img width="100px" src={value.src} alt="logo" />
                                    </Link>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {value.tip}
                                    </Text>
                                </Space>
                            );
                        }
                        return (
                            <Link href={value} target="_blank">
                                <img width={value.includes('logo-small') ? '40px' : value.includes('logo.svg') || value.includes('logo-dark.svg') ? '84px' : '100px'} src={value} alt="logo" />
                            </Link>
                        );
                    },
                },
                {
                    title: '暗色背景时使用',
                    dataIndex: 'dark',
                    key: 'dark',
                    width: '40%',
                    render: (value: string | { src: string; tip: string }) => {
                        if (typeof value === 'object') {
                            return (
                                <Space direction="vertical" size={4}>
                                    <Link href={value.src} target="_blank">
                                        <img width="100px" src={value.src} alt="logo" />
                                    </Link>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {value.tip}
                                    </Text>
                                </Space>
                            );
                        }
                        return (
                            <Link href={value} target="_blank">
                                <img width={value.includes('logo-small') ? '40px' : value.includes('logo.svg') || value.includes('logo-dark.svg') ? '84px' : '100px'} src={value} alt="logo" />
                            </Link>
                        );
                    },
                },
            ]}
            pagination={false}
            bordered
            style={{ marginBottom: 24 }}
        />

        <Title level={5} style={{ marginTop: 24, marginBottom: 16, fontWeight: 'bold' }} id="data-spider">
            数据采集
        </Title>
        <Paragraph style={{ marginBottom: 16 }}>
            为了在本站聚合展示最新博文，本站会对已收录的博客定时进行数据采集，采集 URL 为博客的 RSS 地址，采集频率为 2 小时 1 次（一天 12 次），相信这样的频率不会对您的博客造成多大的压力。
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            此外，「<Link href="/link-graphs">连接系数</Link>」页面的博友连接度基于博客的友链数据来计算。该数据集每周采集一次，这个频率更不会对您的博客造成任何压力。
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            标识请求来源为本站的 <Text code>User-Agent</Text> 信息如下：
        </Paragraph>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <Text code style={{ whiteSpace: 'nowrap', fontSize: 12 }}>
                Mozilla/5.0 (compatible; Boyouquanspider/1.0; +https://www.boyouquan.com/about#data-spider)
            </Text>
        </div>
        <Paragraph style={{ marginBottom: 16 }}>
            若您不经意在服务器日志中发现了带有这些请求头的请求，请放心予以放行！
        </Paragraph>

        <Title level={5} style={{ marginTop: 24, marginBottom: 16, fontWeight: 'bold' }} id="subscribe-feed">
            文章订阅
        </Title>
        <Paragraph style={{ marginBottom: 16 }}>
            除了使用浏览器访问本站外，有一些朋友可能仍保留着使用订阅软件来阅读文章的习惯，本站特为这些用户开发了文章 RSS 订阅服务，订阅地址如下。
        </Paragraph>
        <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li>推荐文章 RSS 订阅地址：<Link href="https://www.boyouquan.com/feed.xml?sort=recommended" target="_blank">https://www.boyouquan.com/feed.xml?sort=recommended</Link></li>
        </ul>
        <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li>最新文章 RSS 订阅地址：<Link href="https://www.boyouquan.com/feed.xml?sort=latest" target="_blank">https://www.boyouquan.com/feed.xml?sort=latest</Link></li>
        </ul>

        <Title level={5} style={{ marginTop: 24, marginBottom: 16, fontWeight: 'bold' }} id="open-source">
            代码开源
        </Title>
        <Paragraph style={{ marginBottom: 16 }}>
            博友圈是一个前后端分离的 Web 项目，前端使用 React 编写，后端使用 Java 编写。源码已在 GitHub 开源，欢迎编码爱好者添加关注！您也可以完全自由的使用该开源代码搭建另一个「博友圈」，要求仅有一条，就是在您的网站底部标注一句话「本站使用博友圈（www.boyouquan.com）开源程序创建」。
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            此外，您若想了解博友圈的技术架构，请参阅站长的「<Link href="https://leileiluoluo.com/posts/boyouquan-v2-introduction.html" target="_blank">这篇博客文章</Link>」。
        </Paragraph>
        <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li>前端源码：<Link href="https://github.com/leileiluoluo/boyouquan-ui" target="_blank">github.com/leileiluoluo/boyouquan-ui</Link></li>
            <li>后端源码：<Link href="https://github.com/leileiluoluo/boyouquan-api" target="_blank">github.com/leileiluoluo/boyouquan-api</Link></li>
        </ul>

        <Title level={5} style={{ marginTop: 24, marginBottom: 16, fontWeight: 'bold' }} id="contact-admin">
            联系站长
        </Title>
        <Paragraph style={{ marginBottom: 16 }}>
            若您有关于本站的任何问题，请使用如下方式与我们联系！
        </Paragraph>
        <ul style={{ marginBottom: 16, paddingLeft: 24 }}>
            <li>邮箱地址：<Link href="mailto:support@boyouquan.com">support@boyouquan.com</Link></li>
        </ul>

        <Paragraph style={{ marginBottom: 16 }}>
            最后，愿独立博客可以走得更远！
        </Paragraph>
    </>
);

export default function AboutPage() {
    useEffect(() => {
        scrollToHash();
    }, []);

    return (
        <>
            <Meta meta={meta} />
            <Article title="关于本站" content={content} />
        </>
    );
}