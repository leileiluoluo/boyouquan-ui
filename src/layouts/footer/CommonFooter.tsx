import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Rss, Github, Cloud, Mail, ArrowUp, Users, FileText, Eye, BarChart3, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Layout, Divider, Typography, Flex, Button, Spin, Grid, Dropdown, Tooltip } from 'antd';
import CountUp from 'react-countup';

import RequestUtil from '@utils/APIRequestUtil';
import { MobileOnly, PCOnly } from '@components/common/Responsive';

const { Footer } = Layout;
const { Link, Text } = Typography;
const { useBreakpoint } = Grid;

const rssItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a style={{ fontSize: '12px' }} target="_blank" rel="noopener noreferrer" href="/feed.xml?sort=recommended">
                推荐文章聚合
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a style={{ fontSize: '12px' }} target="_blank" rel="noopener noreferrer" href="/feed.xml?sort=latest">
                最新文章聚合
            </a>
        ),
    },
];

const githubItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a style={{ fontSize: '12px' }} target="_blank" rel="noopener noreferrer" href="https://github.com/leileiluoluo/boyouquan-ui">
                前端源码
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a style={{ fontSize: '12px' }} target="_blank" rel="noopener noreferrer" href="https://github.com/leileiluoluo/boyouquan-api">
                后端源码
            </a>
        ),
    },
];

const CommonFooter: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Footer
            style={{
                background: '#092640', // 与 Header 同色
                color: 'rgba(255, 255, 255, 0.85)',
                padding: '26px 46px',
                // textAlign: 'center',
            }}
        >
            <PCOnly>


                <Flex vertical gap={16}>
                    <div style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                        <Flex justify="space-between" gap={16}>
                            <Flex vertical gap={16}>
                                <Text style={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.65)' }}>博友圈</Text>
                                <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.65)', lineHeight: 2.5 }}>将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！</Text>
                                <Flex gap={14}>
                                    <Dropdown menu={{ items: rssItems }}>
                                        <Rss color="rgba(255, 255, 255, 0.65)" size={16} />
                                    </Dropdown>
                                    <Dropdown menu={{ items: githubItems }}>
                                        <Github size={16} />
                                    </Dropdown>
                                    <Tooltip placement="rightTop" color="rgba(255, 255, 255, 0.65)" title="本站使用腾讯云主机提供服务" styles={{ // 使用 styles 属性
                                        root: {
                                            fontSize: '12px',
                                        }
                                    }}>
                                        <Link target="_blank" href="https://cloud.tencent.com/act/cps/redirect?redirect=5990&cps_key=b47473307f5d83202fb2d8a72cd303d7&from=console"><Cloud color="rgba(255, 255, 255, 0.65)" size={16} /></Link>
                                    </Tooltip>
                                    <Tooltip placement="rightTop" color="rgba(255, 255, 255, 0.65)" title="站长信箱" styles={{ // 使用 styles 属性
                                        root: {
                                            fontSize: '12px',
                                        }
                                    }}>
                                        <Link target="_blank" href="mailto:support@boyouquan.com"><Mail color="rgba(255, 255, 255, 0.65)" size={16} /></Link>
                                    </Tooltip>
                                </Flex>
                            </Flex>

                            <Flex vertical gap={8}>
                                <Flex align="center" gap={8} style={{ marginBottom: 4 }}>
                                    <BarChart3 size={16} style={{ color: 'rgba(255, 255, 255, 0.65)' }} />
                                    <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 14, fontWeight: 500 }}>统计</Text>
                                </Flex>
                                <Flex vertical gap={4}>
                                    <Flex align="center" gap={4} style={{ height: 22 }}>
                                        <Users size={13} style={{ color: 'rgba(255, 255, 255, 0.65)', flexShrink: 0 }} />
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13, width: 60 }}>收录博客</Text>
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>
                                            <CountUp end={1056} duration={1} separator="," />
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap={4} style={{ height: 22 }}>
                                        <FileText size={13} style={{ color: 'rgba(255, 255, 255, 0.65)', flexShrink: 0 }} />
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13, width: 60 }}>收录文章</Text>
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>
                                            <CountUp end={71106} duration={1} separator="," />
                                        </Text>
                                    </Flex>
                                    <Flex align="center" gap={4} style={{ height: 22 }}>
                                        <Eye size={13} style={{ color: 'rgba(255, 255, 255, 0.65)', flexShrink: 0 }} />
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13, width: 60 }}>浏览文章</Text>
                                        <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>
                                            <CountUp end={903413} duration={1} separator="," />
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex vertical gap={8}>
                                <Flex align="center" gap={8} style={{ marginBottom: 4 }}>
                                    <ExternalLink size={16} style={{ color: 'rgba(255, 255, 255, 0.65)' }} />
                                    <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 14, fontWeight: 500 }}>支持</Text>
                                </Flex>
                                <Flex vertical gap={4}>
                                    <Link href="/sponsor" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>赞助本站</Link>
                                    <Link href="/about#add-link" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>添加链接</Link>
                                    <Link href="/similar-sites" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>同类网站</Link>
                                </Flex>
                            </Flex>

                            {/* 关于 */}
                            <Flex vertical gap={8}>
                                <Flex align="center" gap={8} style={{ marginBottom: 4 }}>
                                    <ExternalLink size={16} style={{ color: 'rgba(255, 255, 255, 0.65)' }} />
                                    <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 14, fontWeight: 500 }}>关于</Text>
                                </Flex>
                                <Flex vertical gap={4}>
                                    <Link href="/about" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>关于本站</Link>
                                    <Link href="/release-notes" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>发布历史</Link>
                                    <Link href="/annual-reports" style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>年度报告</Link>
                                </Flex>
                            </Flex>
                        </Flex>


                    </div>

                    <Divider style={{ background: '#235683', margin: 0 }} />

                    <Flex gap={20} wrap="wrap" align="center">
                        <Link target="_blank" href="https://beian.miit.gov.cn/" style={{ color: '#6c757d', fontSize: 12 }}>辽ICP备2022012085号-2</Link>
                        <Text style={{ color: '#6c757d', fontSize: 12 }}>Copyright © 2023-2026</Text>
                        <Link href="/planet-shuttle" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
                            <img src="/assets/images/sites/logo/planet-shuttle-dark.svg" alt="星球穿梭" style={{ height: 18, display: 'block' }} />
                        </Link>
                    </Flex>
                </Flex>
            </PCOnly>

            {/* 移动端：菜单按钮 */}
            <MobileOnly>
                <Text style={{ color: '#6c757d', fontSize: 12 }}>@博友圈</Text>
            </MobileOnly>

            <Button type="text" icon={<ArrowUp size={16} />} onClick={scrollToTop} style={{
                position: 'fixed', bottom: 24, right: 24, background: '#235683', color: '#fff',
                borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
                justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #dee2e6'
            }} />
        </Footer>
    );
};

export default CommonFooter;