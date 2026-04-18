import { useEffect, useRef, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { theme, Card, Flex, Typography, Tooltip, Spin, Divider, Tag, Space } from 'antd';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';
import { Rss, BookText } from 'lucide-react';

const { Title, Text, Link } = Typography;

const { useToken } = theme;

export default function BlogPosts({ domain, rssAddress, blogStatusOk }) {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [total, setTotal] = useState(0);
    const [groupedPosts, setGroupedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);
    const isFetchingRef = useRef(false);

    const { token } = useToken();

    // 按年份分组 + 排序
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

        Object.values(grouped).forEach(y => y.posts.sort((a, b) => b._timestamp - a._timestamp));
        return Object.values(grouped).sort((a, b) => b.year - a.year);
    };

    // 加载数据
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

    // 域名变化重置
    useEffect(() => {
        setGroupedPosts([]);
        setPage(1);
        setHasMore(true);
    }, [domain]);

    useEffect(() => {
        if (domain) fetchData(domain, page, size);
    }, [domain, page, size]);

    // 滚动加载
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el;
            if (scrollHeight - scrollTop - clientHeight < 80 && !isFetchingRef.current && hasMore) {
                setPage(p => p + 1);
            }
        };
        el.addEventListener('scroll', onScroll);
        return () => el.removeEventListener('scroll', onScroll);
    }, [hasMore]);

    return (
        <Card hoverable>
            <Flex vertical gap={16}>
                {/* 标题区：大气、简洁、高级 */}
                <Flex justify="space-between" align="center">
                    <Flex align="center" gap={8}>
                        <Title level={5} style={{ margin: 0 }}>收录文章</Title>
                    </Flex>

                    <Tooltip title="订阅 RSS">
                        <Link href={rssAddress} target="_blank" style={{ fontSize: 16 }}>
                            <Rss size={18} color={token.colorPrimary} />
                        </Link>
                    </Tooltip>
                </Flex>

                {/* 滚动列表区域 */}
                <div
                    ref={scrollRef}
                    style={{
                        maxHeight: 580,
                        overflowY: 'auto',
                        paddingRight: 4,
                        scrollbarWidth: 'thin',
                    }}
                >
                    <Flex vertical gap={20}>
                        {groupedPosts.map((yearGroup) => (
                            <Flex vertical gap={10} key={yearGroup.year}>
                                <Space size={2}>  {/* 4px 间距，你可以改成 6 / 8 / 10 随意 */}
                                    <Text
                                        strong
                                        style={{
                                            fontSize: 15,
                                            color: '#000',
                                            borderLeft: '4px solid #1677ff',
                                            paddingLeft: 10,
                                            lineHeight: '16px'
                                        }}
                                    >
                                        {yearGroup.year} 年
                                    </Text>
                                    <Text>（{yearGroup.posts.length} 篇）</Text>
                                </Space>

                                {/* 文章列表 */}
                                <Flex vertical>
                                    {yearGroup.posts.map((post, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                padding: '6px 8px',
                                                borderRadius: 8,
                                                transition: 'all 0.2s',
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = '#f7f8fa'}
                                            onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                        >
                                            <Flex align="center" justify="space-between">
                                                <Text ellipsis style={{ flex: 1, fontSize: 14 }}>
                                                    {blogStatusOk ? (
                                                        <Link
                                                            href={getGoAddress(post.link)}
                                                            target="_blank"
                                                            style={{ color: '#252933' }}
                                                        >
                                                            {post.title}
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={getAbstractAddress(post.link)}
                                                            style={{ color: '#252933' }}
                                                        >
                                                            {post.title}
                                                        </Link>
                                                    )}
                                                </Text>

                                                <Text type="secondary" style={{ fontSize: 12, minWidth: 40, textAlign: 'right' }}>
                                                    {post.publishedAt}
                                                </Text>
                                            </Flex>
                                        </div>
                                    ))}
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>

                    {/* 底部加载状态 */}
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                        {loading ? (
                            <Spin size="small" />
                        ) : hasMore ? (
                            <Text type="secondary" style={{ fontSize: 12 }}>向下滚动加载更多</Text>
                        ) : (
                            <Divider plain style={{ margin: 0 }}>
                                <Text type="secondary" style={{ fontSize: 12 }}>— 已显示全部文章 —</Text>
                            </Divider>
                        )}
                    </div>
                </div>
            </Flex>
        </Card>
    );
}