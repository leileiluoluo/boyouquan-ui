import React, { useState, useEffect } from 'react';
import { Rss, Github, Cloud, Mail, ArrowUp, Users, FileText, Eye, TrendingUp } from 'lucide-react';
import { Layout, Divider, Typography, Flex, Button, Spin } from 'antd';
import CountUp from 'react-countup';

import RequestUtil from '@utils/APIRequestUtil';

const { Footer } = Layout;
const { Link, Text } = Typography;

const useStats = () => {
    const [stats, setStats] = useState({
        totalBlogs: 0,
        totalPosts: 0,
        totalAccesses: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const resp = await RequestUtil.get(`/api/statistics`);

            const respBody = await resp.json();
            setStats(respBody);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { stats, loading };
};

const MainFooter: React.FC = () => {
    const { stats, loading } = useStats();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Footer style={{
            background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)',
            color: 'rgba(255, 255, 255, 0.85)',
            padding: '30px 24px 28px',
            marginTop: 'auto',
            position: 'relative'
        }}>
            <Flex vertical gap={28} style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* 主要链接区域 - 包含数据统计 */}
                <Flex justify="space-between" wrap="wrap" gap={32}>
                    {/* 网站信息 */}
                    <Flex vertical gap={8} style={{ minWidth: 120 }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            博友圈
                        </Text>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: 12, lineHeight: 1.5 }}>
                            将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！
                        </Text>
                        <Flex gap={14} style={{ marginTop: 4 }}>
                            <Link href="/feed.xml" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                <Rss size={16} />
                            </Link>
                            <Link href="https://github.com/leileiluoluo/boyouquan-ui" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                <Github size={16} />
                            </Link>
                            <Link href="https://cloud.tencent.com/act/cps/redirect?redirect=5990&cps_key=b47473307f5d83202fb2d8a72cd303d7&from=console" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                <Cloud size={16} />
                            </Link>
                            <Link href="mailto:support@boyouquan.com" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                <Mail size={16} />
                            </Link>
                        </Flex>
                    </Flex>

                    {/* 数据统计 - 卡片式设计 */}
                    <Flex vertical gap={6}>
                        {loading ? (
                            <Spin size="small" style={{ marginTop: 8 }} />
                        ) : (
                            <Flex vertical gap={8} style={{ marginTop: 4 }}>
                                {/* 博客数量 */}
                                <Flex align="center" gap={6}>
                                    <Flex align="center" gap={2}>
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            background: 'rgba(59, 130, 246, 0.15)',
                                            borderRadius: 6,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Users size={12} style={{ color: '#60A5FA' }} />
                                        </div>
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.55)', fontWeight: 600, fontSize: 12 }}>收录博客</Text>
                                    </Flex>
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>
                                        <CountUp end={stats.totalBlogs} duration={1} separator="," />
                                    </Text>
                                </Flex>

                                {/* 文章数量 */}
                                <Flex align="center" gap={6}>
                                    <Flex align="center" gap={2}>
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            background: 'rgba(16, 185, 129, 0.15)',
                                            borderRadius: 6,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FileText size={12} style={{ color: '#34D399' }} />
                                        </div>
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.55)', fontWeight: 600, fontSize: 12 }}>收录文章</Text>
                                    </Flex>
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>
                                        <CountUp end={stats.totalPosts} duration={1} separator="," />
                                    </Text>
                                </Flex>

                                {/* 浏览数量 */}
                                <Flex align="center" gap={6}>
                                    <Flex align="center" gap={2}>
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            background: 'rgba(245, 158, 11, 0.15)',
                                            borderRadius: 6,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Eye size={12} style={{ color: '#FBBF24' }} />
                                        </div>
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.55)', fontWeight: 600, fontSize: 12 }}>浏览文章</Text>
                                    </Flex>
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>
                                        <CountUp end={stats.totalAccesses} duration={1} separator="," />
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>

                    {/* 支持 */}
                    <Flex vertical gap={6}>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                            支持
                        </Text>
                        <Link href="/sponsor" style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, fontSize: 12 }}>赞助本站</Link>
                        <Link href="/about#add-link" style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, fontSize: 12 }}>添加链接</Link>
                        <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, fontSize: 12 }}>反馈建议</Link>
                    </Flex>

                    {/* 关于 */}
                    <Flex vertical gap={6}>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                            关于
                        </Text>
                        <Link href="/about" style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, fontSize: 12 }}>关于本站</Link>
                        <Link href="/release-notes" style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, fontSize: 12 }}>发布历史</Link>
                        <Link href="/annual-reports" style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, fontSize: 12 }}>年度报告</Link>
                    </Flex>
                </Flex>

                <Divider style={{ background: 'rgba(255, 255, 255, 0.08)', margin: 0 }} />

                {/* 版权信息 */}
                <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
                    <Flex gap={20} wrap="wrap" align="center">
                        <Link href="https://beian.miit.gov.cn/" style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: 11 }}>
                            辽ICP备2022012085号-2
                        </Link>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: 11 }}>
                            Copyright © 2023-2026
                        </Text>
                        <Link href="/planet-shuttle" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
                            <img
                                src="/assets/images/sites/logo/planet-shuttle-dark.svg"
                                alt="星球穿梭"
                                style={{ height: 16, display: 'block' }}
                            />
                        </Link>
                    </Flex>
                </Flex>
            </Flex>

            {/* 回到顶部按钮 */}
            <Button
                type="text"
                icon={<ArrowUp size={16} />}
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            />
        </Footer>
    );
};

export default MainFooter;