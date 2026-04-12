import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    StarOutlined,
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

// 组件内部使用的博客文章数据结构
interface BlogPost {
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

// ==================== 博客卡片组件（响应式优化） ====================
interface BlogCardProps {
    post: BlogPost;
}

const SinglePostCard: React.FC<BlogCardProps> = ({ post }) => {
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
                    width: 80,
                    textAlign: 'center',
                    paddingTop: token.paddingSM,
                }}
            >
                <a href={post.blogAddress} target="_blank" rel="noopener noreferrer">
                    <Avatar
                        src={post.blogAdminLargeImageURL}
                        icon={<UserOutlined />}
                        size={48}
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
                            href={post.blogAddress}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                            <Text strong style={{ fontSize: token.fontSize, display: 'block' }}>
                                {post.blogName}
                            </Text>
                        </a>
                        <Tooltip title="博客状态正常">
                            {/* <Badge
                                status="processing"
                                color="#1f4f07"
                                style={{
                                    backgroundColor: '#256206',
                                    borderRadius: '50%',
                                    width: 14,
                                    height: 14,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <span style={{ fontSize: 9, color: '#090808' }}>✓</span>
                            </Badge> */}
                            <Badge status="success"
                                style={{
                                    width: 14,
                                    height: 14,
                                }} />
                        </Tooltip>
                    </Space>
                </div>
                <div style={{ marginTop: token.marginXS }}>
                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                        <StarOutlined style={{ marginRight: 4, color: '#faad14' }} />
                        履约 2 年
                    </Text>
                    <div style={{ marginTop: 4 }}>
                        <Tooltip title="总浏览次数">
                            <Space size={4}>
                                <EyeOutlined style={{ color: token.colorTextSecondary, fontSize: 12 }} />
                                <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                    10000
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
                        {/* <Tag color="gold" style={{ borderRadius: token.borderRadiusSM, fontWeight: 500 }}>
                            <FireOutlined /> 置顶
                        </Tag> */}
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
                            <Tooltip title="发布时间">
                                <Space size={4}>
                                    <ClockCircleOutlined style={{ color: token.colorTextSecondary }} />
                                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                        {dayjs(post.publishedAt).fromNow()}
                                    </Text>
                                </Space>
                            </Tooltip>

                            <Tooltip title="浏览次数">
                                <Space size={4}>
                                    <EyeOutlined style={{ color: token.colorTextSecondary }} />
                                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                        {post.linkAccessCount}
                                    </Text>
                                </Space>
                            </Tooltip>
                            <Tooltip title="预计阅读时长">
                                <Space size={4}>
                                    <ReadOutlined style={{ color: token.colorTextSecondary }} />
                                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                        1 分钟
                                    </Text>
                                </Space>
                            </Tooltip>
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

export default SinglePostCard;