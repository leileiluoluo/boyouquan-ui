import React from 'react';
import { Rss, Github, Cloud, Mail, ArrowUp } from 'lucide-react';
import { Layout, Divider, Typography, Flex, Button } from 'antd';

const { Footer } = Layout;
const { Link, Text } = Typography;

const MainFooter: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Footer style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            color: 'rgba(255, 255, 255, 0.85)',
            padding: '48px 24px 32px',
            marginTop: 'auto'
        }}>
            <Flex vertical gap={32} style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* 主要链接区域 */}
                <Flex justify="space-between" wrap="wrap" gap={32}>
                    {/* 网站信息 */}
                    <Flex vertical gap={12} style={{ minWidth: 200 }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#fff',
                            letterSpacing: 1
                        }}>
                            博友圈
                        </Text>
                        <Text style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: 12,
                            lineHeight: 1.6
                        }}>
                            将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！
                        </Text>
                        <Flex gap={16} style={{ marginTop: 8 }}>
                            <Link href="/feed.xml" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                <Rss size={18} />
                            </Link>
                            <Link href="https://github.com/leileiluoluo/boyouquan-ui" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                <Github size={18} />
                            </Link>
                            <Link href="https://cloud.tencent.com/act/cps/redirect?redirect=5990&cps_key=b47473307f5d83202fb2d8a72cd303d7&from=console" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                <Cloud size={18} />
                            </Link>
                            <Link href="mailto:support@boyouquan.com" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                <Mail size={18} />
                            </Link>
                        </Flex>
                    </Flex>

                    {/* 快速链接 */}
                    <Flex vertical gap={8}>
                        <Text style={{ color: '#fff', fontWeight: 500, marginBottom: 8 }}>关于我们</Text>
                        <Link href="/about" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>关于本站</Link>
                        <Link href="/release-notes" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>发布历史</Link>
                        <Link href="/sponsor" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>赞助本站</Link>
                    </Flex>

                    <Flex vertical gap={8}>
                        <Text style={{ color: '#fff', fontWeight: 500, marginBottom: 8 }}>资源</Text>
                        <Link href="/annual-reports" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>年度报告</Link>
                        <Link href="/similar-sites" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>同类网站</Link>
                        <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>博客联盟</Link>
                    </Flex>

                    <Flex vertical gap={8}>
                        <Text style={{ color: '#fff', fontWeight: 500, marginBottom: 8 }}>支持</Text>
                        <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>帮助中心</Link>
                        <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>反馈建议</Link>
                        <Link href="#" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>加入我们</Link>
                    </Flex>
                </Flex>

                <Divider style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    margin: 0
                }} />

                {/* 版权和备案信息 */}
                <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
                    <Flex gap={24} wrap="wrap" align="center">
                        <Link href="https://beian.miit.gov.cn/" style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}>
                            辽ICP备2022012085号-2
                        </Link>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}>
                            Copyright © 2023-2026 博友圈
                        </Text>

                        <Link href="/planet-shuttle" target="_blank" style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src="/assets/images/sites/logo/planet-shuttle-dark.svg"
                                alt="星球穿梭"
                                style={{ height: 20, verticalAlign: 'middle' }}
                            />
                        </Link>
                    </Flex>
                </Flex>
            </Flex>

            {/* 回到顶部按钮 */}
            <Button
                type="text"
                icon={<ArrowUp size={18} />}
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)'
                }}
            />
        </Footer>
    );
};

export default MainFooter;