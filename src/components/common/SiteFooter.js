import { Box, Container, Flex, Link, ScrollArea, Separator, Text, IconButton, DropdownMenu, Tooltip } from '@radix-ui/themes';
import { Rss, Github, Cloud } from 'lucide-react';

export default function SiteFooter() {
    return (
        <Container size="2">
            <Box mt="4">
                <Box>
                    <ScrollArea size="1" scrollbars="horizontal">
                        <Flex gap="2" justify="center" align="center">
                            <Link size="2" weight="bold" href="/sponsor">赞助本站</Link>
                            <Separator orientation="vertical" />
                            <Link size="2" weight="bold" href="/release-notes">发布历史</Link>
                            <Separator orientation="vertical" />
                            <Link size="2" weight="bold" href="/about">关于本站</Link>
                            <Separator orientation="vertical" />
                            <Link size="2" weight="bold" href="/annual-reports">年度报告</Link>
                            <Separator orientation="vertical" />
                            <Link size="2" weight="bold" href="/similar-sites">同类网站</Link>
                        </Flex>
                    </ScrollArea>
                </Box>

                <Separator size="4" my="2" />

                <Box mt="4">
                    <Flex gap="2" justify="center" align="center">
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <IconButton variant="soft">
                                    <Tooltip content="本站文章 RSS 订阅">
                                        <Rss width="14" height="14" />
                                    </Tooltip>
                                </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <Link size="1" target="_blank" href="https://www.boyouquan.com/feed.xml"><DropdownMenu.Item>推荐文章 RSS 订阅</DropdownMenu.Item></Link>
                                <DropdownMenu.Separator />
                                <Link size="1" target="_blank" href="https://www.boyouquan.com/feed.xml?sort=latest"><DropdownMenu.Item>最新文章 RSS 订阅</DropdownMenu.Item></Link>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>

                        <Separator orientation="vertical" />

                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <IconButton variant="soft">
                                    <Tooltip content="本站代码 GitHub 开源">
                                        <Github width="14" height="14" />
                                    </Tooltip>
                                </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <Link size="1" target="_blank" href="https://github.com/leileiluoluo/boyouquan-ui"><DropdownMenu.Item>前端代码 GitHub</DropdownMenu.Item></Link>
                                <DropdownMenu.Separator />
                                <Link size="1" target="_blank" href="https://github.com/leileiluoluo/boyouquan-api"><DropdownMenu.Item>后端代码 GitHub</DropdownMenu.Item></Link>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>

                        <Separator orientation="vertical" />

                        <Link target="_blank" href="https://curl.qcloud.com/okTsvSrj">
                            <IconButton variant="soft">
                                <Tooltip content="本站使用的云服务">
                                    <Cloud width="14" height="14" />
                                </Tooltip>
                            </IconButton>
                        </Link>
                    </Flex>
                </Box>
                <Box mt="2">
                    <Box mb="2" align="center">
                        <Text size="1">将一个个散落在各处的孤岛连接成一片广袤无垠的新大陆！</Text>
                    </Box>
                    <Flex gap="2" direction="column" align="center">
                        <Link size="1" href="https://beian.miit.gov.cn/">辽ICP备2022012085号-2</Link>
                        <Text size="1">Copyright © 2023-2025 <Link href="https://www.boyouquan.com/home">博友圈</Link></Text>
                    </Flex>
                </Box>
            </Box>
        </Container>
    )
}