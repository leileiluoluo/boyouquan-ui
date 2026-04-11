import React from 'react';
import { Flex, Typography, Space, Avatar } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import LazyAvatar from '../common/avatar/LazyAvatar';

const { Text, Link } = Typography;

interface PostCardFooterProps {
    blogURL: string;
    gravatarURL: string;
    blogName: string;
    publishedAtFormatted: string;
    linkAccessCount?: number;
    sharingURL: string;
}

export default function PostCardFooter({ 
    blogURL, 
    gravatarURL, 
    blogName, 
    publishedAtFormatted, 
    linkAccessCount, 
    sharingURL 
}: PostCardFooterProps): React.JSX.Element {
    return (
        <Flex gap={4} align="center" wrap="wrap">
            <Link href={blogURL}>
                <LazyAvatar
                    style={{ width: 20, height: 20 }}
                    src={gravatarURL}
                    shape="circle"
                />
            </Link>

            <Link 
                href={blogURL}
                style={{
                    fontSize: 14,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}
            >
                {blogName}
            </Link>

            <Text type="secondary">·</Text>

            <Text 
                type="secondary"
                style={{
                    fontSize: 14,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}
            >
                {publishedAtFormatted}
            </Text>

            <Text type="secondary">·</Text>

            <Text 
                type="secondary"
                style={{
                    fontSize: 14,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}
            >
                {linkAccessCount} 次浏览
            </Text>

            <Text type="secondary">·</Text>

            <Link 
                href={sharingURL} 
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 14, display: 'inline-flex', alignItems: 'center' }}
            >
                <LinkOutlined />
            </Link>
        </Flex>
    );
}