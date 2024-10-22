import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';

export default function Sponsor() {
    const meta = {
        title: '赞助本站 - 博友圈 · 博客人的朋友圈！',
        keywords: '赞助本站',
        description: '赞助本站，以使得本站能更好的运营下去。'
    }

    const wechatStyle = { display: 'block', margin: '0 auto', width: '50%' };
    const fontSizeStyle = { fontSize: '14px' };
    const fontWeightStyle = { fontWeight: 'bold' };

    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <header className="post-header">
                    <h1 className="post-title">
                        赞助本站
                    </h1>
                </header>
                <article className="post-single">
                    <div className="post-content">
                        <p>感谢您点开此页，开设这个页面实属不得已为之！</p>
                        <p>博友圈是一个非营利性的中文独立博客收录网站。为了保持网站良好的使用体验，运营至今，仍未植入诸如「Google AdSense」等广告，网站的运营成本仍主要由站长个人在承担。</p>
                        <p>博友圈网站的运营成本主要是在服务器购买、数据库购买和域名续费上，一年下来，开销还不小。站长是一个靠写代码为生的人，个人境况虽不至于「衣不遮体、食不果腹」，但日子过得着实不算富裕，甚至还有一些拮据，对于这些开销还是比较吃力的。</p>
                        <p>若您觉得这个网站还不错，想支持本站更长远地走下去，欢迎您进行随喜赞助（金额不限，没有排名，不论多少，博友圈都会铭记在心），这些赞助费将<strong>全数</strong>用于网站的云资源续费上！您的每一分支持都是我们将网站做好、做久的动力！</p>

                        <strong>赞赏时，如果您是本站收录的博主，请备注一下博客名称，以便我们将您的信息链接到下面的「<a href="#sponsor-list">赞助名单</a>」与全站底部的「<a href="/home#special-thanks">感谢赞助</a>」模块！</strong>

                        <br />
                        <br />
                        <strong>微信赞赏码：</strong>
                        <div style={wechatStyle}>
                            <img border="1" src="/assets/images/sites/sponsor/wechat_collect_qrcode.jpg" />
                        </div>

                        <br />
                        <strong id="sponsor-list">赞助名单（同步在全站底部的「<a href="/home">感谢赞助</a>」模块显示）：</strong>
                        <table style={fontSizeStyle}>
                            <thead style={fontWeightStyle}>
                                <tr>
                                    <td>赞助人</td>
                                    <td>赞助时间</td>
                                    <td>赞助金额</td>
                                    <td>赞助人寄语</td>
                                    <td>完成状态</td>
                                    <td>完成时间</td>
                                    <td>资金用途</td>
                                    <td>花费明细</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><a href="https://boke.lu/">博客录</a></td>
                                    <td>2023/11/30</td>
                                    <td>100.00 元</td>
                                    <td>加油，让我们一起坚持下去！</td>
                                    <td>已完成</td>
                                    <td>2023/12/01</td>
                                    <td>域名续费</td>
                                    <td>
                                        <p>当前总额：100.00 元，本次花费：80.75 元，本次结余：19.25 元</p>
                                        <p>腾讯云域名续费一年，由 2025/06/28 续费至 2026/06/28</p>
                                        <p><a href="/assets/images/sites/sponsor/cost_details/2023/domain_name_renewal.png">花费证明</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/blog.cuger.cn">遐说</a></td>
                                    <td>2024/01/21</td>
                                    <td>88.00 元</td>
                                    <td>期待博友圈越来越好！</td>
                                    <td>已计入总额，待后续使用</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>
                                        <p>当前总额：107.25 元</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>匿名</td>
                                    <td>2024/03/01</td>
                                    <td>7.00 元</td>
                                    <td>支持站长，让服务器多运行一会~</td>
                                    <td>已完成</td>
                                    <td>2024/03/05</td>
                                    <td>域名续费</td>
                                    <td>
                                        <p>当前总额：114.25 元，本次花费：80.75 元，本次结余：33.5 元</p>
                                        <p>腾讯云域名续费一年，由 2026/06/28 续费至 2027/06/28</p>
                                        <p><a href="/assets/images/sites/sponsor/cost_details/2024/03/domain_name_renewal.png">花费证明</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/www.evan.xin">Evan's Space</a></td>
                                    <td>2024/04/30</td>
                                    <td>66.50 元</td>
                                    <td>Evan 来瓶饮料，小小心意。越办越好，坚持住😎</td>
                                    <td>已完成</td>
                                    <td>2024/05/11</td>
                                    <td>主机购买</td>
                                    <td>
                                        <p>当前总额：100.00 元，本次花费：99.00 元，本次结余：1.00 元</p>
                                        <p>腾讯云主机购买一年，由 2024/05/11 至 2025/05/11</p>
                                        <p><a href="/assets/images/sites/sponsor/cost_details/2024/05/tencent_host_purchase.png">花费证明</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/blog.goodboyboy.top">GoodBoyboy's Blog</a></td>
                                    <td>2024/05/19</td>
                                    <td>6.66 元</td>
                                    <td>GoodBoyboy's Blog祝各位生活愉快～</td>
                                    <td>已计入总额，待后续使用</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>
                                        <p>当前总额：7.66 元</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/pinaland.cn">晴空树</a></td>
                                    <td>2024/05/23</td>
                                    <td>18.00 元</td>
                                    <td>发现越来越多的优质博客～</td>
                                    <td>已计入总额，待后续使用</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>
                                        <p>当前总额：25.66 元</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/www.xiangshitan.com">响石潭</a></td>
                                    <td>2024/07/07</td>
                                    <td>99.99 元</td>
                                    <td>祝博友圈长长久久，独立博客一路相伴响石潭</td>
                                    <td>已完成</td>
                                    <td>2024/07/07</td>
                                    <td>主机续费</td>
                                    <td>
                                        <p>当前总额：125.65 元，本次花费：99.00 元，本次结余：26.65 元</p>
                                        <p>腾讯云主机续费一年，由 2025/05/11 至 2026/05/11</p>
                                        <p><a href="/assets/images/sites/sponsor/cost_details/2024/07/tencent_host_renew.png">花费证明</a></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/pwsz.com">品味苏州</a></td>
                                    <td>2024/08/01</td>
                                    <td>18.00 元</td>
                                    <td>支持站长，让服务器多运行一会~</td>
                                    <td>已计入总额，待后续使用</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>
                                        <p>当前总额：44.65 元</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/vrast.cn">Keyle's Blog</a></td>
                                    <td>2024/08/21</td>
                                    <td>28.00 元</td>
                                    <td>祝博友圈越开越旺，再开十八年！</td>
                                    <td>已计入总额，待后续使用</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>
                                        <p>当前总额：72.65 元</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/www.dao.js.cn">懋和道人</a></td>
                                    <td>2024/09/20</td>
                                    <td>6.66 元</td>
                                    <td>懋和道人，祝您一路顺六。</td>
                                    <td>已计入总额，待后续使用</td>
                                    <td>--</td>
                                    <td>--</td>
                                    <td>
                                        <p>当前总额：79.31 元</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><a href="/blogs/www.dolingou.com">Dolingou</a></td>
                                    <td>2024/10/16</td>
                                    <td>18.00 元</td>
                                    <td>支持站长，让服务器多运行一会~</td>
                                    <td>已完成</td>
                                    <td>2024/10/21</td>
                                    <td>域名续费</td>
                                    <td>
                                        <p>当前总额：97.31 元，本次花费：79.42 元，本次结余：17.89 元</p>
                                        <p>腾讯云域名续费一年，由 2027/06/28 续费至 2028/06/28</p>
                                        <p><a href="/assets/images/sites/sponsor/cost_details/2024/10/domain_name_renewal.png">花费证明</a></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <strong>再次感谢您的慷慨解囊，让我们一起携手走的更远！</strong>

                        <br />
                        <br />
                        <strong>除了个人赞助以外，博友圈还愿意承接一些跟博客或站长相关的、优质健康的广告内容，若您有合作意向，请联系：<a href="mailto:contact@boyouquan.com?subject=广告合作&amp;body=合作说明：%0d%0a">contact@boyouquan.com</a>。</strong>
                    </div>
                </article>
            </main>
            <CommonFooter />
        </>
    )
}