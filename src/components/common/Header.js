import { useEffect, useState } from 'react';
import { Flex, TabNav } from '@radix-ui/themes';

export default function Header() {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
    });

    return (
        <Flex direction="column" gap="4" pb="2">
            <TabNav.Root size="2">
                <TabNav.Link href="/home" active={pathname === "/home"}>首页</TabNav.Link>
                <TabNav.Link href="/monthly-selected" active={pathname === "/monthly-selected"}>每月精选</TabNav.Link>
                <TabNav.Link href="/blogs" active={pathname === "/blogs"}>博客广场</TabNav.Link>
                <TabNav.Link href="/blog-requests/add" active={pathname.startsWith("/blog-requests/add")}>提交博客</TabNav.Link>
                <TabNav.Link href="/blog-requests" active={pathname === "/blog-requests"}>审核结果</TabNav.Link>
            </TabNav.Root>
        </Flex>
    )
}