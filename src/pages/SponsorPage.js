import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';
import { Box, Container, Link, Strong, Text, Table } from '@radix-ui/themes';

const meta = {
    title: "赞助本站 - 博友圈 · 博客人的朋友圈！",
    keywords: "赞助本站",
    description: "赞助本站，以使得本站能更好的运营下去。",
};

const content = (
    <>
        <Text as="p" mb="2">感谢您点开此页，开设这个页面实属不得已为之！</Text>
        <Text as="p" mb="2">
            博友圈是一个非营利性的中文独立博客收录网站。为了保持网站良好的使用体验，运营至今，仍未植入诸如「Google
            AdSense」等广告。网站建立初期，运营成本主要由站长个人在承担，但在 2024
            年年初开通该赞赏页面后，博友们的赞赏已基本能支撑网站的运行。在此，我对大家的支持与厚爱表示深深的感谢！这让我非常的感动，是我之前未预料到的！
        </Text>
        <Text as="p" mb="2">
            博友圈网站的运营成本主要是在服务器（最低需要 2G 以上的内存和 20G
            以上的硬盘）购买和域名续费上，一年下来，开销有几百元。站长是一个靠写代码为生的人，个人境况虽不至于「衣不遮体、食不果腹」，但日子过得着实不算富裕，若是自己一个人应对这些开销老实来讲还是比较吃力的。
        </Text>
        <Text as="p" mb="2">
            若您觉得这个网站还不错，想支持本站更长远地走下去，欢迎您进行随喜赞助（金额不限，没有排名，不论多少，博友圈都会铭记在心），这些赞助费将
            <Strong>全数</Strong>
            用于网站的云资源购买或续费上！您的每一分支持都是我们将网站做好、做久的动力！
        </Text>

        <Text as="p" mb="2">
            <Strong>
                赞赏时，如果您是本站收录的博主，请备注一下博客名称，以便我们将您的信息链接到下面的「
                <a href="#sponsor-list">赞助名单</a>」与首页底部的「
                <a href="/home#special-thanks">感谢赞助</a>」模块！
            </Strong>
        </Text>

        <Text as="p" mb="2" align="center">
            <Strong as="p" mb="2">微信赞赏码：</Strong>
        </Text>

        <img
            src="/assets/images/sites/sponsor/wechat_collect_qrcode.jpg"
            width={500}
            style={{
                display: 'block',
                margin: '0 auto',
                maxWidth: '280px',
                height: 'auto'
            }}
        />

        <Text as="p" mb="2" mt="6">
            <Strong id="sponsor-list">
                赞助名单（同步在首页底部的「<a href="/home#special-thanks">感谢赞助</a>」模块显示）：
            </Strong>
        </Text>

        <div style={{
            position: 'relative',
            width: '100%',
            overflowX: 'auto',
            border: '1px solid var(--gray-5)',
            borderRadius: 'var(--radius-3)'
        }}>
            <Table.Root style={{
                minWidth: 'max-content', // 关键：让表格根据内容扩展
                width: '100%'
            }}>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>赞助人</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>赞助时间</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>赞助金额</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>赞助人寄语</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>完成状态</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>完成时间</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>资金用途</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>花费明细</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>

                    <Table.Row>
                        <Table.Cell>
                            <Link href="https://boke.lu/">博客录</Link>
                        </Table.Cell>
                        <Table.Cell>2023/11/30</Table.Cell>
                        <Table.Cell>100.00 元</Table.Cell>
                        <Table.Cell>加油，让我们一起坚持下去！</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2023/12/01</Table.Cell>
                        <Table.Cell>域名续费</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：100.00 元，本次花费：80.75 元，本次结余：19.25 元</Text>
                            <Text>腾讯云域名续费一年，由 2025/06/28 续费至 2026/06/28</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2023/domain_name_renewal.png">
                                    花费证明
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/blog.cuger.cn">遐说</Link>
                        </Table.Cell>
                        <Table.Cell>2024/01/21</Table.Cell>
                        <Table.Cell>88.00 元</Table.Cell>
                        <Table.Cell>期待博友圈越来越好！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：107.25 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>匿名</Table.Cell>
                        <Table.Cell>2024/03/01</Table.Cell>
                        <Table.Cell>7.00 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会~</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2024/03/05</Table.Cell>
                        <Table.Cell>域名续费</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：114.25 元，本次花费：80.75 元，本次结余：33.5 元</Text>
                            <Text>腾讯云域名续费一年，由 2026/06/28 续费至 2027/06/28</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2024/03/domain_name_renewal.png">
                                    花费证明
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.evan.xin">Evan's Space</Link>
                        </Table.Cell>
                        <Table.Cell>2024/04/30</Table.Cell>
                        <Table.Cell>66.50 元</Table.Cell>
                        <Table.Cell>Evan 来瓶饮料，小小心意。越办越好，坚持住😎</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2024/05/11</Table.Cell>
                        <Table.Cell>主机购买</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：100.00 元，本次花费：99.00 元，本次结余：1.00 元</Text>
                            <Text>腾讯云主机购买一年，由 2024/05/11 至 2025/05/11</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2024/05/tencent_host_purchase.png">
                                    花费证明
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/blog.goodboyboy.top">GoodBoyboy's Blog</Link>
                        </Table.Cell>
                        <Table.Cell>2024/05/19</Table.Cell>
                        <Table.Cell>6.66 元</Table.Cell>
                        <Table.Cell>GoodBoyboy's Blog祝各位生活愉快～</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：7.66 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/pinaland.cn">晴空树</Link>
                        </Table.Cell>
                        <Table.Cell>2024/05/23</Table.Cell>
                        <Table.Cell>18.00 元</Table.Cell>
                        <Table.Cell>发现越来越多的优质博客～</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：25.66 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.xiangshitan.com">响石潭</Link>
                        </Table.Cell>
                        <Table.Cell>2024/07/07</Table.Cell>
                        <Table.Cell>99.99 元</Table.Cell>
                        <Table.Cell>祝博友圈长长久久，独立博客一路相伴响石潭</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2024/07/07</Table.Cell>
                        <Table.Cell>主机续费</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：125.65 元，本次花费：99.00 元，本次结余：26.65 元</Text>
                            <Text>腾讯云主机续费一年，由 2025/05/11 至 2026/05/11</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2024/07/tencent_host_renew.png">
                                    花费证明
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/pwsz.com">品味苏州</Link>
                        </Table.Cell>
                        <Table.Cell>2024/08/01</Table.Cell>
                        <Table.Cell>18.00 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会~</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：44.65 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/vrast.cn">Keyle's Blog</Link>
                        </Table.Cell>
                        <Table.Cell>2024/08/21</Table.Cell>
                        <Table.Cell>28.00 元</Table.Cell>
                        <Table.Cell>祝博友圈越开越旺，再开十八年！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：72.65 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.dao.js.cn">懋和道人</Link>
                        </Table.Cell>
                        <Table.Cell>2024/09/20</Table.Cell>
                        <Table.Cell>6.66 元</Table.Cell>
                        <Table.Cell>懋和道人，祝您一路顺六。</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：79.31 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.dolingou.com">Dolingou</Link>
                        </Table.Cell>
                        <Table.Cell>2024/10/16</Table.Cell>
                        <Table.Cell>18.00 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会~</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2024/10/21</Table.Cell>
                        <Table.Cell>域名续费</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：97.31 元，本次花费：79.42 元，本次结余：17.89 元</Text>
                            <Text>腾讯云域名续费一年，由 2027/06/28 续费至 2028/06/28</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2024/10/domain_name_renewal.png">
                                    花费证明
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/inkcodes.com">InkCodes</Link>
                        </Table.Cell>
                        <Table.Cell>2024/12/07</Table.Cell>
                        <Table.Cell>39.00 元</Table.Cell>
                        <Table.Cell>祝博友圈红红火火！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：56.89 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.feinews.com">飞牛士</Link>
                        </Table.Cell>
                        <Table.Cell>2024/12/08</Table.Cell>
                        <Table.Cell>99.99 元</Table.Cell>
                        <Table.Cell>喝杯冬天里的第一杯奶茶，给独立博客暖暖身！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：156.88 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="https://boke.lu/">博客录</Link>
                        </Table.Cell>
                        <Table.Cell>2024/12/17</Table.Cell>
                        <Table.Cell>100.00 元</Table.Cell>
                        <Table.Cell>博客录前来支持，加油！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：256.88 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.imets.cn">静若安然</Link>
                        </Table.Cell>
                        <Table.Cell>2024/12/17</Table.Cell>
                        <Table.Cell>99.99 元</Table.Cell>
                        <Table.Cell>心之所向，素履以往。愿风雨后我们依旧笑容满面。</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：356.87 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/blog.closex.org/cn">CloseX</Link>
                        </Table.Cell>
                        <Table.Cell>2024/12/29</Table.Cell>
                        <Table.Cell>9.99 元</Table.Cell>
                        <Table.Cell>CloseX 祝博友圈长长久久！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：366.86 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/blog.mcenahle.com">梅之夏</Link>
                        </Table.Cell>
                        <Table.Cell>2024/12/30</Table.Cell>
                        <Table.Cell>10.00 元</Table.Cell>
                        <Table.Cell>梅之夏为博友圈加油！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：376.86 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/synyan.cn">旅行漫记</Link>
                        </Table.Cell>
                        <Table.Cell>2024/12/30</Table.Cell>
                        <Table.Cell>69.00 元</Table.Cell>
                        <Table.Cell>祝博友圈越办越好！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：445.86 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/ncnccn.cn">一间生活 ｜ 旅拍摄影</Link>
                        </Table.Cell>
                        <Table.Cell>2025/01/02</Table.Cell>
                        <Table.Cell>66.66 元</Table.Cell>
                        <Table.Cell>新年快乐，一点支持。为了那些「小而美」的坚持！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：512.52 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.xcbtmw.com">老白博客</Link>
                        </Table.Cell>
                        <Table.Cell>2025/01/04</Table.Cell>
                        <Table.Cell>66.66 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会～</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：579.18 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/suiyan.cc">碎言</Link>
                        </Table.Cell>
                        <Table.Cell>2025/01/05</Table.Cell>
                        <Table.Cell>8.88 元</Table.Cell>
                        <Table.Cell>博友圈长长久久！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：588.06 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/wiki.eryajf.net">二丫讲梵</Link>
                        </Table.Cell>
                        <Table.Cell>2025/01/16</Table.Cell>
                        <Table.Cell>69.00 元</Table.Cell>
                        <Table.Cell>
                            祝博友圈越来越强大，凝聚更多博友，让更多优质博客被更多人看到！
                        </Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：657.06 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/aloner.ink">如约而至</Link>
                        </Table.Cell>
                        <Table.Cell>2025/01/29</Table.Cell>
                        <Table.Cell>18.88 元</Table.Cell>
                        <Table.Cell>新年快乐！希望我们的博客大家庭越走越远！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：675.94 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/uuanqin.top">半方池水半方田</Link>
                        </Table.Cell>
                        <Table.Cell>2025/01/30</Table.Cell>
                        <Table.Cell>8.88 元</Table.Cell>
                        <Table.Cell>内容很优质，祝新的一年里越办越好～</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2025/02/27</Table.Cell>
                        <Table.Cell>域名续费</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：684.82 元，本次花费：169.16 元，本次结余：515.66 元</Text>
                            <Text>腾讯云域名续费两年，由 2028/06/28 续费至 2030/06/28</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2025/02/domain_name_renewal.png">
                                    花费证明 1
                                </Link>
                            </Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2025/02/domain_name_renewal_2.png">
                                    花费证明 2
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/xyzbz.cn">网友小宋</Link>
                        </Table.Cell>
                        <Table.Cell>2025/02/27</Table.Cell>
                        <Table.Cell>39.00 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会～</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：554.66 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/blog.shi.wiki">承世的博客</Link>
                        </Table.Cell>
                        <Table.Cell>2025/03/02</Table.Cell>
                        <Table.Cell>29.00 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会～</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：583.66 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/vindlog.com">Vind Log</Link>
                        </Table.Cell>
                        <Table.Cell>2025/03/11</Table.Cell>
                        <Table.Cell>9.00 元</Table.Cell>
                        <Table.Cell>互相扶持，共同成长吧～</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：592.66 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/blog.yzlog.top">云志博客</Link>
                        </Table.Cell>
                        <Table.Cell>2025/03/31</Table.Cell>
                        <Table.Cell>99.99 元</Table.Cell>
                        <Table.Cell>云志博客祝博友圈越来越好，长长久久，感谢提供的平台。</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2025/04/18</Table.Cell>
                        <Table.Cell>域名续费</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：692.65 元，本次花费：84.58 元，本次结余：608.07 元</Text>
                            <Text>腾讯云域名续费一年，由 2030/06/28 续费至 2031/06/28</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2025/04/domain_name_renewal.png">
                                    花费证明
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/blog.1edg.cn">小林先森</Link>
                        </Table.Cell>
                        <Table.Cell>2025/05/05</Table.Cell>
                        <Table.Cell>9.00 元</Table.Cell>
                        <Table.Cell>祝博友圈兴旺，情谊长存，也祝各位博友身体健康～</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2025/05/07</Table.Cell>
                        <Table.Cell>域名续费</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：617.07 元，本次花费：84.58 元，本次结余：532.49 元</Text>
                            <Text>腾讯云域名续费一年，由 2031/06/28 续费至 2032/06/28</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2025/05/domain_name_renewal.png">
                                    花费证明
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/zhoutian.com">周天记</Link>
                        </Table.Cell>
                        <Table.Cell>2025/05/26</Table.Cell>
                        <Table.Cell>9.00 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会～</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：541.49 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.kulafan.com">库拉饭的博客</Link>
                        </Table.Cell>
                        <Table.Cell>2025/05/28</Table.Cell>
                        <Table.Cell>29.00 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会～</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：570.49 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/vrast.cn">Keyle's Blog</Link>
                        </Table.Cell>
                        <Table.Cell>2025/06/05</Table.Cell>
                        <Table.Cell>29.00 元</Table.Cell>
                        <Table.Cell>支持站长，让服务器多运行一会～</Table.Cell>
                        <Table.Cell>已完成</Table.Cell>
                        <Table.Cell>2025/06/10</Table.Cell>
                        <Table.Cell>域名续费</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：599.49 元，本次花费：84.58 元，本次结余：514.91 元</Text>
                            <Text>腾讯云域名续费一年，由 2032/06/28 续费至 2033/06/28</Text>
                            <Text>
                                <Link href="/assets/images/sites/sponsor/cost_details/2025/06/domain_name_renewal.png">
                                    花费证明
                                </Link>
                            </Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Text>匿名</Text>
                        </Table.Cell>
                        <Table.Cell>2025/06/27</Table.Cell>
                        <Table.Cell>9.00 元</Table.Cell>
                        <Table.Cell>加油💪💪💪💪💪💪</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：523.91 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/blog.lichenghao.cn/article">故事的程序猿</Link>
                        </Table.Cell>
                        <Table.Cell>2025/07/08</Table.Cell>
                        <Table.Cell>9.00 元</Table.Cell>
                        <Table.Cell>祝博友圈越来越好</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：532.91 元</Text>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Link href="/blogs/www.yingyu5658.me">映屿</Link>
                        </Table.Cell>
                        <Table.Cell>2025/08/19</Table.Cell>
                        <Table.Cell>20.00 元</Table.Cell>
                        <Table.Cell>博友圈长长久久，越办越好，加油！</Table.Cell>
                        <Table.Cell>已计入总额，待后续使用</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>--</Table.Cell>
                        <Table.Cell>
                            <Text>当前总额：552.91 元</Text>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </div>

        <Text as='p' mb="2" mt="2">
            <Strong>再次感谢您的慷慨解囊，让我们一起携手走的更远！</Strong>
        </Text>
        <Text as='p' mb="2">
            <Strong>
                除了个人赞助以外，博友圈还愿意承接一些跟博客或站长相关的、不影响用户体验的、内容健康的广告内容，若您有合作意向，请联系：
                <Link href="mailto:contact@boyouquan.com?subject=广告合作&amp;body=合作说明：%0d%0a">
                    contact@boyouquan.com
                </Link>
                。</Strong>
        </Text>
    </>
);

export default function SponsorPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Article title="赞助本站" content={content} />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    );
}
