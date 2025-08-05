import { useEffect, useState } from 'react';
import { Flex, Box, TabNav, Text, Container, Link } from '@radix-ui/themes';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export default function Header() {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
    });

    return (
        <Box style={{ marginBottom: "20px" }}>
            <Container size="3">
                <Flex align="center" justify="between">
                    <Box width="40%">
                        <Text size="6">
                            <Link href="/"
                                style={{
                                    backgroundImage: "linear-gradient(to right, #14100f, #d55b5b, #4d14e6)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    color: "transparent",
                                }}>博友圈</Link>
                        </Text>
                    </Box>
                    <Box width="60%">
                        <ScrollArea type="always" scrollbars="horizontal">
                            <TabNav.Root size="4" style={{ fontWeight: 'bold' }}>
                                <TabNav.Link href="/home" active={pathname === "/home"}>首页</TabNav.Link>
                                <TabNav.Link href="/monthly-selected" active={pathname === "/monthly-selected"}>每月精选</TabNav.Link>
                                <TabNav.Link href="/blogs" active={pathname.startsWith("/blogs")}>博客广场</TabNav.Link>
                                <TabNav.Link asChild>
                                    <a href="/planet-shuttle" target="_blank" rel="noopener noreferrer">
                                        星球穿梭
                                    </a>
                                </TabNav.Link>
                                <TabNav.Link href="/blog-requests/add" active={pathname.startsWith("/blog-requests/add")}>提交博客</TabNav.Link>
                                <TabNav.Link href="/blog-requests" active={pathname === "/blog-requests"}>审核结果</TabNav.Link>
                            </TabNav.Root>
                        </ScrollArea>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}