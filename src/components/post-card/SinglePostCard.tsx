import React, { useState, useEffect, useCallback, useRef } from 'react';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress, getGravatarImageFullURL, getSharingAddress } from '../../utils/PageAddressUtil';
import PostCardFooter from './PostCardFooter';
import {
    Flex,
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

const { Text, Title, Link, Paragraph } = Typography;
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
    blogTotalAccessCount: number;
    blogJoinYears: number;
}

// ==================== 博客卡片组件（响应式优化） ====================
interface BlogCardProps {
    post: BlogPost;
}

const SinglePostCard: React.FC<BlogCardProps> = ({ post }) => {
    const { token } = useToken();
    const [isMobile, setIsMobile] = useState(false);

    const blogURL = getBlogAddress(post.blogDomainName);
    const linkURL = getGoAddress(post.link);
    const abstractURL = getAbstractAddress(post.link);
    const publishedAtFormatted = formatDateStr(post.publishedAt);

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

    return (
        <Flex gap={14} style={{ position: 'relative', width: '100%' }}>
            {/* 左侧：独立的头像区 */}
            <div
                style={{
                    flexShrink: 0,
                    width: 80,
                    textAlign: 'center',
                    paddingTop: token.paddingSM,
                }}
            >
                <Flex vertical align="center" gap={4}>
                    <Link href={blogURL}>
                        <Avatar
                            src={post.blogAdminLargeImageURL}
                            icon={<UserOutlined />}
                            size={48} />
                    </Link>
                    <Link href={blogURL}>
                        {post.blogName}
                    </Link>
                    <Flex vertical gap={4}>
                        <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                            <StarOutlined style={{ marginRight: 4, color: '#faad14' }} />
                            履约 {post.blogJoinYears} 年
                        </Text>
                        <Tooltip title="总浏览数">
                            <Space size={4}>
                                <EyeOutlined style={{ color: token.colorTextSecondary, fontSize: 12 }} />
                                <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                    {post.blogTotalAccessCount}
                                </Text>
                            </Space>
                        </Tooltip>
                    </Flex>
                </Flex>
            </div>

            {/* 右侧：内容区 - 带虚线框和左侧尖角 */}
            <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                {/* 左侧尖角装饰 */}
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

                {/* 主要内容卡片 */}
                <div
                    style={{
                        border: `2px dashed ${token.colorBorder}`,
                        borderRadius: token.borderRadiusLG,
                        padding: `${token.paddingLG}px`,
                        background: token.colorBgContainer,
                        transition: 'all 0.3s ease',
                        width: '100%',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = token.colorPrimary;
                        e.currentTarget.style.boxShadow = token.boxShadowSecondary;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        // 修改尖角颜色
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const triangles = parent.getElementsByTagName('div');
                            if (triangles[0]) {
                                triangles[0].style.borderRightColor = token.colorPrimary;
                            }
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = token.colorBorder;
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            const triangles = parent.getElementsByTagName('div');
                            if (triangles[0]) {
                                triangles[0].style.borderRightColor = token.colorBorder;
                            }
                        }
                    }}
                >
                    {/* 标题区域 */}
                    <div style={{ marginBottom: token.marginSM, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <a
                            href={linkURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}
                        >
                            <Title
                                level={5}
                                style={{
                                    margin: 0,
                                    lineHeight: 1.4,
                                    transition: 'color 0.2s',
                                    cursor: 'pointer',
                                }}
                                ellipsis={{ rows: 2, expandable: false, tooltip: post.title }}
                            >
                                {post.title}
                            </Title>
                        </a>
                    </div>

                    {/* 描述区域 - 完全展开 */}
                    <Paragraph
                        type="secondary"
                        ellipsis={{ rows: 3, expandable: false }}
                        style={{
                            marginBottom: token.marginMD,
                            fontSize: token.fontSize,
                            lineHeight: 1.5,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        {post.description}
                    </Paragraph>

                    {/* 底部信息栏 */}
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
                        <Space size="middle" wrap>
                            <Tooltip title="发布时间">
                                <Space size={4}>
                                    <ClockCircleOutlined style={{ color: token.colorTextSecondary }} />
                                    <Text type="secondary" style={{ fontSize: token.fontSizeSM }}>
                                        {publishedAtFormatted}
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
                            <Link href={abstractURL}>
                                <ShareAltOutlined style={{ color: token.colorTextSecondary }} />
                            </Link>
                            <Dropdown menu={{ items: actionItems }} trigger={['click']} placement="bottomRight">
                                <Button type="text" size="small" icon={<MoreOutlined />} />
                            </Dropdown>
                        </Space>
                    </div>
                </div>
            </div>
        </Flex>
    );
};

export default SinglePostCard;