import React from 'react';
import { message, theme, Flex, Typography, Space, Divider, Tooltip, Alert } from 'antd';
import { PushpinOutlined, ClockCircleOutlined, EyeOutlined, MoreOutlined, ShareAltOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress, getGravatarImageFullURL, getSharingAddress } from '../../utils/PageAddressUtil';
import { PostData } from '@types/post';
import { MobileOnly, PCOnly } from '@components/common/Responsive';
// 👇 引入懒加载 Avatar
import LazyAvatar from '@components/common/LazyAvatar';

const { Title, Link, Text, Paragraph } = Typography;
const { useToken } = theme;

interface PostDataProps {
    showPinned: boolean;
    post: PostData;
    descriptionRows: number;
}

const AbstractCard: React.FC<PostDataProps> = ({ showPinned, post, descriptionRows }) => {
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

    const alertMessage = `博客「${post.blogName}」可能暂时无法访问，如下是文章的摘要信息`;

    return (
        <Flex vertical gap={12}>
            {
                !post.blogStatusOk &&
                <Alert
                    // message="警告信息"
                    description={alertMessage}
                    type="warning"
                    style={{
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center', // 核心对齐
                        padding: '6px 12px',
                    }}
                    styles={{
                        icon: { fontSize: '12px' } // 直接控制图标大小，稳定生效
                    }}
                    showIcon
                />
            }

            <Flex
                gap={ARROW_SIZE}
                align="flex-start"
                style={{
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
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
                                {/* 👇 替换成懒加载 */}
                                <LazyAvatar
                                    shape="circle"
                                    size={36}
                                    icon={<UserOutlined />}
                                    src={gravatarURL}
                                    alt={post.blogName}
                                    style={{ border: '1px solid #e5e7eb', boxSizing: 'border-box' }}
                                />
                            </Link>
                            <Link
                                ellipsis
                                style={{
                                    display: 'block',
                                    maxWidth: LEFT_BAR_WIDTH - 8,
                                    textAlign: 'center',
                                    fontWeight: token.fontWeightStrong,
                                }}
                                href={blogURL}>
                                <Text>{post.blogName}</Text>
                            </Link>
                        </Flex>
                        <Flex vertical gap={4} align="center">
                            {null !== post.blogJoinYears && <Tooltip title="履约年数" styles={{ root: { fontSize: 12 } }}>
                                <Space size={4} align="center">
                                    <StarOutlined style={{ color: token.colorPrimary }} />
                                    <Text type="secondary" style={{ fontSize: 12 }}>履约 {post.blogJoinYears} 年</Text>
                                </Space>
                            </Tooltip>}

                            {null !== post.blogTotalAccessCount && <Tooltip title="总浏览数" styles={{ root: { fontSize: 12 } }}>
                                <Space size={4} align="center">
                                    <EyeOutlined style={{ color: token.colorPrimary }} />
                                    <Text type="secondary" style={{ fontSize: 12 }}>{post.blogTotalAccessCount}</Text>
                                </Space>
                            </Tooltip>}
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
                            padding: '16px 20px',
                            border: `1px solid ${token.colorBorder}`,
                            borderRadius: 12,
                            backgroundColor: token.colorBgContainer,
                            width: '100%',
                            boxSizing: 'border-box',
                            overflow: 'hidden'
                        }}
                    >
                        <Flex vertical gap={4} style={{ width: '100%' }}>
                            <Link
                                href={linkURL}
                                target="_blank"
                                style={{
                                    marginBottom: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4
                                }}>
                                {showPinned && post.pinned && (
                                    <PushpinOutlined
                                        style={{
                                            color: token.colorPrimary,
                                            fontSize: 16,
                                            flexShrink: 0
                                        }}
                                    />
                                )}

                                <Title
                                    level={5}
                                    style={{
                                        margin: 0,
                                        wordBreak: 'break-word',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        flex: 1
                                    }}
                                >
                                    {post.title}
                                </Title>
                            </Link>

                            <Paragraph
                                ellipsis={{ rows: descriptionRows }}
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

                            <Divider dashed style={{ margin: '2px 0' }} />

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
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    flex: 1,
                                    minWidth: 0,
                                    overflow: 'hidden',
                                }}>
                                    <MobileOnly>
                                        <Flex gap={6}>
                                            <Link href={blogURL}>
                                                {/* 👇 移动端头像也替换成懒加载 */}
                                                <LazyAvatar
                                                    shape="circle"
                                                    size={20}
                                                    icon={<UserOutlined />}
                                                    src={post.blogAdminMediumImageURL}
                                                    alt={post.blogName}
                                                    style={{ border: '1px solid #e5e7eb', boxSizing: 'border-box' }}
                                                />
                                            </Link>

                                            <Link
                                                href={blogURL}
                                                ellipsis
                                                style={{
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    fontWeight: token.fontWeightStrong,
                                                }}
                                            >
                                                <Text>{post.blogName}</Text>
                                            </Link>
                                        </Flex>
                                    </MobileOnly>

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

                                <Space size={8} align="center" style={{ flexShrink: 0, marginLeft: 8 }}>
                                    <Link href={abstractURL}>
                                        <ShareAltOutlined style={{ color: token.colorText }} />
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
        </Flex>
    );
};

export default AbstractCard;