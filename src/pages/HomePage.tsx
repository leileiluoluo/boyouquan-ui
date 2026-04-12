import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Meta } from '@components/common';
import {
    Avatar,
    Typography,
    Space,
    Tag,
    Button,
    Dropdown,
    MenuProps,
    Divider,
    ConfigProvider,
    theme,
    Badge,
    Tooltip,
    Spin,
    Empty,
    message,
} from 'antd';
import {
    EyeOutlined,
    LikeOutlined,
    ShareAltOutlined,
    MoreOutlined,
    UserOutlined,
    ClockCircleOutlined,
    FireOutlined,
    ReadOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

// 配置dayjs
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const { Text, Title, Paragraph } = Typography;
const { useToken } = theme;

// ==================== 类型定义 ====================
// API 返回的博客文章数据结构
interface ApiBlogPost {
    blogAddress: string;
    blogAdminLargeImageURL: string;
    blogDomainName: string;
    blogName: string;
    blogStatusOk: boolean;
    description: string;
    draft: boolean;
    link: string;
    linkAccessCount: number;
    pinned: boolean;
    publishedAt: string;
    recommended: boolean;
    title: string;
}

// 组件内部使用的博客文章数据结构
interface BlogPost {
    id: string;
    title: string;
    description: string;
    author: {
        name: string;
        avatar: string;
        blogAddress: string;
        isVerified?: boolean;
    };
    publishTime: Date | string;
    viewCount: number;
    likeCount: number;
    coverImage?: string;
    tags?: string[];
    isHot?: boolean;
    isTop?: boolean;
    readingTime?: number;
    link: string;
}

// API 响应结构
interface ApiResponse {
    pageNo: number;
    pageSize: number;
    results: ApiBlogPost[];
    total: number;
}

// ==================== 辅助函数 ====================
// 从描述中提取封面图（如果有图片链接）
const extractCoverImage = (description: string): string | undefined => {
    const imgRegex = /!\[.*?\]\((.*?)\)|\[img\](.*?)\[\/img\]/;
    const match = description.match(imgRegex);
    if (match) {
        return match[1] || match[2];
    }
    return undefined;
};

// 移除描述中的图片标记，保留纯文本
const cleanDescription = (description: string): string => {
    return description
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[img\].*?\[\/img\]/g, '')
        .replace(/\n+/g, ' ')
        .trim();
};

// 估算阅读时间（基于文字数量）
const estimateReadingTime = (description: string): number => {
    const textLength = description.replace(/[\[\(].*?[\]\)]/g, '').length;
    return Math.max(1, Math.ceil(textLength / 300));
};

// 格式化发布时间
const formatPublishTime = (publishedAt: string): Date => {
    const [datePart, timePart] = publishedAt.split(' ');
    const [year, month, day] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
};

// 转换 API 数据为组件数据
const transformApiPost = (apiPost: ApiBlogPost, index: number): BlogPost => {
    const publishDate = formatPublishTime(apiPost.publishedAt);
    const cleanedDesc = cleanDescription(apiPost.description);

    return {
        id: `${apiPost.blogDomainName}-${index}`,
        title: apiPost.title,
        description: cleanedDesc.length > 200 ? cleanedDesc.substring(0, 200) + '...' : cleanedDesc,
        author: {
            name: apiPost.blogName,
            avatar: apiPost.blogAdminLargeImageURL.startsWith('http')
                ? apiPost.blogAdminLargeImageURL
                : `${apiPost.blogAdminLargeImageURL}`,
            blogAddress: apiPost.blogAddress,
            isVerified: apiPost.blogStatusOk,
        },
        publishTime: publishDate,
        viewCount: apiPost.linkAccessCount,
        likeCount: Math.floor(Math.random() * 100) + 10,
        coverImage: extractCoverImage(apiPost.description),
        isTop: apiPost.pinned,
        isHot: apiPost.recommended,
        readingTime: estimateReadingTime(apiPost.description),
        link: apiPost.link,
    };
};

// ==================== 博客卡片组件（响应式优化） ====================
interface BlogCardProps {
    post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    const { token } = useToken();
    const [isMobile, setIsMobile] = useState(false);

    // 检测屏幕宽度
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const actionItems: MenuProps['items'] = [
        {
            key: 'open',
            label: '打开原文',
            onClick: () => window.open(post.link, '_blank'),
        },
        {
            key: 'copy',
            label: '复制链接',
            onClick: () => {
                navigator.clipboard.writeText(post.link);
                message.success('链接已复制');
            },
        },
        {
            key: 'report',
            label: '举报',
            danger: true,
        },
    ];

