import { useEffect, useState } from 'react';
import { formatDateStr } from '../../utils/DateUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Text, Link } from '@radix-ui/themes';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';

function getLink(blogStatusOk, link) {
    return blogStatusOk ? `/go?from=website&link=${encodeURIComponent(link)}` : `/abstract?link=${encodeURIComponent(link)}`;
}

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
                </Flex>
            </Flex>
        </Card>
    )
}