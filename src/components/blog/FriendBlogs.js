import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Box, Text, Link, ScrollArea, Badge } from '@radix-ui/themes';

export default function FriendBlogs({ domain }) {
    const [linksFromMe, setLinksFromMe] = useState([]);
    const [linksToMe, setLinksToMe] = useState([]);

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`/api/blog-intimacies/my-friend-links?blogDomainName=${domain}`);

        const respBody = await resp.json();
        setLinksFromMe(respBody.linksFromMe);
        setLinksToMe(respBody.linksToMe);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    // 渲染链接列表的函数
    const renderLinks = (links) => {
        if (links.length === 0) {
            return <Text size="2" color="gray">无</Text>;
        }

        return (
            <>
                {links.map((blog, index) => (
                    <span key={blog.domainName}>
                        <Link size="2" href={`/blogs/${blog.domainName}`}>
                            <Badge>{blog.name}</Badge>
                        </Link>
                        {index < links.length - 1 && <Text size="2" as="span">、</Text>}
                    </span>
                ))}
            </>
        );
    };

    if (linksFromMe.length === 0 && linksToMe.length === 0) {
        return null;
    }

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="2">
                <Text size="2" color="gray">连接系数</Text>
                <Flex direction="column" gap="2">
                    <Box>
                        <ScrollArea scrollbars="horizontal">
                            <Flex align="center" gap="0" style={{ whiteSpace: 'nowrap' }}>
                                <Text size="2" color="gray" mr="1">链出 (<Link color="gray">{linksFromMe.length}</Link>) → </Text>
                                {renderLinks(linksFromMe)}
                            </Flex>
                        </ScrollArea>
                    </Box>

                    <Box>
                        <ScrollArea scrollbars="horizontal">
                            <Flex align="center" gap="0" style={{ whiteSpace: 'nowrap' }}>
                                <Text size="2" color="gray" mr="1">链入 (<Link color="gray">{linksToMe.length}</Link>) ← </Text>
                                {renderLinks(linksToMe)}
                            </Flex>
                        </ScrollArea>
                    </Box>
                </Flex>
            </Flex>
        </Card>
    );
}