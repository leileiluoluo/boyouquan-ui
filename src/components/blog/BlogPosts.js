import { useEffect, useState } from 'react';
import { formatDateStr } from '../../utils/DateUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Box, Text, Link } from '@radix-ui/themes';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';

export default function BlogPosts({ domain, blogStatusOk }) {
    const [showPostsLimit, setShowPostsLimit] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`/api/blogs/posts?domainName=${domain}`);

        const respBody = await resp.json();
        setPosts(respBody);

        if (respBody.length == 100) {
            setShowPostsLimit(true);
        }
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="1">
                <Text size="2" color="gray">收录文章</Text>
                <Flex direction="column">
                    <Box>
                        {
                            posts.map(
                                (post, index) => (
                                    <Flex gap="2" key={index} style={{ backgroundColor: index % 2 == 1 ? 'rgb(245, 245, 245)' : 'none' }}>
                                        <Text size="2">{formatDateStr(post.publishedAt, true)}</Text>
                                        <Text size="2" style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {blogStatusOk ? <Link href={getGoAddress(post.link)}>{post.title}</Link>
                                                : <Link href={getAbstractAddress(post.link)}>{post.title}</Link>}
                                        </Text>
                                    </Flex>
                                )
                            )
                        }
                    </Box>
                    {
                        showPostsLimit ? <Box>
                            <Text size="1" color="crimson">* 仅显示最近 100 篇文章</Text>
                        </Box> : ''
                    }
                </Flex>
            </Flex>
        </Card>
    )
}