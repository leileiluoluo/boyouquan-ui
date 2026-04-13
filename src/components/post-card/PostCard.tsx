import React from 'react';
import { theme, Flex, Typography, Avatar, Space, Divider, Tooltip } from 'antd';
import { ClockCircleOutlined, EyeOutlined, MoreOutlined, ShareAltOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress, getGravatarImageFullURL, getSharingAddress } from '../../utils/PageAddressUtil';
import { PostData } from '@types/post';
import { MobileOnly, PCOnly } from '@components/common/Responsive';

const { Title, Link, Text, Paragraph } = Typography;
const { useToken } = theme;

interface PostDataProps {
    showPinned: boolean;
    post: PostData;
}

const PostCard: React.FC<PostDataProps> = ({ showPinned, post }) => {
    const gravatarURL = getGravatarImageFullURL(post.blogAdminLargeImageURL || '');
    const blogURL = getBlogAddress(post.blogDomainName);
    const linkURL = getGoAddress(post.link);
    const abstractURL = getAbstractAddress(post.link);
    const sharingURL = getSharingAddress(post.link);
    const publishedAtFormatted = formatDateStr(post.publishedAt);

    const { token } = useToken();
    const LEFT_BAR_WIDTH = 100;
    const ARROW_SIZE = 10;
    const CARD_PADDING_VERTICAL = 20;

    return (
        <Flex
            gap={ARROW_SIZE}
            align="flex-start"
            style={{
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                // 仅PC端保留箭头内边距，移动端移除
                paddingLeft: window.innerWidth > 768 ? ARROW_SIZE : 0
            }}
        >
            {/* 左侧用户头像区（仅PC端） */}
            <PCOnly>
                <Flex
                    vertical
                    align="center"
                    gap={8}
                    style={{
                        width: LEFT_BAR_WIDTH,
                        flexShrink: 0,
                        paddingTop: CARD_PADDING_VERTICAL,
                        zIndex: 1
                    }}
                >
                    <Flex vertical align="center" gap={4}>
                        <Link href={blogURL}>
                            <Avatar shape="square" size={40} icon={<UserOutlined />} src={post.blogAdminLargeImageURL} alt={post.blogName} />
                        </Link>
                        <Link href={blogURL}>
                            <Text
                                ellipsis
                                style={{
                                    display: 'block',
                                    maxWidth: LEFT_BAR_WIDTH - 8,
                                    textAlign: 'center'
                                }}>
                                {post.blogName}
                            </Text>
                        </Link>
                    </Flex>
                    <Flex vertical gap={4} align="center">
                        <Tooltip title="履约年数" styles={{ root: { fontSize: 12 } }}>
                            <Space align="center">
                                <StarOutlined style={{ color: '#faad14' }} />
                                <Text type="secondary" style={{ fontSize: 12 }}>履约 {post.blogJoinYears} 年</Text>
                            </Space>
                        </Tooltip>
                        <Tooltip title="总浏览数" styles={{ root: { fontSize: 12 } }}>
                            <Space size={4} align="center">
                                <EyeOutlined />
                                <Text type="secondary" style={{ fontSize: 12 }}>{post.blogTotalAccessCount}</Text>
                            </Space>
                        </Tooltip>
                    </Flex>
                </Flex>
            </PCOnly>

            {/* 右侧内容区 */}
            <Flex
                vertical
                flex={1}
                style={{
                    position: 'relative',
                    zIndex: 2,
                    minWidth: 0,
                }}
            >
                <div
                    style={{
                        padding: '20px 24px',
                        border: `1px solid ${token.colorBorder}`,
                        borderRadius: 12,
                        backgroundColor: token.colorBgContainer,
                        width: '100%',
                        boxSizing: 'border-box',
                        overflow: 'hidden'
                    }}
                >
                    <Flex vertical gap={8} style={{ width: '100%' }}>
                        <Link href={linkURL}>
                            <Title
                                level={5}
                                style={{
                                    margin: 0,
                                    color: token.colorPrimary,
                                    wordBreak: 'break-word',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {post.title}
                            </Title>
                        </Link>

                        <Paragraph
                            ellipsis={{ rows: 3 }}
                            style={{
                                lineHeight: 1.7,
                                color: token.colorTextTertiary,
                                margin: 0,
                                width: '100%',
                                wordBreak: 'break-word',
                                overflow: 'hidden'
                            }}>
                            {post.description}
                        </Paragraph>

                        <Divider style={{ margin: '8px 0' }} />

                        {/* 底部操作栏：核心修复，支持移动端换行 */}
                        <Flex
                            justify="space-between"
                            align="center"
                            style={{
                                width: '100%',
                                flexWrap: 'nowrap',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            {/* 左侧：优先显示博客名，剩下的自动 ... 省略 */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                flex: 1,
                                minWidth: 0,
                                overflow: 'hidden',
                            }}>
                                <MobileOnly>
                                    <div style={{
                                        flexShrink: 0,  /* 优先显示，不压缩 */
                                    }}>
                                        <Link href={blogURL}>
                                            <Text style={{ fontSize: 14, fontWeight: 500 }}>
                                                {post.blogName}
                                            </Text>
                                        </Link>
                                    </div>
                                </MobileOnly>

                                {/* 剩下的内容：显示不下自动 ... */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    <Tooltip title="发布时间" styles={{ root: { fontSize: 12 } }}>
                                        <Space size={4} align="center">
                                            <ClockCircleOutlined />
                                            <Text type="secondary" style={{ fontSize: 12 }}>{publishedAtFormatted}</Text>
                                        </Space>
                                    </Tooltip>

                                    <Tooltip title="浏览数" styles={{ root: { fontSize: 12 } }}>
                                        <Space size={4} align="center">
                                            <EyeOutlined />
                                            <Text type="secondary" style={{ fontSize: 12 }}>{post.linkAccessCount}</Text>
                                        </Space>
                                    </Tooltip>
                                </div>
                            </div>

                            {/* 右侧：固定不压缩，永远完整显示 */}
                            <Space size={16} align="center" style={{ flexShrink: 0, marginLeft: 8 }}>
                                <Link href={abstractURL}>
                                    <ShareAltOutlined />
                                </Link>
                                <MoreOutlined />
                            </Space>
                        </Flex>
                    </Flex>
                </div>

                <PCOnly>
                    <div
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: -ARROW_SIZE,
                            width: 0,
                            height: 0,
                            borderTop: `${ARROW_SIZE}px solid transparent`,
                            borderBottom: `${ARROW_SIZE}px solid transparent`,
                            borderRight: `${ARROW_SIZE}px solid ${token.colorBorder}`,
                            zIndex: 3
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 40,
                            left: -ARROW_SIZE + 1,
                            width: 0,
                            height: 0,
                            borderTop: `${ARROW_SIZE}px solid transparent`,
                            borderBottom: `${ARROW_SIZE}px solid transparent`,
                            borderRight: `${ARROW_SIZE}px solid ${token.colorBgContainer}`,
                            zIndex: 4
                        }}
                    />
                </PCOnly>
            </Flex>
        </Flex>
    );
}

export default PostCard;