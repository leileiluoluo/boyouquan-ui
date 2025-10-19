import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Box, Text, Link, ScrollArea } from '@radix-ui/themes';

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

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="2">
                <Text size="2" color="gray">连接系数</Text>
                <Flex direction="column">
                    <ScrollArea scrollbars="horizontal">
                        <Text size="2" color="gray">该博客链接的：</Text>
                        {linksFromMe.length > 0 ? linksFromMe.map((blog, index) => (
                            linksFromMe.length != 1 && index == linksFromMe.length - 1
                                ? <Link size="2" href={`/blogs/${blog.domainName}`}>{blog.name}</Link>
                                : <Link size="2" href={`/blogs/${blog.domainName}`}>{blog.name}、</Link>
                        )) : <Text size="2" color="gray">无</Text>
                        }
                    </ScrollArea>

                    <ScrollArea scrollbars="horizontal">
                        <Text size="2" color="gray">链接该博客的：</Text>
                        {linksToMe.length > 0 ? linksToMe.map((blog, index) => (
                            linksToMe.length != 1 && index == linksToMe.length - 1
                                ? <Link size="2" href={`/blogs/${blog.domainName}`}>{blog.name}</Link>
                                : <Link size="2" href={`/blogs/${blog.domainName}`}>{blog.name}、</Link>
                        )) : <Text size="2" color="gray">无</Text>
                        }
                    </ScrollArea>
                </Flex>
            </Flex>
        </Card>
    )
}