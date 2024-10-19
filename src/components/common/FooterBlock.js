export default function FooterBlock() {
    const summaryStyle = {
        color: '#cb2e58', margin: '0 2px 0 2px'
    }

    const thanksStyle = {
        paddingTop: '8px',
        paddingBottom: '4px',
        borderBottom: '2px solid #cb2e58',
        width: '80px',
        margin: '0 auto'
    }

    return (
        <footer className="footer-block">
            <div className="footer-summary">
                <div className="flex-item">
                    <p>收录博客</p><a style={summaryStyle}>661</a><p>个</p>
                </div>
                <div className="flex-item">
                    <p>收录文章</p><a style={summaryStyle}>34436</a><p>篇</p>
                </div>
                <div className="flex-item">
                    <p>浏览文章</p><a style={summaryStyle}>619562</a><p>次</p>
                </div>
            </div>
            <div className="planet-shuttle">
                <a href="/planet-shuttle">「博友圈 · 星球穿梭」</a>
            </div>
            <div className="special-thanks" id="special-thanks">
                <div className="thanks-container">
                    <div style={thanksStyle}>
                        <a href="/sponsor">感谢赞助</a>
                    </div>
                    <div className="popular-bloggers">
                        <div className="blogger-one">
                            <a href="https://boke.lu/"><img src="/assets/images/sites/special_thanks/bokelu.png" /></a>
                            <span className="tooltiptext">博客录</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/blogs/blog.cuger.cn"><img src="https://www.boyouquan.com/gravatar/9aec3e60000157099f4adc30474af4ff?size=80" /></a>
                            <span className="tooltiptext">遐说</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/blogs/www.evan.xin"><img src="https://www.boyouquan.com/gravatar/8a5658b6a48eb08b963c1821007bfe0c?size=80" /></a>
                            <span className="tooltiptext">Evan's Space</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/blogs/blog.goodboyboy.top"><img src="https://www.boyouquan.com/gravatar/9da9d1d515d273d4794015f2321f6e04?size=80" /></a>
                            <span className="tooltiptext">GoodBoyboy's Blog</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/blogs/pinaland.cn"><img src="https://www.boyouquan.com/gravatar/e68e66aef5149a6b52606e87cc58d13c?size=80" /></a>
                            <span className="tooltiptext">晴空树</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/blogs/www.xiangshitan.com"><img src="https://www.boyouquan.com/gravatar/559c61f41dcb25516ac3d04c4976d4ce?size=80" /></a>
                            <span className="tooltiptext">响石潭</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/blogs/pwsz.com"><img src="https://www.boyouquan.com/gravatar/8e5566d153dba1c372c54eae02401d96?size=80" /></a>
                            <span className="tooltiptext">品味苏州</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/blogs/vrast.cn"><img src="https://www.boyouquan.com/gravatar/daf8e241a023b5c47ea90d1041c51413?size=80" /></a>
                            <span className="tooltiptext">Keyle's Blog</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/blogs/www.dao.js.cn"><img src="https://www.boyouquan.com/gravatar/37d41e2b550633a30f5d41de61c1aa92?size=80" /></a>
                            <span className="tooltiptext">懋和道人</span>
                        </div>
                        <div className="blogger-one">
                            <a href="/sponsor"><img src="/assets/images/sites/special_thanks/plus.svg" /></a>
                            <span className="tooltiptext">我也要赞助</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-contact">
                特别声明：包含政治、色情、赌博与暴力等违规内容的博客，一经发现，将被永久移出收录名单！举报违规博客，请「<a href="mailto:contact@boyouquan.com?subject=违规内容举报&amp;body=收录页面：%0d%0a违规内容：%0d%0a">联系站长</a>」。
            </div>
        </footer>
    )
}