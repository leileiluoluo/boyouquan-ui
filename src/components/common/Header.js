import { useEffect, useState } from 'react';
import { Flex, Box, TabNav, Container, Link } from '@radix-ui/themes';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export default function Header() {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
    });

    return (
        <Box style={{ marginBottom: "10px" }}>
            <Container size="3">
                <Flex align="center" justify="between">
                    <Box mt="1" width="40%">
                        <Link href="/">
                            <img height="26px" src="/assets/images/sites/logo/logo.svg"></img>
                        </Link>
                    </Box>
                    <Box mt="-2" width="60%">
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
                                <TabNav.Link href="/blog-requests/add/email-validation" active={pathname.startsWith("/blog-requests/add")}>提交博客</TabNav.Link>
                                <TabNav.Link href="/blog-requests" active={!pathname.startsWith("/blog-requests/add") && pathname.startsWith("/blog-requests")}>审核结果</TabNav.Link>
                            </TabNav.Root>
                        </ScrollArea>
                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}