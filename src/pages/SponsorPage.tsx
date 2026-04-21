import { lazy, Suspense } from 'react';
import { Typography, Table, Skeleton as AntSkeleton, Card, Space, Tag } from 'antd';

import { Meta } from '@components/common';
import Article from '@components/article/Article';
import sponsorList from '@json/sponsor.json';
import { MetaFields } from '@types';

const { Title, Paragraph, Text, Link } = Typography;

const SponsorMotion = lazy(() => import('@components/sponsor/SponsorMotion'));

const meta: MetaFields = {
    title: "赞助本站 - 博友圈 · 博客人的朋友圈！",
    keywords: "赞助本站",
    description: "赞助本站，以使得本站能更好的运营下去。",
};

// 表格列定义
const columns = [
    {
        title: '赞助人',
        dataIndex: 'blogName',
        key: 'blogName',
        width: 120,
        render: (text: string, record: any) => (
            <Link href={record.link} target="_blank" strong>
                {text}
            </Link>
        ),
    },
    {
        title: '赞助时间',
        dataIndex: 'sponsoredAt',
        key: 'sponsoredAt',
        width: 110,
    },
    {
        title: '赞助金额',
        dataIndex: 'sponsoredMoney',
        key: 'sponsoredMoney',
        width: 100,
        render: (text: string) => (
            <Text strong>
                {text}
            </Text>
        ),
    },
    {
        title: '赞助人寄语',
        dataIndex: 'message',
        key: 'message',
        width: 200,
        ellipsis: true,
    },
    {
        title: '完成状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (text: string) => (
            <Text>
                {text}
            </Text>
        ),
    },
    {
        title: '完成时间',
        dataIndex: 'spentAt',
        key: 'spentAt',
        width: 110,
    },
    {
        title: '资金用途',
        dataIndex: 'spentOn',
        key: 'spentOn',
        width: 120,
    },
    {
        title: '花费明细',
        dataIndex: 'spentDetails',
        key: 'spentDetails',
        width: 150,
        render: (details: string[]) => (
            <Space size={4} wrap>
                {details.map((detail, i) => (
                    <Text key={i} type="secondary" style={{ fontSize: 12 }}>
                        {detail}
                        {i < details.length - 1 && <span style={{ margin: '0 4px', color: '#d9d9d9' }}>|</span>}
                    </Text>
                ))}
            </Space>
        ),
    },
    {
        title: '花费证明',
        dataIndex: 'proofs',
        key: 'proofs',
        width: 180,
        render: (proofs: Array<{ name: string; link: string }>) => (
            <Space size={8} wrap>
                {proofs.map((proof, i) => (
                    <Link key={i} href={proof.link} target="_blank">
                        {proof.name}
                        {i < proofs.length - 1 && <span style={{ margin: '0 4px', color: '#d9d9d9' }}>|</span>}
                    </Link>
                ))}
            </Space>
        ),
    },
];

const content: JSX.Element = (
    <>
        <Paragraph style={{ marginBottom: 16 }}>
            感谢您点开此页，开设这个页面实属不得已为之！
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            博友圈是一个非营利性的中文独立博客收录网站。为了保持网站良好的使用体验，运营至今，仍未植入诸如「Google
            AdSense」等广告。网站建立初期，运营成本主要由站长个人在承担，但在 2024
            年年初开通该赞赏页面后，博友们的赞赏已基本能支撑网站的运行。在此，我对大家的支持与厚爱表示深深的感谢！这让我非常的感动，是我之前未预料到的！
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            博友圈网站的运营成本主要是在服务器（最低需要 2G 以上的内存和 20G
            以上的硬盘）购买和域名续费上，一年下来，开销有几百元。站长是一个靠写代码为生的人，个人境况虽不至于「衣不遮体、食不果腹」，但日子过得着实不算富裕，若是自己一个人应对这些开销老实来讲还是比较吃力的。
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            若您觉得这个网站还不错，想支持本站更长远地走下去，欢迎您进行随喜赞助（金额不限，没有排名，不论多少，博友圈都会铭记在心），这些赞助费将
            <Text strong> 全数 </Text>
            用于网站的云资源购买或续费上！您的每一分支持都是我们将网站做好、做久的动力！
        </Paragraph>

        <Paragraph style={{ marginBottom: 16 }}>
            <Text strong>
                赞赏时，如果您是本站收录的博主，请备注一下博客名称，以便我们将您的信息链接到下面的「
                <Link href="#sponsor-list">赞助名单</Link>」与首页底部的「
                <Link href="/home#special-thanks">感谢赞助</Link>」模块！
            </Text>
        </Paragraph>

        <Title level={5} style={{ textAlign: 'center', marginBottom: 16 }}>
            微信赞赏码：
        </Title>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img
                src="/assets/images/sites/sponsor/wechat_collect_qrcode.jpg"
                style={{
                    maxWidth: '280px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                alt="微信赞赏码"
            />
        </div>

        <Title level={5} style={{ marginTop: 32, marginBottom: 16 }} id="sponsor-list">
            完整赞助名单（感谢您的赞助与接力，让博友圈运行至今）：
        </Title>

        <Card
            style={{
                marginBottom: 16,
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
            }}
            bodyStyle={{ padding: '16px' }}
        >
            <Suspense fallback={<AntSkeleton active paragraph={{ rows: 3 }} />}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <SponsorMotion />
                </div>
            </Suspense>
        </Card>

        <div style={{
            position: 'relative',
            width: '100%',
            overflowX: 'auto',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            marginBottom: 16
        }}>
            <Table
                dataSource={sponsorList.map((item, index) => ({ ...item, key: index }))}
                columns={columns}
                pagination={false}
                bordered
                size="middle"
                scroll={{ x: 'max-content' }}
                style={{ minWidth: '100%' }}
            />
        </div>

        <Paragraph style={{ marginTop: 16, marginBottom: 16 }}>
            <Text strong>
                再次感谢您的慷慨解囊，让我们一起携手走的更远！
            </Text>
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            <Text strong>
                除了个人赞助以外，博友圈还愿意承接一些跟博客或站长相关的、不影响用户体验的、内容健康的广告内容，若您有合作意向，请联系：
                <Link href="mailto:support@boyouquan.com?subject=广告合作&amp;body=合作说明：%0d%0a">
                    support@boyouquan.com
                </Link>
                。
            </Text>
        </Paragraph>
    </>
);

export default function SponsorPage() {
    return (
        <>
            <Meta meta={meta} />
            <Article title="赞助本站" content={content} />
        </>
    );
}