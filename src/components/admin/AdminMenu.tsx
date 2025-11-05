import React from 'react';
import { redirectTo } from '../../utils/CommonUtil';
import { getCookie, setCookie } from '../../utils/CookieUtil';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/APIRequestUtil';

import { Flex, Box, Text, Button, TabNav } from '@radix-ui/themes';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useEffect, useState } from 'react';

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

    return (
        <Box mb="2">
            <Flex gap="1" direction="column">
                <Box mt="2">
                    <Text>{getCookie('username')}</Text> |
                    <Button size="1" onClick={() => logout()}>退出登录</Button>
                </Box>
                <ScrollArea>
                    <TabNav.Root size="2" color="crimson">
                        <TabNav.Link href="/admin/blog-requests" active={pathname === "/admin/blog-requests"}>博客审核</TabNav.Link>
                        <TabNav.Link href="/admin/blog-requests/add" active={pathname === "/admin/blog-requests/add"}>提交博客</TabNav.Link>
                        <TabNav.Link href="/admin/monthly-selected" active={pathname === "/admin/monthly-selected"}>每月精选</TabNav.Link>
                        <TabNav.Link href="/admin/recommended-posts" active={pathname === "/admin/recommended-posts"}>推荐文章管理</TabNav.Link>
                        <TabNav.Link href="/admin/recommended-posts/add" active={pathname === "/admin/recommended-posts/add"}>推荐文章</TabNav.Link>
                    </TabNav.Root>
                </ScrollArea>
            </Flex>
        </Box>
    )
}