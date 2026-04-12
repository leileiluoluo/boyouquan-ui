import React, { useState } from 'react';
import {
    Layout, Flex, Menu, Typography, Drawer, Button,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { MobileOnly, PCOnly } from '@components/common/Responsive';

const { Header } = Layout;
const { Link } = Typography;

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

const CommonHeader: React.FC = () => {
    const [open, setOpen] = useState(false);

    const getSelectedKey = () => {
        const currentItem = MENU_ITEMS.find(item => location.pathname.includes(item.href));
        return currentItem ? currentItem.key : '0';
    };

    return (
        <Header
            style={{
                background: '#092640',
                color: '#fff',
                padding: '0 24px',
                height: 64,
            }}
        >
            <Flex justify="space-between" align="center" style={{ height: '100%' }}>
                {/* LOGO */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/assets/images/sites/logo/logo-dark.svg"
                        alt="博友圈"
                        style={{ height: 26 }}
                    />
                </Link>

                {/* PC 端横排菜单 */}
                <PCOnly>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[getSelectedKey()]}
                        theme="dark"
                        style={{
                            background: 'transparent',
                            borderBottom: 'none',
                            lineHeight: '62px',
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
                        style={{ color: '#fff', fontSize: 18 }}
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
                closeIcon={<span style={{ color: '#fff', fontSize: 16 }}>✕</span>}
                headerStyle={{
                    background: '#092640',
                    color: '#fff',
                    // borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
                styles={{
                    body: {
                        padding: 0,
                        background: '#092640',
                    },
                    wrapper: { position: 'fixed' },
                }}
            >
                <Menu
                    mode="vertical"
                    theme="dark"

                    selectedKeys={[getSelectedKey()]}
                    onClick={() => setOpen(false)}
                    items={MENU_ITEMS.map(item => ({
                        key: item.key,
                        label: <a href={item.href}>{item.label}</a>,
                    }))}
                />
            </Drawer>
        </Header>
    );
};

export default CommonHeader;