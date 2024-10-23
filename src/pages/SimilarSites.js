import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';

export default function SimilarSites() {
    const meta = {
        title: '同类网站 - 博友圈 · 博客人的朋友圈！',
        keywords: '同类网站',
        description: '博友圈同类网站列表。'
    }

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <header className="post-header">
                    <h1 className="post-title">
                        同类网站
                    </h1>
                </header>
                <article className="post-single">
                    <div className="post-content">
                        <p>下面列出一些与博友圈类似的博客收录网站，希望关注博友圈的朋友们也可以同时关注一下这些同类网站，其中有的收录站点已有接近 20 年的站龄，感谢他们的陪伴与引流，让这个年代还在坚持写博客的人有了一些温暖!</p>
                        <br />
                        <ul>
                            <li><a href="https://boke.lu/">博客录</a> · 一个 UI 设计极其精致的博客收录与展示网站</li>
                            <li><a href="http://www.jetli.com.cn/">博客志</a> · 专注优秀个人独立博客导航十七年</li>
                            <li><a href="https://www.foreverblog.cn/">十年之约</a> · 博客收录网站，申请加入者需要遵守博客十年不关闭的诺言</li>
                            <li><a href="https://bf.zzxworld.com/">BlogFinder</a> · 每个博客都是一座宝藏，发现优秀的个人博客</li>
                            <li><a href="https://blogwe.com/">BlogWe</a> · 博客我们，愿景是做最好的个人博客导航</li>
                            <li><a href="https://blogscn.fun/">笔墨迹</a> · 致敬还在写博客的我们</li>
                            <li><a href="https://storeweb.cn/">个站商店</a> · 一个精致地带社交元素的个人网站发布平台，博客收录网站</li>
                            <li><a href="https://bokequan.cn/">博客圈</a> · 一个按地区分组的博客收录网站</li>
                            <li><a href="https://daohang.lusongsong.com/">博客大全</a> · 优秀的草根博客导航</li>
                            <li><a href="https://chuanliu.org/">川流</a> · 一个博客导航网站</li>
                            <li><a href="https://github.com/timqian/chinese-independent-blogs">中文独立博客列表</a> · 一个精心筛选的中文博客列表（使用 GitHub 仓库定期更新）</li>
                            <li><a href="https://zhblogs.ohyee.cc/">中文博客导航</a> · 尝试链接几乎所有的中文博客</li>
                            <li><a href="https://www.zdzn.net/page/blog.html">博客集</a> · 优秀博客收录站</li>
                        </ul>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}