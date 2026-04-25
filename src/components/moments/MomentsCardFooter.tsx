import React, { useState } from 'react';
import { theme, Flex, Typography, Avatar, message, Tooltip, Space } from 'antd';
import { ClockCircleOutlined, EyeOutlined, HeartFilled, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { getBlogAddress } from '../../utils/PageAddressUtil';
import { formatDateStr } from '../../utils/DateUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import LazyAvatar from '../common/avatar/LazyAvatar';

const { Text, Link } = Typography;

const { useToken } = theme;

export default function MomentsCardFooter({ moment }) {
    const [animate, setAnimate] = useState(false);
    const [likeCount, setLikeCount] = useState(() => moment.likeCount);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    const { token } = useToken();

    const blogURL = getBlogAddress(moment.blogDomainName);
    const createdAtFormatted = formatDateStr(moment.createdAt);

    const addLikes = async (id: number) => {
        setLoading(true);
        const data = { type: 'MOMENTS', entityId: id };
        const resp = await RequestUtil.post('/api/likes', JSON.stringify(data), {
            'Content-Type': 'application/json'
        });

        if (resp.status !== 201) {
            const respBody = await resp.json();
            message.error(respBody.message || '点赞失败');
        }
        setLoading(false);
    };

    const handleIconClick = (id: number) => {
        if (!liked && !loading) {
            setLiked(true);
            setLikeCount(likeCount + 1);
            addLikes(id);

            setAnimate(true);
            setTimeout(() => setAnimate(false), 300);
        }
    };

    return (
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
                <Flex gap={6}>
                    <Link href={blogURL}>
                        <Avatar
                            shape="circle"
                            size={20}
                            icon={<UserOutlined />}
                            src={moment.blogInfo.blogAdminMediumImageURL}
                            alt={moment.blogInfo.blogName}
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
                        <Text>{moment.blogInfo.name}</Text>
                    </Link>
                </Flex>

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
                            <Text type="secondary" style={{ fontSize: 12 }}>{createdAtFormatted}</Text>
                        </Space>
                    </Tooltip>
                </div>
            </Flex>

            {/* 右侧：固定不压缩，永远完整显示 */}
            {/* 点赞区域 */}
            <Flex gap={0} align="center" style={{ flexShrink: 0 }}>
                <style>
                    {`
                    @keyframes like-animation {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.4); }
                        100% { transform: scale(1); }
                    }
                    .animate-like {
                        animation: like-animation 0.3s ease-in-out;
                    }
                    `}
                </style>
                {liked ? (
                    <HeartFilled
                        className={animate ? 'animate-like' : ''}
                        style={{
                            color: '#ff4d4f',
                            fontSize: 16,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onClick={() => handleIconClick(moment.id)}
                    />
                ) : (
                    <HeartOutlined
                        className={animate ? 'animate-like' : ''}
                        style={{
                            color: '#ff4d4f',
                            fontSize: 16,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onClick={() => handleIconClick(moment.id)}
                    />
                )}
                <Text
                    type="secondary"
                    style={{
                        fontSize: 12,
                        minWidth: '16px',
                        textAlign: 'center'
                    }}
                >
                    {likeCount}
                </Text>
            </Flex>
        </Flex>
    );
}