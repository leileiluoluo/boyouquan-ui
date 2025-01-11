import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';

const meta = {
    title: '赞助本站 - 博友圈 · 博客人的朋友圈！',
    keywords: '赞助本站',
    description: '赞助本站，以使得本站能更好的运营下去。'
};

const wechatStyle = { display: 'block', margin: '0 auto', width: '50%' };
const fontSizeStyle = { fontSize: '14px' };
const fontWeightStyle = { fontWeight: 'bold' };

const content = <>
    <p>感谢您点开此页，开设这个页面实属不得已为之！</p>
    <p>博友圈是一个非营利性的中文独立博客收录网站。为了保持网站良好的使用体验，运营至今，仍未植入诸如「Google AdSense」等广告。网站建立初期，运营成本主要由站长个人在承担，但在 2024 年年初开通该赞赏页面后，博友们的赞赏已基本能支撑网站的运行。在此，我对大家的支持与厚爱表示深深的感谢！这让我非常的感动，是我之前未预料到的！</p>
    <p>博友圈网站的运营成本主要是在服务器（最低需要 2G 以上的内存和 20G 以上的硬盘）购买和域名续费上，一年下来，开销有几百元。站长是一个靠写代码为生的人，个人境况虽不至于「衣不遮体、食不果腹」，但日子过得着实不算富裕，若是自己一个人应对这些开销老实来讲还是比较吃力的。</p>
    <p>若您觉得这个网站还不错，想支持本站更长远地走下去，欢迎您进行随喜赞助（金额不限，没有排名，不论多少，博友圈都会铭记在心），这些赞助费将<strong>全数</strong>用于网站的云资源购买或续费上！您的每一分支持都是我们将网站做好、做久的动力！</p>

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
            <tr>
                <td><a href="/blogs/inkcodes.com">InkCodes</a></td>
                <td>2024/12/07</td>
                <td>39.00 元</td>
                <td>祝博友圈红红火火！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：56.89 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="/blogs/www.feinews.com">飞牛士</a></td>
                <td>2024/12/08</td>
                <td>99.99 元</td>
                <td>喝杯冬天里的第一杯奶茶，给独立博客暖暖身！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：156.88 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="https://boke.lu/">博客录</a></td>
                <td>2024/12/17</td>
                <td>100.00 元</td>
                <td>博客录前来支持，加油！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：256.88 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="/blogs/www.imets.cn">静若安然</a></td>
                <td>2024/12/17</td>
                <td>99.99 元</td>
                <td>心之所向，素履以往。愿风雨后我们依旧笑容满面。</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：356.87 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="/blogs/blog.closex.org/cn">CloseX</a></td>
                <td>2024/12/29</td>
                <td>9.99 元</td>
                <td>CloseX 祝博友圈长长久久！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：366.86 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="/blogs/blog.mcenahle.com">梅之夏</a></td>
                <td>2024/12/30</td>
                <td>10.00 元</td>
                <td>梅之夏为博友圈加油！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：376.86 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="/blogs/synyan.cn">旅行漫记</a></td>
                <td>2024/12/30</td>
                <td>69.00 元</td>
                <td>祝博友圈越办越好！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：445.86 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="/blogs/ncnccn.cn">一间生活 ｜ 旅拍摄影</a></td>
                <td>2025/01/02</td>
                <td>66.66 元</td>
                <td>新年快乐，一点支持。为了那些「小而美」的坚持！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：512.52 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="/blogs/ncnccn.cn">一间生活 ｜ 旅拍摄影</a></td>
                <td>2025/01/04</td>
                <td>66.66 元</td>
                <td>新年快乐，一点支持。为了那些「小而美」的坚持！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：579.18 元</p>
                </td>
            </tr>
            <tr>
                <td><a href="/blogs/suiyan.cc">碎言</a></td>
                <td>2025/01/05</td>
                <td>8.88 元</td>
                <td>博友圈长长久久！</td>
                <td>已计入总额，待后续使用</td>
                <td>--</td>
                <td>--</td>
                <td>
                    <p>当前总额：521.40 元</p>
                </td>
            </tr>
        </tbody>
    </table>

    <strong>再次感谢您的慷慨解囊，让我们一起携手走的更远！</strong>

    <br />
    <br />
    <strong>除了个人赞助以外，博友圈还愿意承接一些跟博客或站长相关的、不影响用户体验的、内容健康的广告内容，若您有合作意向，请联系：<a href="mailto:contact@boyouquan.com?subject=广告合作&amp;body=合作说明：%0d%0a">contact@boyouquan.com</a>。</strong>
</>;

export default function SponsorPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Article title='赞助本站' content={content} />
            </main>
            <CommonFooter />
        </>
    )
}
