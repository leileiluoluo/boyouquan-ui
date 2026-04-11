import { useEffect, useRef, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Typography, Tooltip, Spin } from 'antd';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';
import { Timeline } from 'antd';
import { Rss } from 'lucide-react';

const { Text, Link } = Typography;

export default function BlogPosts({ domain, rssAddress, blogStatusOk }) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [total, setTotal] = useState(0);
    const [groupedPosts, setGroupedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        const resp = await RequestUtil.get(`/api/blogs/posts?domainName=${domain}&page=${page}&size=${size}`);
        const respBody = await resp.json();

        const newPosts = respBody.results || [];
        const totalCount = respBody.total || newPosts.length;
        setTotal(totalCount);

        const allLoadedCount = (page - 1) * size + newPosts.length;
        if (allLoadedCount >= totalCount) {
            setHasMore(false);
        }

        if (newPosts.length === 0) {
            setHasMore(false);
            isFetchingRef.current = false;
            setLoading(false);
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
        setLoading(false);
    };

    useEffect(() => {
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
        <Card style={{ padding: 16, width: '100%' }}>
            <Flex vertical gap={4}>
                <Flex justify="space-between" align="center">
                    <Text type="secondary" style={{ fontSize: 14 }}>收录文章</Text>
                    <Tooltip title="文章 RSS 地址">
                        <Link href={rssAddress} target="_blank">
                            <Rss style={{ fontSize: 14 }} />
                        </Link>
                    </Tooltip>
                </Flex>

                <div 
                    ref={scrollRef}
                    style={{ 
                        marginTop: 8,
                        maxHeight: 480, 
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}
                >
                    <Timeline 
                        style={{ marginLeft: 16, marginBottom: 0 }}
                        className="compact-timeline"
                    >
                        {groupedPosts.flatMap((groupedPost) => [
                            <Timeline.Item 
                                key={`year-${groupedPost.year}`}
                                dot={<Text strong style={{ color: '#1677ff', fontSize: 14 }}>{groupedPost.year}</Text>}
                                style={{ paddingBottom: 0 }}
                            />,
                            ...groupedPost.posts.map((post, index) => (
                                <Timeline.Item 
                                    color="gray" 
                                    key={`${groupedPost.year}-${index}`}
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                >
                                    <Flex gap={8} style={{ marginTop: 0 }}>
                                        <div style={{ minWidth: 42 }}>
                                            <Text type="secondary" style={{ fontSize: 14 }}>
                                                {post.publishedAt}
                                            </Text>
                                        </div>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                flex: 1,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {blogStatusOk
                                                ? <Link href={getGoAddress(post.link)} target="_blank">{post.title}</Link>
                                                : <Link href={getAbstractAddress(post.link)}>{post.title}</Link>}
                                        </Text>
                                    </Flex>
                                </Timeline.Item>
                            ))
                        ])}
                    </Timeline>

                    <div style={{ textAlign: 'center', marginTop: 8, marginBottom: 8 }}>
                        {loading ? (
                            <Spin size="small" />
                        ) : hasMore ? (
                            <Text type="secondary" style={{ fontSize: 12 }}>正在加载更多...</Text>
                        ) : (
                            <Flex align="center" justify="center" gap={8}>
                                <div style={{ flex: 1, height: 1, backgroundColor: '#e8e8e8' }} />
                                <Text type="secondary" style={{ fontSize: 12 }}>以上就是收录的全部文章，没有更多了</Text>
                                <div style={{ flex: 1, height: 1, backgroundColor: '#e8e8e8' }} />
                            </Flex>
                        )}
                    </div>
                </div>
            </Flex>

            {/* 添加全局样式覆盖 Timeline 默认间距 */}
            <style>{`
                .compact-timeline .ant-timeline-item {
                    padding-bottom: 4px;
                }
                .compact-timeline .ant-timeline-item-head {
                    margin-top: 0;
                }
                .compact-timeline .ant-timeline-item-content {
                    min-height: auto;
                }
            `}</style>
        </Card>
    );
}