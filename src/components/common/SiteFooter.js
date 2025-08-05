import { Box, Container, Flex, Link, ScrollArea, Separator, Text } from '@radix-ui/themes';

export default function SiteFooter() {
    return (
        <Box mt="4">
            <Container size="2">
                <Box>
                    <ScrollArea scrollbars="horizontal">
                        <Flex gap="2" justify="center" align="center">
                            <Link size="2" href="/sponsor">赞助本站</Link>
                            <Separator orientation="vertical" />
                            <Link size="2" href="/release-notes">发布历史</Link>
                            <Separator orientation="vertical" />
                            <Link size="2" href="/about">关于本站</Link>
                            <Separator orientation="vertical" />
                            <Link size="2" href="/annual-reports">年度报告</Link>
                            <Separator orientation="vertical" />
                            <Link size="2" href="/similar-sites">同类网站</Link>
                        </Flex>
                    </ScrollArea>
                </Box>
                <Box align="center">
                    <Container size="1">
                        <Separator size="4" my="1" /> 
                    </Container>
                </Box>
                <Flex direction="column" justify="center" align="center">
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
    )
}