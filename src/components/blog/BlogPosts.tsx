import { useEffect, useRef, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Typography, Tooltip, Spin, Timeline, Space, Divider } from 'antd';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';
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
                acc[year] = { year: year, posts: [] };
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
        if (allLoadedCount >= totalCount) setHasMore(false);
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
                const exist = merged.find(item => item.year === g.year);
                if (exist) exist.posts = [...exist.posts, ...g.posts];
                else merged.push(g);
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
        const el = scrollRef.current;
        if (!el) return;
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollHeight - scrollTop - clientHeight < 50 && !isFetchingRef.current && hasMore) {
                setPage(p => p + 1);
            }
        };
        el.addEventListener('scroll', onScroll);
        return () => el.removeEventListener('scroll', onScroll);
    }, [hasMore]);

    return (
        <Card bodyStyle={{ padding: '16px' }}>
            <Flex vertical gap={12}>
                {/* 头部 */}
                <Flex justify="space-between" align="center">
                    <Text type="secondary" style={{ fontSize: 14 }}>收录文章</Text>
                    <Tooltip title="文章 RSS 地址">
                        <Link href={rssAddress} target="_blank">
                            <Rss size={16} />
                        </Link>
                    </Tooltip>
                </Flex>

                {/* 时间轴区域 */}
                <div
                    ref={scrollRef}
                    style={{
                        maxHeight: 480,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        paddingRight: 8
                    }}
                >
                    <Timeline
                        items={groupedPosts.flatMap(group => [
                            // 年份节点（关键：横向显示、不旋转、正常排版）
                            {
                                dot: (
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <Text strong style={{ color: '#1677ff', fontSize: 14 }}>
                                            {group.year}
                                        </Text>
                                    </div>
                                ),
                                children: null,
                                key: `y-${group.year}`
                            },
                            // 文章列表
                            ...group.posts.map((post, i) => ({
                                color: 'gray',
                                children: (
                                    <Flex gap={8} align="center">
                                        <Text type="secondary" style={{ minWidth: 42, fontSize: 13 }}>
                                            {post.publishedAt}
                                        </Text>
                                        <Text ellipsis style={{ fontSize: 14, flex: 1 }}>
                                            {blogStatusOk ? (
                                                <Link href={getGoAddress(post.link)} target="_blank">{post.title}</Link>
                                            ) : (
                                                <Link href={getAbstractAddress(post.link)}>{post.title}</Link>
                                            )}
                                        </Text>
                                    </Flex>
                                ),
                                key: `p-${group.year}-${i}`
                            }))
                        ])}
                    />

                    {/* 加载/底部提示 */}
                    <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} align="center">
                        {loading ? (
                            <Spin size="small" />
                        ) : hasMore ? (
                            <Text type="secondary" style={{ fontSize: 12 }}>加载更多中...</Text>
                        ) : (
                            <Divider plain style={{ margin: 0 }}>
                                <Text type="secondary" style={{ fontSize: 12 }}>已加载全部文章</Text>
                            </Divider>
                        )}
                    </Space>
                </div>
            </Flex>
        </Card>
    );
}