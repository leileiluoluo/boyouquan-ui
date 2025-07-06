import { useEffect, useState } from 'react';
import { formatDateStr } from '../../utils/DateUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

const postsTableStyle = { display: 'table', tableLayout: 'fixed' };
const postTableClumn20Style = { width: '20%' };
const postTableClumn80Style = { width: '80%' };
const textStyle = { marginRight: '6px' };

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
        <Card>
            <Flex direction="column">
                <Text size="2" color="gray">收录文章</Text>
                <Flex direction="column">
                    {
                        posts.map(
                            (post, index) => (
                                <Flex gap="2" key={index}>
                                    <Text size="2">{formatDateStr(post.publishedAt, true)}</Text>
                                    <Text size="2" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {blogStatusOk ? <Link href={`/go?from=website&link=${encodeURIComponent(post.link)}`}>{post.title}</Link>
                                            : <Link href={`/abstract?link=${encodeURIComponent(post.link)}`}>{post.title}</Link>}
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