import { useEffect, useState } from 'react';
import { Flex, Box, TabNav, Container, Link } from '@radix-ui/themes';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export default function Header() {
    const [pathname, setPathname] = useState('');

    const siteNameStyle = { fontSize: '22px', fontWeight: 500, '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent', backgroundImage: 'linear-gradient(to right, rgba(205, 28, 87, 1), rgba(126, 9, 184, 1))' };

    useEffect(() => {
        setPathname(window.location.pathname);
    });

    return (
        <Box mt="-2" style={{ marginBottom: "10px" }}>
            <Container size="3">
                <Flex align="center" justify="between">
                    <Box mt="1" width="20%">
                        <Link href="/" style={siteNameStyle}>
                            博友圈
                        </Link>
                    </Box>
                    <Box width="80%">
                        <ScrollArea type="always" scrollbars="horizontal">
                            <TabNav.Root size="4" style={{ fontWeight: 'bold' }}>
                                <TabNav.Link href="/home" active={pathname === "/home"}>首页</TabNav.Link>
                                <TabNav.Link href="/moments" active={pathname === "/moments"}>随手一拍</TabNav.Link>
                                <TabNav.Link href="/monthly-selected" active={pathname === "/monthly-selected"}>每月精选</TabNav.Link>
                                <TabNav.Link href="/blogs" active={pathname.startsWith("/blogs")}>博客广场</TabNav.Link>
                                <TabNav.Link style={{ color: "rgb(203, 46, 88)" }} href="/link-graphs" active={pathname === "/link-graphs"}>连接系数
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "-0.6em",
                                            right: "-0.6em",
                                            fontSize: "0.6em",
                                            color: "rgb(203, 46, 88)",
                                        }}
                                    >
                                        New
                                    </span>
                                </TabNav.Link>
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