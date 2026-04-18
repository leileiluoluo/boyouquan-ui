import React from 'react';
import { theme, Flex, Typography, Avatar, Space, Divider, Tooltip } from 'antd';
import { PushpinOutlined, ClockCircleOutlined, EyeOutlined, MoreOutlined, ShareAltOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { getAbstractAddress, getBlogAddress, getGoAddress } from '../../utils/PageAddressUtil';
import LazyImg from '../common/img/LazyImg';
import { formatDateStr } from '@utils/DateUtil';

const { Title, Link, Text, Paragraph } = Typography;
const { useToken } = theme;

export default function MonthlySelectedCard({ postInfo, showImage }) {
    const blogURL = getBlogAddress(postInfo.blogDomainName);
    const linkURL = getGoAddress(postInfo.link);
    const abstractURL = getAbstractAddress(postInfo.link);
    const publishedAtFormatted = formatDateStr(postInfo.publishedAt, true);

    const { token } = useToken();

    return (
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
                            {postInfo.title}
                        </Title>
                    </Link>

                    <Paragraph
                        ellipsis={{ rows: 2 }}
                        style={{
                            lineHeight: 1.7,
                            color: token.colorTextTertiary,
                            margin: 0,
                            width: '100%',
                            wordBreak: 'break-word',
                            overflow: 'hidden'
                        }}>
                        {postInfo.description}
                    </Paragraph>

                    <Divider dashed style={{ margin: '2px 0' }} />

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
                        <Flex gap={12}>
                            <Link href={blogURL}>
                                <Avatar
                                    shape="circle"
                                    size={20}
                                    icon={<UserOutlined />}
                                    src={postInfo.blogAdminMediumImageURL}
                                    alt={postInfo.blogName}
                                    style={{ border: '1px solid #e5e7eb', boxSizing: 'border-box' }}
                                />
                            </Link>

                            <div style={{
                                flexShrink: 0,  /* 优先显示，不压缩 */
                            }}>
                                <Link
                                    href={blogURL}
                                    ellipsis
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        fontWeight: token.fontWeightStrong,
                                    }}
                                >
                                    {postInfo.blogName}
                                </Link>
                            </div>

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
                                        <Text type="secondary" style={{ fontSize: 12 }}>{postInfo.linkAccessCount}</Text>
                                    </Space>
                                </Tooltip>
                            </div>
                        </Flex>

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
        </Flex>
    );
}