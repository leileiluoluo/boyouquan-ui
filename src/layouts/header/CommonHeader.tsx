import React, { useState } from 'react';
import {
    theme, Layout, Flex, Menu, Typography, Drawer, Button,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { MobileOnly, PCOnly } from '@components/common/Responsive';

const { Header } = Layout;
const { Link } = Typography;
const { useToken } = theme;

const MENU_ITEMS = [
    { key: '0', label: '首页', href: '/home' },
    { key: '1', label: '随手一拍', href: '/moments' },
    { key: '2', label: '每月精选', href: '/monthly-selected' },
    { key: '3', label: '博客广场', href: '/blogs' },
    { key: '4', label: '连接系数', href: '/link-graphs' },
    { key: '5', label: '星球穿梭', href: '/planet-shuttle' },
    { key: '6', label: '提交博客', href: '/blog-requests/add' },
    { key: '7', label: '审核结果', href: '/blog-requests' },
];

const MOBILE_MENU_ITEMS = [
    { key: '0', label: '首页', href: '/home' },
    { key: '1', label: '随手一拍', href: '/moments' },
    { key: '2', label: '每月精选', href: '/monthly-selected' },
    { key: '3', label: '博客广场', href: '/blogs' },
    { key: '4', label: '连接系数', href: '/link-graphs' },
    { key: '5', label: '星球穿梭', href: '/planet-shuttle' },
    { key: '6', label: '提交博客', href: '/blog-requests/add' },
    { key: '7', label: '审核结果', href: '/blog-requests' },
    { key: '8', label: '赞助本站', href: '/sponsor' },
    { key: '9', label: '关于本站', href: '/about' },
];

const CommonHeader: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { token } = useToken();

    const getSelectedKey = () => {
        const currentItem = MENU_ITEMS.find(item => location.pathname.includes(item.href));
        return currentItem ? currentItem.key : '0';
    };

    return (
        <Header
            className="common-header"
            style={{
                background: token.colorBgLayout,
                height: '54px',    // 核心：把 Header 变窄
                padding: '0 16px', // 内边距统一
                lineHeight: '54px'
            }}
        >
            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                {/* LOGO */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/assets/images/sites/logo/logo.svg"
                        alt="博友圈"
                        style={{ height: 24 }} // 缩小一点更协调
                    />
                </Link>

                {/* PC 端横排菜单 */}
                <PCOnly>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[getSelectedKey()]}
                        style={{
                            // fontWeight: 500,
                            background: 'transparent',
                            borderBottom: 'none',
                            lineHeight: '54px', // 菜单高度同步缩小
                        }}
                        items={MENU_ITEMS.map(item => ({
                            key: item.key,
                            label: (
                                <a
                                    href={item.href}
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                >
                                    {item.label}
                                </a>
                            ),
                        }))}
                    />
                </PCOnly>

                {/* 移动端：菜单按钮 */}
                <MobileOnly>
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setOpen(true)}
                        style={{ color: token.colorTextQuaternary, fontSize: 18 }}
                    />
                </MobileOnly>
            </Flex>

            {/* 移动端：抽屉菜单 */}
            <Drawer
                title="菜单"
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
                width={200}
                keyboard={true}
                rootStyle={{ position: 'fixed' }}
                getContainer={false}
                closeIcon={<span style={{ color: token.colorTextQuaternary, fontSize: 16 }}>✕</span>}
                headerStyle={{
                    background: token.colorBgLayout,
                    color: token.colorTextQuaternary,
                }}
                styles={{
                    body: {
                        padding: 0,
                        background: token.colorBgLayout,
                    },
                    wrapper: { position: 'fixed' },
                }}
            >
                <Menu
                    mode="vertical"
                    style={{
                        fontWeight: 500,
                    }}
                    selectedKeys={[getSelectedKey()]}
                    onClick={() => setOpen(false)}
                    items={MOBILE_MENU_ITEMS.map(item => ({
                        key: item.key,
                        label: <a href={item.href}>{item.label}</a>,
                    }))}
                />
            </Drawer>
        </Header>
    );
};

export default CommonHeader;