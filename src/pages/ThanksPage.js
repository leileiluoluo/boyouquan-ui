import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';

const meta = {
    title: '感谢名单 - 博友圈 · 博客人的朋友圈！',
    keywords: '感谢名单',
    description: '记录博友圈建站以来，对博友圈作出过帮助的朋友们。'
};

const content = <>
    <p>本页用于记录博友圈建站以来，对博友圈网站有过大力帮助的朋友们！</p>
    <h3>2024-04-23 感谢免费的 IP 地址位置信息获取网站</h3>
    <p>感谢国内免费的 IP 地址位置信息获取网站「<a href="https://whois.pconline.com.cn/ipJson.jsp">whois.pconline.com.cn</a>」，让博友圈在博客详情页可以显示对应博客的服务器物理位置信息！</p>

    <h3>2023-12-13 感谢免费的国内 Gravatar 加速网站</h3>
    <p>感谢国内的 Gravatar 头像获取加速网站「<a href="https://cravatar.cn/avatar">cravatar.cn</a>」，让博友圈的博友头像获取变得快速且稳定！</p>
    <p>之前，我们使用的 Gravatar 网址是「<a href="https://seccdn.libravatar.org/gravatarproxy">seccdn.libravatar.org</a>」，其部署在美国弗吉尼亚，国内访问不是很稳定，常有头像获取失败的情形。</p>
    <p>换为「<a href="https://cravatar.cn/avatar">cravatar.cn</a>」后，就奇快无比了。再次感谢你们，为国内用户提供了免费又可靠的解决方案。</p>

    <h3>2023-07-22 感谢博友雅余的故障反馈</h3>
    <p>感谢博友「<a href="/blogs?keyword=yayu.net">雅余</a>」的反馈，使我们发现了访问博友圈被解析到<code>0.0.0.0</code>的问题。</p>
    <p>这两天，收到博友「雅余」的反馈，访问网站时，域名被解析到了<code>0.0.0.0</code>，造成网站完全无法访问。</p>
    <p>查阅了一些信息，说可能是域名或 IP 被运营商屏蔽造成的。使用 PING 检测网站扫描了一下，发现访问博友圈，全国好多地方都被解析到了<code>127.0.0.1</code>，说明网站服务器公网 IP 大概率被运营商屏蔽了。 </p>
    <p>最后，通过与服务器提供商联系，更换了服务器的公网 IP，让该问题得以解决。再次感谢博友「雅余」，不是您的及时反馈，就不会发现这么严重的问题！ </p>
</>;

export default function ThanksPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Article title='感谢名单' content={content} />
            </main>
            <CommonFooter />
        </>
    )
}