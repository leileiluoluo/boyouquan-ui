import React from 'react';
import { Flex, Typography } from 'antd';
import { PushpinOutlined } from '@ant-design/icons';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress, getGravatarImageFullURL, getSharingAddress } from '../../utils/PageAddressUtil';
import PostCardFooter from './PostCardFooter';

const { Text, Link, Paragraph } = Typography;

interface PostCardProps {
    showPinned?: boolean;
    pinned?: boolean;
    blogDomainName: string;
    blogName: string;
    blogStatusOk: boolean;
    blogAdminMediumImageURL?: string;
    link: string;
    title: string;
    description?: string;
    publishedAt: string;
    linkAccessCount?: number;
}

export default function PostCard({
    showPinned,
    pinned,
    blogDomainName,
    blogName,
    blogStatusOk,
    blogAdminMediumImageURL,
    link,
    title,
    description,
    publishedAt,
    linkAccessCount
}: PostCardProps): React.JSX.Element {
    const gravatarURL = getGravatarImageFullURL(blogAdminMediumImageURL || '');
    const blogURL = getBlogAddress(blogDomainName);
    const linkURL = getGoAddress(link);
    const abstractURL = getAbstractAddress(link);
    const sharingURL = getSharingAddress(link);
    const publishedAtFormatted = formatDateStr(publishedAt);

    return (
        <Flex vertical gap={4}>
            <Flex gap={4} align="flex-start">
                {showPinned && pinned && (
                    <PushpinOutlined 
                        style={{ 
                            color: '#ff4d4f', 
                            fontSize: 14,
                            marginTop: 2,
                            flexShrink: 0
                        }} 
                    />
                )}
                <Link 
                    href={blogStatusOk ? linkURL : abstractURL}
                    target="_blank"
                    strong
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        wordBreak: 'break-word',
                        flex: 1
                    }}
                >
                    {title}
                </Link>
            </Flex>

            {description && (
                <Paragraph
                    type="secondary"
                    ellipsis={{ rows: 2, expandable: false }}
                    style={{ fontSize: 14, marginBottom: 0 }}
                >
                    {description}
                </Paragraph>
            )}

            <PostCardFooter
                blogURL={blogURL}
                gravatarURL={gravatarURL}
                blogName={blogName}
                publishedAtFormatted={publishedAtFormatted}
                linkAccessCount={linkAccessCount}
                sharingURL={sharingURL} />
        </Flex>
    );
}