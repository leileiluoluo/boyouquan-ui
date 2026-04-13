import React from 'react';
import { theme, Flex, Typography, Avatar, Space, Card, Divider, Tooltip } from 'antd';
import { ClockCircleOutlined, EyeOutlined, MoreOutlined, PushpinOutlined, ShareAltOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress, getGravatarImageFullURL, getSharingAddress } from '../../utils/PageAddressUtil';
import PostCardFooter from './PostCardFooter';
import { PostData } from '@types/post';

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

    return (
        <Flex gap={8}>
            {/* 左侧用户栏 */}
            <Flex vertical align="center" gap={8} style={{ width: 100 }}>
                <Flex vertical align="center" gap={4} style={{ marginTop: 20 }}>
                    <Link href={blogURL}>
                        <Avatar shape="square" size={40} icon={<UserOutlined />} src={post.blogAdminLargeImageURL} />
                    </Link>
                    <Link href={blogURL}>
                        <Text
                            ellipsis
                            style={{
                                display: 'block',
                            }}>
                            {post.blogName}
                        </Text>
                    </Link>
                </Flex>
                <Flex vertical gap={4}>
                    <Tooltip title="履约年数"
                        styles={{
                            root: { fontSize: 12 }
                        }}>
                        <Space>
                            <StarOutlined style={{ color: '#faad14' }} />
                            <Text type="secondary" style={{ fontSize: 12 }}>履约 {post.blogJoinYears} 年</Text>
                        </Space>
                    </Tooltip>

                    <Tooltip title="总浏览数"
                        styles={{
                            root: { fontSize: 12 }
                        }}>
                        <Space size={4}>
                            <EyeOutlined />
                            <Text type="secondary" style={{ fontSize: 12 }}>{post.blogTotalAccessCount}</Text>
                        </Space>
                    </Tooltip>
                </Flex>
            </Flex>

            {/* 右侧内容区 */}
            <Flex vertical flex={1} style={{ position: 'relative' }}>
                <div
                    style={{
                        padding: '20px 24px',
                        border: `1px solid ${token.colorBorder}`,
                        borderRadius: 12,
                        backgroundColor: token.colorBgContainer,
                    }}
                >
                    <Flex vertical gap={8}>
                        <Link href={linkURL}>
                            <Title level={5} style={{ margin: 0, color: token.colorPrimary }}>
                                {post.title}
                            </Title>
                        </Link>

                        {/* 内容 */}
                        <Paragraph
                            ellipsis={{ rows: 3 }}
                            style={{
                                lineHeight: 1.7,
                                color: token.colorTextTertiary,
                                margin: 0,
                            }}>
                            {post.description}
                        </Paragraph>

                        <Divider style={{ margin: 0 }} />

                        <Flex
                            justify="space-between"
                            align="center"
                            style={{
                                flexWrap: 'nowrap',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            <Space size={16} style={{ flexShrink: 0 }}>
                                <Tooltip title="发布时间"
                                    styles={{
                                        root: { fontSize: 12 }
                                    }}>
                                    <Space size={4}>
                                        <ClockCircleOutlined />
                                        <Text type="secondary" style={{ fontSize: 12 }}>{publishedAtFormatted}</Text>
                                    </Space>
                                </Tooltip>

                                <Tooltip title="浏览数"
                                    styles={{
                                        root: { fontSize: 12 }
                                    }}>
                                    <Space size={4}>
                                        <EyeOutlined />
                                        <Text type="secondary" style={{ fontSize: 12 }}>{post.linkAccessCount}</Text>
                                    </Space>
                                </Tooltip>
                            </Space>

                            <Space size={16} style={{ flexShrink: 0 }}>
                                <Link href={abstractURL}>
                                    <ShareAltOutlined />
                                </Link>
                                <MoreOutlined />
                            </Space>
                        </Flex>
                    </Flex>

                </div>
                <div style={{ position: 'absolute', top: 40, left: -10, width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: `10px solid ${token.colorBorder}` }} />
                <div style={{ position: 'absolute', top: 40, left: -9, width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: `10px solid ${token.colorBgContainer}` }} />
            </Flex>
        </Flex >
    );
}

export default PostCard;