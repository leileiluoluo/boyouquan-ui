import { useEffect, useState } from 'react';
import { Flex, Box, TabNav, Text, Container } from '@radix-ui/themes';

export default function Header() {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
    });

    return (
        <header>
            <Box style={{ marginBottom: "40px" }}>
                <Container size="3">
                    <Flex align="center" justify="between">
                        <Box>
                            <Text size="6" style={{
                                backgroundImage: "linear-gradient(to right, #14100f, #d55b5b, #4d14e6)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}>博友圈</Text>
                        </Box>
                        <Box>
                            <TabNav.Root size="3">
                                <TabNav.Link href="/home" active={pathname === "/home"}>首页</TabNav.Link>
                                <TabNav.Link href="/monthly-selected" active={pathname === "/monthly-selected"}>每月精选</TabNav.Link>
                                <TabNav.Link href="/blogs" active={pathname === "/blogs"}>博客广场</TabNav.Link>
                                <TabNav.Link href="/blog-requests/add" active={pathname.startsWith("/blog-requests/add")}>提交博客</TabNav.Link>
                                <TabNav.Link href="/blog-requests" active={pathname === "/blog-requests"}>审核结果</TabNav.Link>
                            </TabNav.Root>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </header>
    )
}