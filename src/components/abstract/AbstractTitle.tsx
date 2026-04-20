import React from 'react';
import { Typography } from 'antd';
import { getGoAddress } from '@utils/PageAddressUtil';

const { Text, Link } = Typography;

interface AbstractTitleProps {
    isSharingPage?: boolean;
    title: string;
    link: string;
}

export default function AbstractTitle({ isSharingPage, title, link }: AbstractTitleProps) {
    const gotoLink = getGoAddress(link);
    
    return (
        <div>
            {isSharingPage ? (
                <Text strong style={{ fontSize: 16 }}>
                    发现一篇有趣的文章：「<Link href={gotoLink}>{title}</Link>」
                </Text>
            ) : (
                <Text strong style={{ fontSize: 16 }}>
                    文章摘要：「<Link href={gotoLink}>{title}</Link>」
                </Text>
            )}
        </div>
    );
}