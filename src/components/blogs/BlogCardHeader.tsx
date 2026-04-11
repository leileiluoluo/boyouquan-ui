import React from 'react';
import { Flex, Typography, Avatar } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { getBlogAddress, getGoAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';
import LazyAvatar from '../common/avatar/LazyAvatar';

const { Link, Text } = Typography;

export default function BlogCardHeader({ name, domainName, address, blogAdminLargeImageURL, nameSize }) {
    const blogAddress = getBlogAddress(domainName);
    const gravatarURL = getGravatarImageFullURL(blogAdminLargeImageURL);
    const blogGoURL = getGoAddress(address);

    // 根据 nameSize 映射字体大小
    const getFontSize = (size) => {
        const sizeMap = {
            '1': 12,
            '2': 14,
            '3': 16,
            '4': 18,
            '5': 20,
            '6': 24
        };
        return sizeMap[size] || 16;
    };

    return (
        <Flex gap={8} align="center">
            <Link href={blogAddress}>
                <LazyAvatar
                    style={{ width: 36, height: 36 }}
                    src={gravatarURL}
                    shape="circle"
                />
            </Link>

            <Flex vertical>
                <Link 
                    href={blogAddress}
                    strong
                    style={{ fontSize: getFontSize(nameSize) }}
                >
                    {name}
                </Link>
                <Flex gap={4} align="center">
                    <Link 
                        target="_blank" 
                        href={blogGoURL}
                        style={{ fontSize: 12 }}
                    >
                        {domainName}
                    </Link>
                    <Link 
                        href={blogGoURL}
                        target="_blank"
                        style={{ fontSize: 12, display: 'inline-flex', alignItems: 'center' }}
                    >
                        <LinkOutlined style={{ fontSize: 12 }} />
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    );
}