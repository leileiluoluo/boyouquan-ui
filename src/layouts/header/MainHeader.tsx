import React, { useState } from 'react';
import { Layout, Flex, Menu, Typography, Drawer, Button, Grid } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Link } = Typography;
const { useBreakpoint } = Grid;

const MENU_ITEMS = [
    { key: 0, label: '首页', href: '/home' },
    { key: 1, label: '随手一拍', href: '/moments' },
    { key: 2, label: '每月精选', href: '/monthly-selected' },
    { key: 3, label: '博客广场', href: '/blogs' },
    { key: 4, label: '连接系数', href: '/link-graphs' },
    { key: 5, label: '星球穿梭', href: '/planet-shuttle' },
    { key: 6, label: '提交博客', href: '/blog-requests/add' },
    { key: 7, label: '审核结果', href: '/blog-requests' }
] as const;

const MainHeader: React.FC = () => {
    const location = useLocation();
    const screens = useBreakpoint();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const getSelectedKey = () => {
        const currentItem = MENU_ITEMS.find(item => location.pathname.includes(item.href));
        return currentItem ? String(currentItem.key) : '0';
    };

    // 小屏幕：显示汉堡菜单按钮
    const isMobile = !screens.md; // md 断点为 768px

    return (
        <Header style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <Flex justify="space-between" align="center" style={{ width: '100%' }} gap={16}>
                <Link href="/">
                    <img
                        src="/assets/images/sites/logo/logo-dark.svg"
                        alt="博友圈"
                        style={{ height: 26, verticalAlign: 'middle' }}
                    />
                </Link>

                {!isMobile ? (
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[getSelectedKey()]}
                        items={MENU_ITEMS.map(item => ({
                            key: item.key,
                            label: <a href={item.href}>{item.label}</a>
                        }))}
                        style={{ flex: 1, minWidth: 0, fontWeight: 600, justifyContent: 'flex-end' }}
                    />
                ) : (
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ color: 'white', fontSize: 20 }} />}
                        onClick={() => setDrawerOpen(true)}
                    />
                )}

                <Drawer
                    title="菜单"
                    placement="right"
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    styles={{ body: { padding: 0 } }}
                >
                    <Menu
                        mode="vertical"
                        selectedKeys={[getSelectedKey()]}
                        items={MENU_ITEMS.map(item => ({
                            key: item.key,
                            label: <a href={item.href}>{item.label}</a>
                        }))}
                        onClick={() => setDrawerOpen(false)}
                    />
                </Drawer>
            </Flex>
        </Header>
    );
};

export default MainHeader;