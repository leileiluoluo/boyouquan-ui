import React from 'react';
import { Layout, Flex, Menu, Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const { Header } = Layout;
const { Link } = Typography;

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

    // 根据当前路径找到对应的 menu key
    const getSelectedKey = () => {
        const currentItem = MENU_ITEMS.find(item => location.pathname.includes(item.href));
        return currentItem ? String(currentItem.key) : '0';
    };

    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Flex justify="space-between" align="center" gap={32}>
                <Link href="/">
                    <img
                        src="/assets/images/sites/logo/logo-dark.svg"
                        alt="博友圈"
                        style={{ height: 26, verticalAlign: 'middle' }}
                    />
                </Link>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[getSelectedKey()]}
                    items={MENU_ITEMS.map(item => ({
                        key: item.key,
                        label: <a href={item.href}>{item.label}</a>
                    }))}
                    style={{ flex: 1, minWidth: 0, fontWeight: 600 }}
                />
            </Flex>
        </Header>
    );
};

export default MainHeader;