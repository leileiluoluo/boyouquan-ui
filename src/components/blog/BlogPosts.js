import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Box, Text, Link, ScrollArea, Separator } from '@radix-ui/themes';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';
import { Timeline } from 'antd';


export default function BlogPosts({ domain, blogStatusOk }) {
    const [groupedPosts, setGroupedPosts] = useState([]);

    const groupedByYear = (posts) => {
        const grouped =
            posts.reduce((acc, item) => {
                const [datePart] = item.publishedAt.split(' ');
                const [year, month, day] = datePart.split('/');
                const timestamp = new Date(item.publishedAt).getTime();

                if (!acc[year]) {
                    acc[year] = {
                        year: year,
                        posts: []
                    };
                }

                acc[year].posts.push({
                    title: item.title,
                    link: item.link,
                    publishedAt: `${month}/${day}`,
                    _timestamp: timestamp
                });

                return acc;
            }, {});

        Object.values(grouped).forEach(yearData => {
            yearData.posts.sort((a, b) => b._timestamp - a._timestamp);
        });

        return Object.values(grouped)
            .sort((a, b) => b.year - a.year);
    }

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`/api/blogs/posts?domainName=${domain}`);

        const respBody = await resp.json();
        const groupedPosts = groupedByYear(respBody);

        setGroupedPosts(groupedPosts);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="1">
                <Text size="2" color="gray">收录文章</Text>
                <Box mt="2">
                    <ScrollArea type="always" scrollbars="vertical" style={{ maxHeight: '480px' }}>
                        <Timeline style={{ marginLeft: '16px', marginBottom: '0px' }}>
                            {
                                groupedPosts.map(
                                    (groupedPost, index) => (
                                        <>
                                            <Timeline.Item style={{ marginTop: '2px', marginBottom: '6px' }} dot={<Text size="2" weight="bold" color="indigo">{groupedPost.year}</Text>}></Timeline.Item>
                                            {
                                                groupedPost.posts.map(
                                                    (post, index) => (
                                                        <Timeline.Item color="gray" key={index} style={{ paddingBottom: '2px' }}>
                                                            <Flex gap="2">
                                                                <Box minWidth="42px">
                                                                    <Text size="2" color="gray">{post.publishedAt}</Text>
                                                                </Box>
                                                                <Text size="2" style={{
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: 1,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    overflow: 'hidden'
                                                                }}>
                                                                    {blogStatusOk ? <Link target="_blank" href={getGoAddress(post.link)}>{post.title}</Link>
                                                                        : <Link href={getAbstractAddress(post.link)}>{post.title}</Link>}
                                                                </Text>
                                                            </Flex>
                                                        </Timeline.Item>
                                                    )
                                                )
                                            }
                                        </>
                                    )
                                )
                            }
                        </Timeline>
                        <Box align="center" mt="-5">
                            <Flex align="center" justify="center" gap="2">
                                <Separator size="2" orientation="horizontal" />
                                <Text size="1" color="gray"> 以上就是收录的全部文章，没有更多了 </Text>
                                <Separator size="2" orientation="horizontal" />
                            </Flex>
                        </Box>
                    </ScrollArea>
                </Box>
            </Flex>
        </Card>
    )
}