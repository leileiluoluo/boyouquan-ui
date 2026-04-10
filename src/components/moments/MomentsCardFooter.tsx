import React, { useState } from 'react';
import { Flex, Typography, Avatar, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { getBlogAddress } from '../../utils/PageAddressUtil';
import { formatDateStr } from '../../utils/DateUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import LazyAvatar from '../common/avatar/LazyAvatar';

const { Text, Link } = Typography;

export default function MomentsCardFooter({ moment }) {
    const [animate, setAnimate] = useState(false);
    const [likeCount, setLikeCount] = useState(() => moment.likeCount);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    
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
        <Flex gap={8} align="center" wrap="wrap">
            {/* 博客头像 */}
            <Link href={blogURL} target="_blank">
                <LazyAvatar
                    size={20}
                    src={moment.blogInfo.blogAdminMediumImageURL}
                    style={{ flexShrink: 0 }}
                />
            </Link>

            {/* 博客名称 */}
            <Link
                href={blogURL}
                target="_blank"
                strong
                style={{
                    fontSize: 12,
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}
            >
                {moment.blogInfo.name}
            </Link>

            <Text type="secondary" style={{ fontSize: 12 }}>·</Text>

            {/* 发布时间 */}
            <Text
                type="secondary"
                style={{
                    fontSize: 12,
                    maxWidth: '100px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}
            >
                {createdAtFormatted}
            </Text>

            <Text type="secondary" style={{ fontSize: 12 }}>·</Text>

            {/* 点赞区域 */}
            <Flex gap={4} align="center">
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
                        minWidth: '24px',
                        textAlign: 'center'
                    }}
                >
                    {likeCount}
                </Text>
            </Flex>
        </Flex>
    );
}