import { redirectTo } from '../../utils/CommonUtil';
import { getCookie, setCookie } from '../../utils/CookieUtil';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/APIRequestUtil';

import { Layout, Space, Typography, Button, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Text } = Typography;
const { Header } = Layout;

const sendLogout = async (): Promise<void> => {
    const username = getCookie('username');
    const sessionId = getCookie('sessionId');

    if (!username || !sessionId) return;

    await RequestUtil.post('/api/admin/logout', 'null', {
        'username': username,
        'sessionId': sessionId
    });

    setCookie('username', 'xxx');
    setCookie('sessionId', 'xxx');
};

const logout = () => {
    sendLogout();

    redirectTo(ADMIN_LOGIN_ADDRESS);
}

export default function AdminMenu() {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
    });

    // Determine selected menu key based on current path
    const getSelectedKey = () => {
        if (pathname === "/admin/blog-requests") return "blog-requests";
        if (pathname === "/admin/blog-requests/add") return "blog-requests-add";
        if (pathname === "/admin/monthly-selected") return "monthly-selected";
        if (pathname === "/admin/recommended-posts") return "recommended-posts";
        if (pathname === "/admin/recommended-posts/add") return "recommended-posts-add";
        return "blog-requests";
    };

    const menuItems = [
        {
            key: "blog-requests",
            label: "博客审核",
            onClick: () => window.location.href = "/admin/blog-requests"
        },
        {
            key: "blog-requests-add",
            label: "提交博客",
            onClick: () => window.location.href = "/admin/blog-requests/add"
        },
        {
            key: "monthly-selected",
            label: "每月精选",
            onClick: () => window.location.href = "/admin/monthly-selected"
        },
        {
            key: "recommended-posts",
            label: "推荐文章管理",
            onClick: () => window.location.href = "/admin/recommended-posts"
        },
        {
            key: "recommended-posts-add",
            label: "推荐文章",
            onClick: () => window.location.href = "/admin/recommended-posts/add"
        }
    ];

    return (
        <div style={{ marginBottom: '8px' }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ marginTop: '8px' }}>
                    <Space size="middle">
                        <Text>{getCookie('username')}</Text>
                        <Text> | </Text>
                        <Button 
                            size="small" 
                            danger 
                            icon={<LogoutOutlined />}
                            onClick={() => logout()}
                        >
                            退出登录
                        </Button>
                    </Space>
                </div>
                <Menu
                    mode="horizontal"
                    selectedKeys={[getSelectedKey()]}
                    items={menuItems}
                    style={{ borderBottom: 'none' }}
                />
            </Space>
        </div>
    )
}