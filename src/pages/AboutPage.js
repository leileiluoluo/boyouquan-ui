import { useEffect } from 'react';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import { scrollToHash } from '../utils/ScrollUtil';
import Article from '../components/article/Article';
import { Box, Container, Link, ScrollArea, Table, Text } from '@radix-ui/themes';

const meta = {
    title: '关于本站 - 博友圈 · 博客人的朋友圈！',
    keywords: '关于本站',
    description: '博友圈网站介绍。'
}

const content = <>
    <p>您好，欢迎来到博友圈！</p>
    <p>博友圈成立于 2023 年 7 月，旨在打造一个独立博客人专属的朋友圈！</p>

    <h4 id="site-origin">建站初衷</h4>
    <p>博友圈的建站初衷源于对独立博客坚守者的敬佩，秉持「不能让好的独立博客无人问津，更不能让它们在时光的长河中就此消亡」。博友圈致力于建立一个博客人的专属朋友圈，提供一个免费的平台，让各个领域的优质独立博客博主连接起来，让博主间有一个可以发现彼此、关注彼此、助力彼此的共同圈子。</p>

    <h4 id="submit-blog">提交博客</h4>
    <p>若您想申请自己的博客被本站收录，请先确认您的博客满足如下要求：</p>
    <ul>
        <li>基础要求：仅限个人独立博客；</li>
        <li>内容要求：满足我国法律法规要求，勿含有政治（不得有任何贬低我国领导人，政治制度等言论）、色情（不得有任何衣着特别暴露的图片，包含动漫图片）、赌博、暴力等内容；</li>
        <li>原创要求：原创文章数占总文章数比例不少于 80%；</li>
        <li>站龄要求：建站已有一年或以上；</li>
        <li>RSS 要求：拥有可以访问的 RSS 地址（如：<a href="https://www.boyouquan.com/feed.xml">https://www.boyouquan.com/feed.xml</a>）；</li>
        <li>性能要求：确保在中国大陆地区拥有良好的访问性能；</li>
        <li>个人承诺：十年不停更，十年不闭站！</li>
    </ul>
    <p>确认满足如上要求并承诺十年不闭站后，可以通过点击导航栏「<a href="https://www.boyouquan.com/blog-requests/add/email-validation">提交博客</a>」按钮来填写申请表单，提交后一般在 24 小时内会得到审核，审核通过或未通过都会收到邮件提醒。</p>

    <h4 id="del-link">修改博客</h4>
    <p>若您因域名更换、站点重建等各种原因，想对已收录的博客信息进行修改，请使用能证明您是博客所有者的邮箱「<a href="mailto:contact@boyouquan.com?subject=博客信息修改&amp;body=博客地址：%0d%0a需要修改的信息：%0d%0a">给我们发送邮件</a>」，信息修改成功后会收到邮件通知！</p>
    <p>若您因任何原因，不想自己的博客被博友圈收录，也可以「<a href="mailto:contact@boyouquan.com?subject=博客删除申请&amp;body=博客地址：%0d%0a原因：%0d%0a">联系我们</a>」进行删除，博客删除成功后也会收到邮件通知！</p>

    <h4 id="add-link">添加链接</h4>
    <p>希望您在收到博客通过审核的邮件通知后，将博友圈链接添加到您博客的适当位置，以让更多的博客人发现我们这个圈子！</p>

    <ul>
        <li>站名：博友圈</li>
        <li>网址：<a href="https://www.boyouquan.com/home">https://www.boyouquan.com/home</a></li>
        <li>描述：博客人的朋友圈，博客收录与文章 RSS 聚合网站。</li>
        <li>星球穿梭页：<a href="https://www.boyouquan.com/planet-shuttle">https://www.boyouquan.com/planet-shuttle</a></li>
        <li>素材：各尺寸 Logo 如下，请按需自取！</li>
    </ul>

    <Table.Root variant="surface">
        <Table.Body>
            <Table.Row>
                <Table.RowHeaderCell>40px * 40px</Table.RowHeaderCell>
                <Table.Cell><Link target="_blank" href="/assets/images/sites/logo/logo-small.svg"><img width="40px" src="/assets/images/sites/logo/logo-small.svg" /></Link></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.RowHeaderCell>84px * 30px</Table.RowHeaderCell>
                <Table.Cell><Link target="_blank" href="/assets/images/sites/logo/logo.svg"><img width="84px" src="/assets/images/sites/logo/logo.svg" /></Link></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.RowHeaderCell>100px * 30px</Table.RowHeaderCell>
                <Table.Cell><Link target="_blank" href="/assets/images/sites/logo/planet-shuttle.svg"><img width="100px" src="/assets/images/sites/logo/planet-shuttle.svg" /></Link></Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table.Root>

    <h4 id="data-spider">数据采集</h4>
    <p>为了在本站聚合展示最新博文，本站会对已收录的博客定时进行数据采集，采集 URL 为博客的 RSS 地址，采集频率为 2 小时 1 次（一天 12 次），采集时间为每个双数正点（0 点、2 点、4 点，...，22 点），相信这样的频率不会对您的服务器造成多大的压力。</p>
    <p>标识请求来源为本站的 HTTP<code>User-Agent</code>信息如下：</p>
    <ScrollArea scrollbars="horizontal">
        <Text size="2">Mozilla/5.0 (compatible; Boyouquanspider/1.0; +https://www.boyouquan.com/about#data-spider)</Text>
    </ScrollArea>
    <p>若您不经意在服务器日志中发现了许多带有这些请求头的请求，请放心予以放行！</p>

    <h4 id="subscribe-feed">文章订阅</h4>
    <p>除了使用浏览器访问本站外，有一些朋友可能仍保留着使用订阅软件来阅读文章的习惯，本站特为这些用户开发了文章 RSS 订阅服务，订阅地址如下。</p>
    <ul>
        <li>推荐文章 RSS 订阅地址：<a href="https://www.boyouquan.com/feed.xml?sort=recommended">https://www.boyouquan.com/feed.xml?sort=recommended</a></li>
    </ul>
    <ul>
        <li>最新文章 RSS 订阅地址：<a href="https://www.boyouquan.com/feed.xml?sort=latest">https://www.boyouquan.com/feed.xml?sort=latest</a></li>
    </ul>

    <h4 id="open-source">代码开源</h4>
    <p>博友圈是一个前后端分离的 Web 项目，前端使用 React 编写，后端使用 Java 编写。源码已在 GitHub 开源，欢迎编码爱好者添加关注！您也可以完全自由的使用该开源代码搭建另一个「博友圈」，要求仅有一条，就是在您的网站底部标注一句话「本站使用博友圈（www.boyouquan.com）开源程序创建」。</p>
    <p>此外，您若想了解博友圈的技术架构，请参阅站长的「<a href="https://leileiluoluo.com/posts/boyouquan-v2-introduction.html">这篇博客文章</a>」。</p>
    <ul>
        <li>前端源码：<a href="https://github.com/leileiluoluo/boyouquan-ui">github.com/leileiluoluo/boyouquan-ui</a></li>
        <li>后端源码：<a href="https://github.com/leileiluoluo/boyouquan-api">github.com/leileiluoluo/boyouquan-api</a></li>
    </ul>

    <h4 id="contact-admin">联系站长</h4>
    <p>若您有关于本站的任何问题，请使用如下方式与我们联系！</p>
    <ul>
        <li>邮箱地址：<a href="mailto:contact@boyouquan.com">contact@boyouquan.com</a></li>
    </ul>

    <p>最后，愿独立博客可以走得更远！</p>
</>;

export default function AboutPage() {
    useEffect(() => {
        scrollToHash();
    });

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Article title='关于本站' content={content} />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}