    const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://api.dicebear.com/7.x/initials/svg?seed=' + post.author.name;
    };

    // 移动端布局
    if (isMobile) {
        return (
            <div
                style={{
                    marginBottom: token.marginLG,
                    position: 'relative',
                }}
            >
                {/* 移动端：头像和基本信息横向排列 */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: token.marginSM,
                        marginBottom: token.marginSM,
                        paddingLeft: token.paddingXS,
                    }}
                >
                    <a href={post.author.blogAddress} target="_blank" rel="noopener noreferrer">
                        <Avatar
                            src={post.author.avatar}
                            icon={<UserOutlined />}
                            size={48}
                            style={{
                                border: `2px solid ${token.colorPrimaryBgHover}`,
                                boxShadow: token.boxShadowTertiary,
                                cursor: 'pointer',
                            }}
                            onError={handleAvatarError}
                        />
                    </a>
                    <div style={{ flex: 1 }}>
                        <Space align="center" wrap size={4}>
                            <a
                                href={post.author.blogAddress}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                <Text strong style={{ fontSize: token.fontSize }}>
                                    {post.author.name}
                                </Text>
                            </a>
                            {post.author.isVerified && (
                                <Tooltip title="博客状态正常">
                                    <Badge
                                        status="processing"
                                        color="#52c41a"
                                        style={{
                                            backgroundColor: '#52c41a',
                                            borderRadius: '50%',
                                            width: 14,
                                            height: 14,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <span style={{ fontSize: 9, color: '#fff' }}>✓</span>
                                    </Badge>
                                </Tooltip>
                            )}
                        </Space>
                        <div style={{ display: 'flex', gap: token.marginSM, marginTop: 4 }}>
                            <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                <ClockCircleOutlined style={{ marginRight: 4 }} />
                                {dayjs(post.publishTime).fromNow()}
                            </Text>
                            <Tooltip title="浏览次数">
                                <Space size={4}>
                                    <EyeOutlined style={{ color: token.colorTextSecondary, fontSize: 12 }} />
                                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                        {post.viewCount.toLocaleString()}
                                    </Text>
                                </Space>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                {/* 移动端：内容区虚线框（无左侧尖角） */}
                <div
                    style={{
                        border: `2px dashed ${token.colorBorder}`,
                        borderRadius: token.borderRadiusLG,
                        padding: `${token.paddingMD}px`,
                        background: token.colorBgContainer,
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = token.colorPrimary;
                        e.currentTarget.style.boxShadow = token.boxShadowSecondary;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = token.colorBorder;
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    {/* 标题行 */}
                    <div style={{ marginBottom: token.marginSM, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        {post.isTop && (
                            <Tag color="gold" size="small" style={{ borderRadius: token.borderRadiusSM, fontWeight: 500, fontSize: 12 }}>
                                <FireOutlined /> 置顶
                            </Tag>
                        )}
                        {post.isHot && !post.isTop && (
                            <Tag color="red" size="small" style={{ borderRadius: token.borderRadiusSM, fontWeight: 500, fontSize: 12 }}>
                                🔥 推荐
                            </Tag>
                        )}
                        <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', flex: 1 }}
                        >
                            <Title
                                level={5}
                                style={{
                                    margin: 0,
                                    lineHeight: 1.4,
                                    fontSize: 16,
                                    color: token.colorTextHeading,
                                    transition: 'color 0.2s',
                                    cursor: 'pointer',
                                }}
                                ellipsis={{ rows: 2, expandable: false }}
                            >
                                {post.title}
                            </Title>
                        </a>
                    </div>

                    {/* 文章描述 */}
                    <Paragraph
                        type="secondary"
                        ellipsis={{ rows: 3, expandable: false }}
                        style={{
                            marginBottom: token.marginSM,
                            fontSize: 13,
                            lineHeight: 1.5,
                        }}
                    >
                        {post.description}
                    </Paragraph>

                    {/* 封面图 */}
                    {post.coverImage && (
                        <div
                            style={{
                                marginBottom: token.marginSM,
                                borderRadius: token.borderRadius,
                                overflow: 'hidden',
                                background: token.colorFillSecondary,
                                maxHeight: 150,
                            }}
                        >
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: 150,
                                    objectFit: 'cover',
                                }}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    {/* 底部操作栏 */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: token.marginXS,
                            marginTop: token.marginSM,
                            paddingTop: token.marginSM,
                            borderTop: `1px solid ${token.colorBorderSecondary}`,
                        }}
                    >
                        <Space size="middle">
                            <Tooltip title="点赞数">
                                <Space size={4}>
                                    <LikeOutlined style={{ color: token.colorTextSecondary, fontSize: 13 }} />
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        {post.likeCount.toLocaleString()}
                                    </Text>
                                </Space>
                            </Tooltip>
                            {post.readingTime && (
                                <Tooltip title="预计阅读时长">
                                    <Space size={4}>
                                        <ReadOutlined style={{ color: token.colorTextSecondary, fontSize: 13 }} />
                                        <Text type="secondary" style={{ fontSize: 12 }}>
                                            {post.readingTime} 分钟
                                        </Text>
                                    </Space>
                                </Tooltip>
                            )}
                        </Space>

                        <Space size="small">
                            <Button
                                type="text"
                                size="small"
                                icon={<ShareAltOutlined />}
                                onClick={() => {
                                    navigator.clipboard.writeText(post.link);
                                    message.success('链接已复制');
                                }}
                                style={{ fontSize: 12 }}
                            >
                                分享
                            </Button>
                            <Dropdown menu={{ items: actionItems }} trigger={['click']} placement="bottomRight">
                                <Button type="text" size="small" icon={<MoreOutlined />} />
                            </Dropdown>
                        </Space>
                    </div>
                </div>
            </div>
        );
    }

    // 桌面端布局（原样式，保留左侧尖角）
    return (
        <div
            style={{
                display: 'flex',
                gap: token.marginMD,
                marginBottom: token.marginXL,
                position: 'relative',
            }}
        >
            {/* 左侧：独立的头像区 */}
            <div
                style={{
                    flexShrink: 0,
                    width: 100,
                    textAlign: 'center',
                    paddingTop: token.paddingSM,
                }}
            >
                <a href={post.author.blogAddress} target="_blank" rel="noopener noreferrer">
                    <Avatar
                        src={post.author.avatar}
                        icon={<UserOutlined />}
                        size={64}
                        style={{
                            marginBottom: token.marginSM,
                            border: `3px solid ${token.colorPrimaryBgHover}`,
                            boxShadow: token.boxShadowTertiary,
                            cursor: 'pointer',
                        }}
                        onError={handleAvatarError}
                    />
                </a>
                <div>
                    <Space align="center" wrap size={4} style={{ justifyContent: 'center' }}>
                        <a
                            href={post.author.blogAddress}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                            <Text strong style={{ fontSize: token.fontSize, display: 'block' }}>
                                {post.author.name}
                            </Text>
                        </a>
                        {post.author.isVerified && (
                            <Tooltip title="博客状态正常">
                                <Badge
                                    status="processing"
                                    color="#52c41a"
                                    style={{
                                        backgroundColor: '#52c41a',
                                        borderRadius: '50%',
                                        width: 14,
                                        height: 14,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span style={{ fontSize: 9, color: '#fff' }}>✓</span>
                                </Badge>
                            </Tooltip>
                        )}
                    </Space>
                </div>
                <div style={{ marginTop: token.marginXS }}>
                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                        <ClockCircleOutlined style={{ marginRight: 4 }} />
                        {dayjs(post.publishTime).fromNow()}
                    </Text>
                    <div style={{ marginTop: 4 }}>
                        <Tooltip title="浏览次数">
                            <Space size={4}>
                                <EyeOutlined style={{ color: token.colorTextSecondary, fontSize: 12 }} />
                                <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                    {post.viewCount.toLocaleString()}
                                </Text>
                            </Space>
                        </Tooltip>
                    </div>
                </div>
            </div>

            {/* 右侧：内容区 - 带虚线框和左侧尖角 */}
            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: -12,
                        top: 32,
                        width: 0,
                        height: 0,
                        borderTop: `12px solid transparent`,
                        borderBottom: `12px solid transparent`,
                        borderRight: `12px dashed ${token.colorBorder}`,
                        zIndex: 2,
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        left: -10,
                        top: 32,
                        width: 0,
                        height: 0,
                        borderTop: `12px solid transparent`,
                        borderBottom: `12px solid transparent`,
                        borderRight: `12px solid ${token.colorBgContainer}`,
                        zIndex: 3,
                    }}
                />

                <div
                    style={{
                        border: `2px dashed ${token.colorBorder}`,
                        borderRadius: token.borderRadiusLG,
                        padding: `${token.paddingLG}px`,
                        background: token.colorBgContainer,
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = token.colorPrimary;
                        e.currentTarget.style.boxShadow = token.boxShadowSecondary;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const triangle = parent.children[0] as HTMLDivElement;
                            if (triangle) {
                                triangle.style.borderRightColor = token.colorPrimary;
                            }
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = token.colorBorder;
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const triangle = parent.children[0] as HTMLDivElement;
                            if (triangle) {
                                triangle.style.borderRightColor = token.colorBorder;
                            }
                        }
                    }}
                >
                    <div style={{ marginBottom: token.marginSM, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        {post.isTop && (
                            <Tag color="gold" style={{ borderRadius: token.borderRadiusSM, fontWeight: 500 }}>
                                <FireOutlined /> 置顶
                            </Tag>
                        )}
                        {post.isHot && !post.isTop && (
                            <Tag color="red" style={{ borderRadius: token.borderRadiusSM, fontWeight: 500 }}>
                                🔥 推荐
                            </Tag>
                        )}
                        <a
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', flex: 1 }}
                        >
                            <Title
                                level={4}
                                style={{
                                    margin: 0,
                                    lineHeight: 1.4,
                                    color: token.colorTextHeading,
                                    transition: 'color 0.2s',
                                    cursor: 'pointer',
                                }}
                                ellipsis={{ rows: 2, expandable: false }}
                            >
                                {post.title}
                            </Title>
                        </a>
                    </div>

                    <Paragraph
                        type="secondary"
                        ellipsis={{ rows: 3, expandable: false }}
                        style={{
                            marginBottom: token.marginMD,
                            fontSize: token.fontSize,
                            lineHeight: 1.5,
                        }}
                    >
                        {post.description}
                    </Paragraph>

                    {post.coverImage && (
                        <div
                            style={{
                                marginBottom: token.marginMD,
                                borderRadius: token.borderRadius,
                                overflow: 'hidden',
                                background: token.colorFillSecondary,
                                maxHeight: 200,
                            }}
                        >
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: 200,
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                }}
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: token.marginXS,
                            marginTop: token.marginSM,
                            paddingTop: token.marginSM,
                            borderTop: `1px solid ${token.colorBorderSecondary}`,
                        }}
                    >
                        <Space size="middle">
                            <Tooltip title="点赞数">
                                <Space size={4}>
                                    <LikeOutlined style={{ color: token.colorTextSecondary }} />
                                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                        {post.likeCount.toLocaleString()}
                                    </Text>
                                </Space>
                            </Tooltip>
                            {post.readingTime && (
                                <Tooltip title="预计阅读时长">
                                    <Space size={4}>
                                        <ReadOutlined style={{ color: token.colorTextSecondary }} />
                                        <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                            {post.readingTime} 分钟
                                        </Text>
                                    </Space>
                                </Tooltip>
                            )}
                        </Space>

                        <Space>
                            <Button
                                type="text"
                                size="small"
                                icon={<ShareAltOutlined />}
                                onClick={() => {
                                    navigator.clipboard.writeText(post.link);
                                    message.success('链接已复制');
                                }}
                            >
                                分享
                            </Button>
                            <Dropdown menu={{ items: actionItems }} trigger={['click']} placement="bottomRight">
                                <Button type="text" size="small" icon={<MoreOutlined />} />
                            </Dropdown>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==================== Feed 流页面主组件（响应式优化） ====================
const HomePage: React.FC = () => {
    const { token } = useToken();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState<'recommended' | 'latest'>('recommended');
    const [isMobile, setIsMobile] = useState(false);
    const loadingRef = useRef(false);

    // 检测屏幕宽度
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const fetchPosts = useCallback(async (pageNum: number, isLoadMore = false) => {
        if (loadingRef.current) return;

        if (isLoadMore) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }
        loadingRef.current = true;

        try {
            const url = `/api/posts?sort=${sort}&keyword=${encodeURIComponent(keyword)}&page=${pageNum}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse = await response.json();

            const newPosts = data.results.map((apiPost, idx) =>
                transformApiPost(apiPost, (pageNum - 1) * data.pageSize + idx)
            );

            if (isLoadMore) {
                setPosts(prev => [...prev, ...newPosts]);
            } else {
                setPosts(newPosts);
            }

            setTotal(data.total);
            setPage(pageNum);
            setHasMore(pageNum * data.pageSize < data.total);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            message.error('加载文章失败，请稍后重试');
        } finally {
            if (isLoadMore) {
                setLoadingMore(false);
            } else {
                setLoading(false);
            }
            loadingRef.current = false;
        }
    }, [sort, keyword]);

    useEffect(() => {
        setPage(1);
        setPosts([]);
        fetchPosts(1, false);
    }, [sort, keyword, fetchPosts]);

    const loadMore = () => {
        if (!hasMore || loadingMore || loading) return;
        fetchPosts(page + 1, true);
    };

    const handleSortChange = (newSort: 'recommended' | 'latest') => {
        setSort(newSort);
    };

    // 响应式容器最大宽度
    const containerMaxWidth = isMobile ? '100%' : 1000;
    const headerFontSize = isMobile ? 32 : 42;
    const headerPadding = isMobile ? `${token.paddingLG}px ${token.paddingMD}px` : `${token.paddingXL}px ${token.paddingLG}px`;

    return (
        <>
            <Meta />

            <ConfigProvider
                theme={{
                    algorithm: theme.defaultAlgorithm,
                    token: {
                        colorPrimary: '#1677ff',
                        borderRadius: 12,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    },
                }}
            >
                <div
                    style={{
                        minHeight: '100vh',
                        background: `linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)`,
                        padding: headerPadding,
                    }}
                >
                    <div style={{ maxWidth: containerMaxWidth, margin: '0 auto' }}>
                        {/* 页面头部 */}
                        <div style={{ marginBottom: isMobile ? token.marginLG : token.marginXL, textAlign: 'center' }}>
                            <Title
                                level={1}
                                style={{
                                    marginBottom: token.marginSM,
                                    fontSize: headerFontSize,
                                    background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryActive} 100%)`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                博客文章精选
                            </Title>
                            <Text type="secondary" style={{ fontSize: isMobile ? token.fontSize : token.fontSizeLG }}>
                                发现优质博友动态，就来博友圈！
                            </Text>

                            {/* 筛选栏 - 移动端横向滚动优化 */}
                            <div style={{ 
                                marginTop: token.marginLG, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: token.marginMD,
                                flexWrap: 'wrap',
                            }}>
                                <Button
                                    type={sort === 'recommended' ? 'primary' : 'default'}
                                    onClick={() => handleSortChange('recommended')}
                                    style={{ borderRadius: token.borderRadiusLG }}
                                    size={isMobile ? 'middle' : 'large'}
                                >
                                    推荐排序
                                </Button>
                                <Button
                                    type={sort === 'latest' ? 'primary' : 'default'}
                                    onClick={() => handleSortChange('latest')}
                                    style={{ borderRadius: token.borderRadiusLG }}
                                    size={isMobile ? 'middle' : 'large'}
                                >
                                    最新发布
                                </Button>
                            </div>

                            <Divider
                                style={{
                                    marginTop: token.marginLG,
                                    marginBottom: token.marginLG,
                                    borderColor: token.colorBorderSecondary,
                                }}
                            />

                            {!loading && posts.length > 0 && (
                                <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                    共 {total.toLocaleString()} 篇文章
                                </Text>
                            )}
                        </div>

                        {/* Feed 列表 */}
                        <Spin
                            spinning={loading}
                            indicator={<LoadingOutlined style={{ fontSize: isMobile ? 32 : 48 }} spin />}
                            tip="加载中..."
                        >
                            {!loading && posts.length === 0 ? (
                                <Empty
                                    description="暂无文章"
                                    style={{ padding: token.paddingXL }}
                                />
                            ) : (
                                <>
                                    {posts.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}

                                    {loadingMore && (
                                        <div style={{ textAlign: 'center', padding: token.paddingLG }}>
                                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                                            <Text type="secondary" style={{ display: 'block', marginTop: token.marginSM }}>
                                                加载更多...
                                            </Text>
                                        </div>
                                    )}

                                    {!hasMore && posts.length > 0 && (
                                        <div style={{ textAlign: 'center', padding: token.paddingLG }}>
                                            <Text type="secondary">✨ 已经到底了 ✨</Text>
                                        </div>
                                    )}

                                    {hasMore && !loadingMore && !loading && posts.length > 0 && (
                                        <div style={{ textAlign: 'center', marginTop: token.marginXL }}>
                                            <Button
                                                type="default"
                                                size={isMobile ? 'middle' : 'large'}
                                                onClick={loadMore}
                                                style={{
                                                    borderRadius: token.borderRadiusLG,
                                                    paddingLeft: token.paddingLG,
                                                    paddingRight: token.paddingLG,
                                                }}
                                            >
                                                加载更多
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </Spin>
                    </div>
                </div>
            </ConfigProvider>
        </>
    );
};

export default HomePage;