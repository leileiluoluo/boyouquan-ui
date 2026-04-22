import { lazy, Suspense } from 'react';
import { Typography, List, Skeleton as AntSkeleton, Card, Space, Tag, Divider } from 'antd';

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

const content: JSX.Element = (
    <>
        <Paragraph style={{ marginBottom: 16 }}>
            感谢您点开此页，开设这个页面实属不得已为之！
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            博友圈是一个非营利性的中文独立博客收录网站。为了保持网站良好的使用体验，运营至今，仍未植入诸如「Google
            AdSense」等广告。网站建立初期，运营成本主要由站长个人在承担，但在 2024
            年初开通该赞赏页面后，博友们的赞赏已基本能支撑网站的运行。在此，我对大家的支持与厚爱表示深深的感谢！这让我非常的感动，是我之前未预料到的！
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

        <Title level={5} style={{ textAlign: 'center', marginTop: 32, marginBottom: 16 }} id="sponsor-list">
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

        {/* 👇 修复换行后的 List */}
        <Card
            bordered
            size="middle"
            style={{ marginBottom: 16, borderRadius: 8 }}
        >
            <List
                dataSource={sponsorList}
                rowKey={(item, index) => index}
                renderItem={(item, index) => (
                    <List.Item key={item.key} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        {/* 1. 赞助人 + 时间 + 金额 + 状态 */}
                        <Space wrap size={8}>
                            <Text>{index + 1}</Text>
                            <Space wrap size={16}>
                                <Link href={item.link} target="_blank" strong>
                                    {item.blogName}
                                </Link>
                                <Text>{item.sponsoredAt}</Text>
                                <Text strong>¥{item.sponsoredMoney}</Text>
                                <Tag color="green" style={{ fontWeight: 500 }}>{item.status}</Tag>
                            </Space>
                        </Space>

                        {/* 2. 寄语 */}
                        {item.message && '--' !== item.message && <Space wrap size={0}>
                            <Text>寄语：</Text>
                            <Text type="secondary">{item.message}</Text>
                        </Space>
                        }

                        {/* 3. 资金用途 + 完成时间 */}
                        {item.spentOn && '--' !== item.spentOn && <Space wrap size={0}>
                            <Text>用途：</Text>
                            <Text type="secondary">{item.spentOn}</Text>
                        </Space>
                        }

                        {item.spentAt && '--' !== item.spentAt && <Space wrap size={0}>
                            <Text>完成时间：</Text>
                            <Text type="secondary">{item.spentAt}</Text>
                        </Space>
                        }

                        {/* 4. 花费明细 */}
                        {item.spentDetails?.length > 0 && (
                            <Space wrap size={0}>
                                <Text>明细：</Text>
                                {item.spentDetails.map((d, i) => (
                                    <Text key={i} type="secondary">
                                        {d}
                                        {i < item.spentDetails.length - 1 && ' | '}
                                    </Text>
                                ))}
                            </Space>
                        )}

                        {/* 5. 花费证明 */}
                        {item.proofs?.length > 0 && (
                            <Space wrap size={0}>
                                <Text>证明：</Text>
                                {item.proofs.map((p, i) => (
                                    <Link key={i} href={p.link} target="_blank">
                                        {p.name}
                                        {i < item.proofs.length - 1 && ' | '}
                                    </Link>
                                ))}
                            </Space>
                        )}
                    </List.Item>
                )}
            />
        </Card>
        {/* 👆 修复结束 */}

        <Paragraph style={{ marginTop: 16, marginBottom: 16 }}>
            <Text strong>
                再次感谢您的慷慨解囊，让我们一起携手走的更远！
            </Text>
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
            <Text strong>
                除了个人赞助以外，博友圈还愿意承接一些跟博客或站长相关的、不影响用户体验、内容健康的广告内容，若您有合作意向，请联系：
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