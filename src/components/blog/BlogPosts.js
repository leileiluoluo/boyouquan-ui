import { useEffect, useRef, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Box, Text, Link, ScrollArea, Separator, Tooltip } from '@radix-ui/themes';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';
import { Timeline } from 'antd';
import { Rss } from 'lucide-react';

export default function BlogPosts({ domain, rssAddress, blogStatusOk }) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [total, setTotal] = useState(0);
    const [groupedPosts, setGroupedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const scrollRef = useRef(null);
    const isFetchingRef = useRef(false);

    const groupedByYear = (posts) => {
        const grouped = posts.reduce((acc, item) => {
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

        return Object.values(grouped).sort((a, b) => b.year - a.year);
    };

    const fetchData = async (domain, page, size) => {
        if (isFetchingRef.current || !hasMore) return;
        isFetchingRef.current = true;

        const resp = await RequestUtil.get(`/api/blogs/posts?domainName=${domain}&page=${page}&size=${size}`);
        const respBody = await resp.json();

        const newPosts = respBody.results || [];
        const totalCount = respBody.total || newPosts.length;
        setTotal(totalCount);

        // ✅ 提前计算是否还有更多
        const allLoadedCount = (page - 1) * size + newPosts.length;
        if (allLoadedCount >= totalCount) {
            setHasMore(false);
        }

        if (newPosts.length === 0) {
            setHasMore(false);
            isFetchingRef.current = false;
            return;
        }

        const grouped = groupedByYear(newPosts);

        setGroupedPosts(prev => {
            const merged = [...prev];
            grouped.forEach(g => {
                const existing = merged.find(item => item.year === g.year);
                if (existing) {
                    existing.posts = [...existing.posts, ...g.posts];
                } else {
                    merged.push(g);
                }
            });
            return merged.sort((a, b) => b.year - a.year);
        });

        isFetchingRef.current = false;
    };

    useEffect(() => {
        // domain 改变时重置
        setGroupedPosts([]);
        setPage(1);
        setHasMore(true);
    }, [domain]);

    useEffect(() => {
        if (domain) fetchData(domain, page, size);
    }, [domain, page, size]);

    useEffect(() => {
        const scrollEl = scrollRef.current;
        if (!scrollEl) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = scrollEl;
            if (scrollHeight - scrollTop - clientHeight < 50 && !isFetchingRef.current && hasMore) {
                setPage(prev => prev + 1);
            }
        };

        scrollEl.addEventListener('scroll', handleScroll);
        return () => scrollEl.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="1">
                <Flex justify="between">
                    <Text size="2" color="gray">收录文章</Text>
                    <Tooltip content="文章 RSS 地址">
                        <Link href={rssAddress} target="_blank"><Rss width="14" height="14" /></Link>
                    </Tooltip>
                </Flex>

                <Box mt="2">
                    <ScrollArea
                        ref={scrollRef}
                        type="always"
                        scrollbars="vertical"
                        style={{ maxHeight: '480px' }}
                    >
                        <Timeline style={{ marginLeft: '16px', marginBottom: '0px' }}>
                            {groupedPosts.map((groupedPost) => (
                                <>
                                    <Timeline.Item
                                        key={groupedPost.year}
                                        style={{ marginTop: '2px', marginBottom: '6px' }}
                                        dot={<Text size="2" weight="bold" color="indigo">{groupedPost.year}</Text>}
                                    />
                                    {groupedPost.posts.map((post, index) => (
                                        <Timeline.Item color="gray" key={`${groupedPost.year}-${index}`} style={{ paddingBottom: '2px' }}>
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
                                                    {blogStatusOk
                                                        ? <Link target="_blank" href={getGoAddress(post.link)}>{post.title}</Link>
                                                        : <Link href={getAbstractAddress(post.link)}>{post.title}</Link>}
                                                </Text>
                                            </Flex>
                                        </Timeline.Item>
                                    ))}
                                </>
                            ))}
                        </Timeline>

                        <Box align="center" mt="2" mb="2">
                            {hasMore ? (
                                <Text size="1" color="gray">正在加载更多...</Text>
                            ) : (
                                <Flex align="center" justify="center" gap="2">
                                    <Separator size="2" orientation="horizontal" />
                                    <Text size="1" color="gray">以上就是收录的全部文章，没有更多了</Text>
                                    <Separator size="2" orientation="horizontal" />
                                </Flex>
                            )}
                        </Box>
                    </ScrollArea>
                </Box>
            </Flex>
        </Card>
    );
}
