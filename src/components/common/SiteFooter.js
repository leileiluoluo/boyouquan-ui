import { Box, Container, Flex, Link, TabNav, Text } from "@radix-ui/themes";

export default function SiteFooter() {
    const footerStyle = { marginBottom: '14px' };
    const footerTextStyle = { fontSize: '12px' };
    const spanStyle = { margin: '6px 6px' };
    return (
        <footer className="footer">
            <Box>
                <Container size="2">
                    <Flex direction="column" justify="center" align="center">
                        <Box>
                            <TabNav.Root>
                                <TabNav.Link href="/sponsor">赞助本站</TabNav.Link>
                                <TabNav.Link href="/release-notes">发布历史</TabNav.Link>
                                <TabNav.Link href="/about">关于本站</TabNav.Link>
                                <TabNav.Link href="/annual-reports">年度报告</TabNav.Link>
                                <TabNav.Link href="/similar-sites">同类网站</TabNav.Link>
                            </TabNav.Root>
                        </Box>
                        <Box>
                            <Text size="1">
                                本站使用「<Link href="https://www.boyouquan.com/about#open-source">博友圈开源程序</Link>」创建，使用「<Link href="https://curl.qcloud.com/okTsvSrj">腾讯云</Link>」提供服务！
                            </Text>
                        </Box>
                        <Box>
                            <Link size="1" href="https://beian.miit.gov.cn/">辽ICP备2022012085号-2</Link>
                        </Box>
                        <Box>
                            <Text size="1">Copyright © 2023-2025 <Link href="https://www.boyouquan.com/home">博友圈</Link></Text>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </footer>
    )
}