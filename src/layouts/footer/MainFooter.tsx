import React, { useState, useEffect } from 'react';
import { Rss, Github, Cloud, Mail, ArrowUp, Users, FileText, Eye, BarChart3, Link2, Info, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Layout, Divider, Typography, Flex, Button, Spin, Grid } from 'antd';
import CountUp from 'react-countup';

import RequestUtil from '@utils/APIRequestUtil';

const { Footer } = Layout;
const { Link, Text } = Typography;
const { useBreakpoint } = Grid;

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
    const screens = useBreakpoint();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        stats: false,
        support: false,
        about: false
    });
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isMobile = !screens.md;
    const isTablet = screens.md && !screens.lg;

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // 桌面端显示完整布局
    if (!isMobile && !isTablet) {
        return (
            <Footer style={{
                background: '#f8f9fa',
                color: '#2c3e50',
                padding: '30px 24px 20px',
                marginTop: '30px',
                borderTop: '1px solid #e9ecef'
            }}>
                <Flex vertical gap={28} style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '24px'
                    }}>
                        {/* 网站信息 */}
                        <div style={{ width: 280 }}>
                            <Flex vertical gap={10}>
                                <Text style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>博友圈</Text>
                                <Text style={{ color: '#4a5568', fontSize: 13, lineHeight: 1.5, fontWeight: 500 }}>
                                    将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！
                                </Text>
                                <Flex gap={14} style={{ marginTop: 4 }}>
                                    <Link href="/feed.xml" style={{ color: '#4a5568' }}><Rss size={16} /></Link>
                                    <Link href="https://github.com/leileiluoluo/boyouquan-ui" style={{ color: '#4a5568' }}><Github size={16} /></Link>
                                    <Link href="https://cloud.tencent.com/act/cps/redirect?redirect=5990&cps_key=b47473307f5d83202fb2d8a72cd303d7&from=console" style={{ color: '#4a5568' }}><Cloud size={16} /></Link>
                                    <Link href="mailto:support@boyouquan.com" style={{ color: '#4a5568' }}><Mail size={16} /></Link>
                                </Flex>
                            </Flex>
                        </div>

                        {/* 统计 */}
                        <div style={{ width: 200 }}>
                            <Flex vertical gap={8}>
                                <Flex align="center" gap={8} style={{ marginBottom: 4 }}>
                                    <BarChart3 size={16} style={{ color: '#1890ff' }} />
                                    <Text style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15 }}>统计</Text>
                                </Flex>
                                {loading ? (
                                    <Spin size="small" />
                                ) : (
                                    <Flex vertical gap={12}>
                                        <Flex align="center" gap={8} style={{ height: 22 }}>
                                            <Users size={14} style={{ color: '#1890ff', flexShrink: 0 }} />
                                            <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500, width: 60 }}>收录博客</Text>
                                            <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                                <CountUp end={stats.totalBlogs} duration={1} separator="," />
                                            </Text>
                                        </Flex>
                                        <Flex align="center" gap={8} style={{ height: 22 }}>
                                            <FileText size={14} style={{ color: '#1890ff', flexShrink: 0 }} />
                                            <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500, width: 60 }}>收录文章</Text>
                                            <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                                <CountUp end={stats.totalPosts} duration={1} separator="," />
                                            </Text>
                                        </Flex>
                                        <Flex align="center" gap={8} style={{ height: 22 }}>
                                            <Eye size={14} style={{ color: '#1890ff', flexShrink: 0 }} />
                                            <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500, width: 60 }}>浏览文章</Text>
                                            <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                                <CountUp end={stats.totalAccesses} duration={1} separator="," />
                                            </Text>
                                        </Flex>
                                    </Flex>
                                )}
                            </Flex>
                        </div>

                        {/* 支持 */}
                        <div style={{ width: 120 }}>
                            <Flex vertical gap={8}>
                                <Flex align="center" gap={8} style={{ marginBottom: 4 }}>
                                    <ExternalLink size={16} style={{ color: '#1890ff' }} />
                                    <Text style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15 }}>支持</Text>
                                </Flex>
                                <Flex vertical gap={12}>
                                    <Link href="/sponsor" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>赞助本站</Link>
                                    <Link href="/about#add-link" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>添加链接</Link>
                                    <Link href="/similar-sites" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>同类网站</Link>
                                </Flex>
                            </Flex>
                        </div>

                        {/* 关于 */}
                        <div style={{ width: 120 }}>
                            <Flex vertical gap={8}>
                                <Flex align="center" gap={8} style={{ marginBottom: 4 }}>
                                    <ExternalLink size={16} style={{ color: '#1890ff' }} />
                                    <Text style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15 }}>关于</Text>
                                </Flex>
                                <Flex vertical gap={12}>
                                    <Link href="/about" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>关于本站</Link>
                                    <Link href="/release-notes" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>发布历史</Link>
                                    <Link href="/annual-reports" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>年度报告</Link>
                                </Flex>
                            </Flex>
                        </div>
                    </div>

                    <Divider style={{ background: '#e9ecef', margin: 0 }} />

                    <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
                        <Flex gap={20} wrap="wrap" align="center">
                            <Link href="https://beian.miit.gov.cn/" style={{ color: '#6c757d', fontSize: 12, fontWeight: 500 }}>辽ICP备2022012085号-2</Link>
                            <Text style={{ color: '#6c757d', fontSize: 12, fontWeight: 500 }}>Copyright © 2023-2026</Text>
                            <Link href="/planet-shuttle" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
                                <img src="/assets/images/sites/logo/planet-shuttle.svg" alt="星球穿梭" style={{ height: 18, display: 'block' }} />
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>

                <Button type="text" icon={<ArrowUp size={16} />} onClick={scrollToTop} style={{
                    position: 'fixed', bottom: 24, right: 24, background: '#fff', color: '#2c3e50',
                    borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #dee2e6'
                }} />
            </Footer>
        );
    }

    // 移动端/平板端显示折叠布局
    return (
        <Footer style={{
            background: '#f8f9fa',
            color: '#2c3e50',
            padding: '30px 20px 28px',
            marginTop: '30px',
            borderTop: '1px solid #e9ecef'
        }}>
            <Flex vertical gap={20} style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* 网站信息 - 始终显示 */}
                <div>
                    <Flex vertical gap={10}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>博友圈</Text>
                        <Text style={{ color: '#4a5568', fontSize: 13, lineHeight: 1.5, fontWeight: 500 }}>
                            将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！
                        </Text>
                        <Flex gap={14} style={{ marginTop: 4 }}>
                            <Link href="/feed.xml" style={{ color: '#4a5568' }}><Rss size={16} /></Link>
                            <Link href="https://github.com/leileiluoluo/boyouquan-ui" style={{ color: '#4a5568' }}><Github size={16} /></Link>
                            <Link href="https://cloud.tencent.com/act/cps/redirect?redirect=5990&cps_key=b47473307f5d83202fb2d8a72cd303d7&from=console" style={{ color: '#4a5568' }}><Cloud size={16} /></Link>
                            <Link href="mailto:support@boyouquan.com" style={{ color: '#4a5568' }}><Mail size={16} /></Link>
                        </Flex>
                    </Flex>
                </div>

                {/* 统计 - 可折叠 */}
                <div>
                    <Flex 
                        align="center" 
                        justify="space-between" 
                        style={{ cursor: 'pointer', padding: '8px 0' }}
                        onClick={() => toggleSection('stats')}
                    >
                        <Flex align="center" gap={8}>
                            <BarChart3 size={16} style={{ color: '#1890ff' }} />
                            <Text style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15 }}>统计</Text>
                        </Flex>
                        {expandedSections.stats ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Flex>
                    {expandedSections.stats && (
                        <div style={{ marginTop: 12, paddingLeft: 24 }}>
                            {loading ? (
                                <Spin size="small" />
                            ) : (
                                <Flex vertical gap={12}>
                                    <Flex align="center" gap={8} wrap="wrap">
                                        <Users size={14} style={{ color: '#1890ff' }} />
                                        <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500 }}>收录博客</Text>
                                        <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                            <CountUp end={stats.totalBlogs} duration={1} separator="," />
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap={8} wrap="wrap">
                                        <FileText size={14} style={{ color: '#1890ff' }} />
                                        <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500 }}>收录文章</Text>
                                        <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                            <CountUp end={stats.totalPosts} duration={1} separator="," />
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap={8} wrap="wrap">
                                        <Eye size={14} style={{ color: '#1890ff' }} />
                                        <Text style={{ color: '#2c3e50', fontSize: 13, fontWeight: 500 }}>浏览文章</Text>
                                        <Text style={{ color: '#1a1a2e', fontSize: 13, fontWeight: 700 }}>
                                            <CountUp end={stats.totalAccesses} duration={1} separator="," />
                                        </Text>
                                    </Flex>
                                </Flex>
                            )}
                        </div>
                    )}
                </div>

                {/* 支持 - 可折叠 */}
                <div>
                    <Flex 
                        align="center" 
                        justify="space-between" 
                        style={{ cursor: 'pointer', padding: '8px 0' }}
                        onClick={() => toggleSection('support')}
                    >
                        <Flex align="center" gap={8}>
                            <ExternalLink size={16} style={{ color: '#1890ff' }} />
                            <Text style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15 }}>支持</Text>
                        </Flex>
                        {expandedSections.support ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Flex>
                    {expandedSections.support && (
                        <div style={{ marginTop: 12, paddingLeft: 24 }}>
                            <Flex vertical gap={12}>
                                <Link href="/sponsor" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>赞助本站</Link>
                                <Link href="/about#add-link" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>添加链接</Link>
                                <Link href="/similar-sites" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>同类网站</Link>
                            </Flex>
                        </div>
                    )}
                </div>

                {/* 关于 - 可折叠 */}
                <div>
                    <Flex 
                        align="center" 
                        justify="space-between" 
                        style={{ cursor: 'pointer', padding: '8px 0' }}
                        onClick={() => toggleSection('about')}
                    >
                        <Flex align="center" gap={8}>
                            <ExternalLink size={16} style={{ color: '#1890ff' }} />
                            <Text style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15 }}>关于</Text>
                        </Flex>
                        {expandedSections.about ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Flex>
                    {expandedSections.about && (
                        <div style={{ marginTop: 12, paddingLeft: 24 }}>
                            <Flex vertical gap={12}>
                                <Link href="/about" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>关于本站</Link>
                                <Link href="/release-notes" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>发布历史</Link>
                                <Link href="/annual-reports" style={{ color: '#4a5568', fontSize: 13, fontWeight: 500 }}>年度报告</Link>
                            </Flex>
                        </div>
                    )}
                </div>

                <Divider style={{ background: '#e9ecef', margin: '8px 0 0 0' }} />

                <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
                    <Flex gap={20} wrap="wrap" align="center">
                        <Link href="https://beian.miit.gov.cn/" style={{ color: '#6c757d', fontSize: 12, fontWeight: 500 }}>辽ICP备2022012085号-2</Link>
                        <Text style={{ color: '#6c757d', fontSize: 12, fontWeight: 500 }}>Copyright © 2023-2026</Text>
                        <Link href="/planet-shuttle" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
                            <img src="/assets/images/sites/logo/planet-shuttle.svg" alt="星球穿梭" style={{ height: 18, display: 'block' }} />
                        </Link>
                    </Flex>
                </Flex>
            </Flex>

            <Button type="text" icon={<ArrowUp size={16} />} onClick={scrollToTop} style={{
                position: 'fixed', bottom: 24, right: 24, background: '#fff', color: '#2c3e50',
                borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
                justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #dee2e6'
            }} />
        </Footer>
    );
};

export default MainFooter;