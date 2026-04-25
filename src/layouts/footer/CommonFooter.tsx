import React, { Suspense, lazy } from 'react';
import type { MenuProps } from 'antd';
import { Rss, Github, Cloud, Mail, ArrowUp, BarChart3, ExternalLink } from 'lucide-react';
import { theme, Layout, Divider, Typography, Flex, Button, Spin, Dropdown, Tooltip, Space } from 'antd';

import { MobileOnly, PCOnly } from '@components/common/Responsive';

const Statistics = lazy(() => import('./Statistics'));
const { Footer } = Layout;
const { Link, Text } = Typography;
const { useToken } = theme;

const CommonFooter: React.FC = () => {
    const { token } = useToken();

    const linkFontSize: number = 13;
    const colorDividerBackground: string = 'rgba(237, 233, 233, 0.15)';
    const colorArrowUp: string = token.colorTextLightSolid;      // 纯白（柔和）
    const colorArrowUpBackground: string = token.colorPrimary;   // 使用你的主题主色

    const rssItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a style={{ fontSize: token.fontSizeSM, color: '#ffffff' }} target="_blank" rel="noopener noreferrer" href="/feed.xml?sort=recommended">
                    推荐文章聚合
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a style={{ fontSize: token.fontSizeSM, color: '#ffffff' }} target="_blank" rel="noopener noreferrer" href="/feed.xml?sort=latest">
                    最新文章聚合
                </a>
            ),
        },
    ];

    const githubItems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a style={{ fontSize: token.fontSizeSM, color: '#ffffff' }} target="_blank" rel="noopener noreferrer" href="https://github.com/leileiluoluo/boyouquan-ui">
                    前端源码
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a style={{ fontSize: token.fontSizeSM, color: '#ffffff' }} target="_blank" rel="noopener noreferrer" href="https://github.com/leileiluoluo/boyouquan-api">
                    后端源码
                </a>
            ),
        },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Footer
            className="common-footer"
            style={{
                background: '#ecf2f2', // 与 Header 同色
                borderTop: '1px solid #e0ecec',
            }}
        >
            <PCOnly>
                <Flex vertical gap={token.padding}>
                    <Flex justify="space-between" gap={token.padding} wrap="wrap">
                        <Flex vertical gap={token.paddingSM}>
                            <Text style={{ fontSize: token.fontSizeXL, color: token.colorText }}>博友圈</Text>
                            <Text style={{ fontSize: linkFontSize, color: token.colorText, lineHeight: 2 }}>将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！</Text>
                            <Flex gap={token.paddingSM}>
                                <Dropdown placement="topRight" menu={{ items: rssItems }}>
                                    <Rss color={token.colorText} size={16} />
                                </Dropdown>
                                <Dropdown placement="topLeft" menu={{ items: githubItems }}>
                                    <Github size={16} />
                                </Dropdown>

                                <Tooltip title="本站使用腾讯云主机提供服务"
                                    placement="topRight"
                                    styles={{
                                        root: {
                                            color: token.colorText,
                                            fontSize: token.fontSizeSM,
                                        }
                                    }}>
                                    <Link target="_blank" href="https://cloud.tencent.com/act/cps/redirect?redirect=5990&cps_key=b47473307f5d83202fb2d8a72cd303d7&from=console"><Cloud color={token.colorText} size={16} /></Link>
                                </Tooltip>
                                <Tooltip title="站长信箱"
                                    placement="topLeft"
                                    styles={{
                                        root: {
                                            color: token.colorText,
                                            fontSize: token.fontSizeSM,
                                        }
                                    }}>
                                    <Link target="_blank" href="mailto:support@boyouquan.com"><Mail color={token.colorText} size={16} /></Link>
                                </Tooltip>
                            </Flex>
                        </Flex>

                        {/* statistics */}
                        <Flex vertical gap={token.paddingXS}>
                            <Flex align="center" gap={token.paddingXS} style={{ marginBottom: token.marginXXS }}>
                                <BarChart3 size={16} style={{ color: token.colorText }} />
                                <Text style={{ color: token.colorText, fontSize: token.fontSize }}>统计</Text>
                            </Flex>
                            <Suspense fallback={<Spin size="small" />}>
                                <Statistics />
                            </Suspense>
                        </Flex>

                        <Flex vertical gap={token.paddingXS}>
                            <Flex align="center" gap={token.paddingXS} style={{ marginBottom: token.marginXXS }}>
                                <ExternalLink size={16} style={{ color: token.colorText }} />
                                <Text style={{ color: token.colorText, fontSize: token.fontSize }}>支持</Text>
                            </Flex>
                            <Flex vertical gap={token.paddingXXS}>
                                <Link href="/sponsor" style={{ color: token.colorText, fontSize: linkFontSize }}>赞助本站</Link>
                                <Link href="/about#add-link" style={{ color: token.colorText, fontSize: linkFontSize }}>添加链接</Link>
                                <Link href="/similar-sites" style={{ color: token.colorText, fontSize: linkFontSize }}>同类网站</Link>
                            </Flex>
                        </Flex>

                        {/* 关于 */}
                        <Flex vertical gap={token.paddingXS}>
                            <Flex align="center" gap={token.paddingXS} style={{ marginBottom: token.marginXXS }}>
                                <ExternalLink size={16} style={{ color: token.colorText }} />
                                <Text style={{ color: token.colorText, fontSize: token.fontSize }}>关于</Text>
                            </Flex>
                            <Flex vertical gap={token.paddingXXS}>
                                <Link href="/about" style={{ color: token.colorText, fontSize: linkFontSize }}>关于本站</Link>
                                <Link href="/release-notes" style={{ color: token.colorText, fontSize: linkFontSize }}>发布历史</Link>
                                <Link href="/annual-reports" style={{ color: token.colorText, fontSize: linkFontSize }}>年度报告</Link>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Divider style={{ background: colorDividerBackground, margin: 0 }} />

                    <Flex gap={token.padding} wrap="wrap" align="center">
                        <Link target="_blank" href="https://beian.miit.gov.cn/" style={{ color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>辽ICP备2022012085号-2</Link>
                        <Text style={{ color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>Copyright © 2023-2026</Text>
                        <Link href="/planet-shuttle" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
                            <img src="/assets/images/sites/logo/planet-shuttle-blue.svg" alt="星球穿梭" style={{ height: 18, display: 'block' }} />
                        </Link>
                    </Flex>
                </Flex>
            </PCOnly>

            {/* 移动端：菜单按钮 */}
            <MobileOnly>
                <Flex gap={token.padding} wrap="wrap" align="center">
                    <Text style={{ color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>Copyright © 2023-2026</Text>
                    <Link href="/planet-shuttle" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
                        <img src="/assets/images/sites/logo/planet-shuttle-blue.svg" alt="星球穿梭" style={{ height: 18, display: 'block' }} />
                    </Link>
                </Flex>
            </MobileOnly>

            <Button type="text" icon={<ArrowUp size={16} />} onClick={scrollToTop} style={{
                position: 'fixed', bottom: 24, right: 24, background: colorArrowUpBackground, color: colorArrowUp,
                borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center',
                justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', border: '1px solid #dee2e6'
            }} />
        </Footer>
    );
};

export default CommonFooter;