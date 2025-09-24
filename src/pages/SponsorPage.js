import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import Meta from '../components/common/Meta';
import Article from '../components/article/Article';
import { Box, Container, Link, Strong, Text, Table, Flex, Separator } from '@radix-ui/themes';
import sponsorList from '../json/sponsor.json';

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
                        <Table.ColumnHeaderCell>花费证明</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        sponsorList.map(
                            (sponsor, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>
                                        <Link href={sponsor.link}>{sponsor.blogName}</Link>
                                    </Table.Cell>
                                    <Table.Cell>{sponsor.sponsoredAt}</Table.Cell>
                                    <Table.Cell>{sponsor.sponsoredMoney}</Table.Cell>
                                    <Table.Cell>{sponsor.message}</Table.Cell>
                                    <Table.Cell>{sponsor.status}</Table.Cell>
                                    <Table.Cell>{sponsor.spentAt}</Table.Cell>
                                    <Table.Cell>{sponsor.spentOn}</Table.Cell>
                                    <Table.Cell>
                                        <Flex gap="2">
                                            {
                                                sponsor.spentDetails.map(
                                                    (detail, i) => (
                                                        <>
                                                            <Text key={i}>{detail}</Text>
                                                            {(i < sponsor.spentDetails.length - 1) ? <Separator orientation="vertical" size="1" /> : ''}
                                                        </>
                                                    ))
                                            }
                                        </Flex>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Flex gap="2">
                                            {
                                                sponsor.proofs.map(
                                                    (proof, i) => (
                                                        <>
                                                            <Link key={i} href={proof.link} target="_blank">{proof.name}</Link>
                                                            {(i < sponsor.proofs.length - 1) ? <Separator orientation="vertical" size="1" /> : ''}
                                                        </>
                                                    ))
                                            }
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                    }
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
