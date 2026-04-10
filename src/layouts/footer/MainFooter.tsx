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
            background: '#f8f9fa',
            color: '#2c3e50',
            padding: '30px 24px 28px',
            marginTop: 'auto',
            borderTop: '1px solid #e9ecef'
        }}>
            <Flex vertical gap={28} style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* 主要链接区域 - 包含数据统计 */}
                <Flex justify="space-between" wrap="wrap" gap={32}>
                    {/* 网站信息 */}
                    <Flex vertical gap={10} style={{ minWidth: 120 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: '#1a1a2e'
                        }}>
                            博友圈
                        </Text>
                        <Text style={{ color: '#4a5568', fontSize: 13, lineHeight: 1.5, fontWeight: 500 }}>
                            将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！
                        </Text>
                        <Flex gap={14} style={{ marginTop: 4 }}>
                            <Link href="/feed.xml" style={{ color: '#4a5568' }}>
                                <Rss size={16} />
                            </Link>
                            <Link href="https://github.com/leileiluoluo/boyouquan-ui" style={{ color: '#4a5568' }}>
                                <Github size={16} />
                            </Link>
                            <Link href="https://cloud.tencent.com/act/cps/redirect?redirect=5990&cps_key=b47473307f5d83202fb2d8a72cd303d7&from=console" style={{ color: '#4a5568' }}>
                                <Cloud size={16} />
                            </Link>
                            <Link href="mailto:support@boyouquan.com" style={{ color: '#4a5568' }}>
                                <Mail size={16} />
                            </Link>
                        </Flex>
                    </Flex>

                    {/* 数据统计 - 卡片式设计 */}
                    <Flex vertical gap={6}>
                        {loading ? (
                            <Spin size="small" />
                        ) : (
                            <Flex vertical gap={10} style={{ marginTop: 4 }}>
                                {/* 博客数量 */}
                                <Flex align="center" gap={8}>
                                    <Flex align="center" gap={6}>
                                        <div style={{
                                            width: 28,
                                            height: 28,
                                            background: '#e3f2fd',
                                            borderRadius: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Users size={14} style={{ color: '#1976d2' }} />
                                        </div>
                                        <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500 }}>收录博客</Text>
                                    </Flex>
                                    <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                        <CountUp end={stats.totalBlogs} duration={1} separator="," />
                                    </Text>
                                </Flex>

                                {/* 文章数量 */}
                                <Flex align="center" gap={8}>
                                    <Flex align="center" gap={6}>
                                        <div style={{
                                            width: 28,
                                            height: 28,
                                            background: '#e8f5e9',
                                            borderRadius: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FileText size={14} style={{ color: '#388e3c' }} />
                                        </div>
                                        <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500 }}>收录文章</Text>
                                    </Flex>
                                    <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                        <CountUp end={stats.totalPosts} duration={1} separator="," />
                                    </Text>
                                </Flex>

                                {/* 浏览数量 */}
                                <Flex align="center" gap={8}>
                                    <Flex align="center" gap={6}>
                                        <div style={{
                                            width: 28,
                                            height: 28,
                                            background: '#fff3e0',
                                            borderRadius: 8,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Eye size={14} style={{ color: '#f57c00' }} />
                                        </div>
                                        <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500 }}>浏览文章</Text>
                                    </Flex>
                                    <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                        <CountUp end={stats.totalAccesses} duration={1} separator="," />
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>

                    {/* 支持 */}
                    <Flex vertical gap={8}>
                        <Text style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                            支持
                        </Text>
                        <Link href="/sponsor" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>赞助本站</Link>
                        <Link href="/about#add-link" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>添加链接</Link>
                        <Link href="/similar-sites" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>同类网站</Link>
                    </Flex>

                    {/* 关于 */}
                    <Flex vertical gap={8}>
                        <Text style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                            关于
                        </Text>
                        <Link href="/about" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>关于本站</Link>
                        <Link href="/release-notes" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>发布历史</Link>
                        <Link href="/annual-reports" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>年度报告</Link>
                    </Flex>
                </Flex>

                <Divider style={{ background: '#e9ecef', margin: 0 }} />

                {/* 版权信息 */}
                <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
                    <Flex gap={20} wrap="wrap" align="center">
                        <Link href="https://beian.miit.gov.cn/" style={{ color: '#6c757d', fontSize: 12, fontWeight: 500 }}>
                            辽ICP备2022012085号-2
                        </Link>
                        <Text style={{ color: '#6c757d', fontSize: 12, fontWeight: 500 }}>
                            Copyright © 2023-2026
                        </Text>
                        <Link href="/planet-shuttle" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
                            <img
                                src="/assets/images/sites/logo/planet-shuttle.svg"
                                alt="星球穿梭"
                                style={{ height: 18, display: 'block' }}
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
                    background: '#fff',
                    color: '#2c3e50',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    border: '1px solid #dee2e6'
                }}
            />
        </Footer>
    );
};

export default MainFooter;