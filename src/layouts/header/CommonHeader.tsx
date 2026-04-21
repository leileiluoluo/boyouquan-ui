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
    { key: '5', label: '提交博客', href: '/blog-requests/add' },
    { key: '6', label: '审核结果', href: '/blog-requests' },
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
                height: 60,          // 标准高度
                padding: '0 16px',   // 左右内边距
                borderBottom: '1px solid #f5f5f5',
                position: 'relative',
            }}
        >
            {/* 核心：占满高度 + 完美垂直居中 */}
            <Flex
                justify="space-between"
                align="center"
                style={{ height: '100%' }}
            >
                {/* LOGO 完美垂直居中 */}
                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <img
                        src="/assets/images/sites/logo/logo-blue.svg"
                        alt="博友圈"
                        style={{ height: 30 }}
                    />
                </Link>

                {/* PC 菜单：完美垂直居中 */}
                <PCOnly>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[getSelectedKey()]}
                        style={{
                            background: 'transparent',
                            borderBottom: 'none',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        items={MENU_ITEMS.map(item => ({
                            key: item.key,
                            label: (
                                <a href={item.href} style={{
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}>
                                    {item.label}
                                </a>
                            ),
                        }))}
                    />
                </PCOnly>

                {/* 移动端按钮 */}
                <MobileOnly>
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setOpen(true)}
                        style={{ fontSize: 18 }}
                    />
                </MobileOnly>
            </Flex>

            <Drawer
                title="菜单"
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
                width={200}
                getContainer={false}
                maskClosable={true}
                styles={{
                    body: {
                        padding: 0,
                    },
                    mask: {
                        position: 'fixed',
                    },
                    wrapper: {
                        position: 'fixed',
                    },
                }}
                rootStyle={{ position: 'absolute' }}
            >
                <Menu
                    mode="vertical"
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