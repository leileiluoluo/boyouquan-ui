import React from 'react';
import { getGoAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';
import { formatDateStr, formatDomainNameRegistrationDateStr } from '../../utils/DateUtil';
import { Flex, Typography, Avatar, Tooltip, Image } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, LinkOutlined } from '@ant-design/icons';
import BlogCardFooter from '../blogs/BlogCardFooter';
import { useEffect } from 'react';
import { setBackgroundFromAvatar } from '../../utils/CssUtil';

const { Text, Link } = Typography;

export default function BlogDetailMain({ 
    name, 
    domainName, 
    address, 
    description, 
    statusOk, 
    submittedInfo, 
    submittedInfoTip, 
    statusUnOkInfo, 
    blogAdminLargeImageURL, 
    domainNameRegisteredAt, 
    blogServerLocation 
}) {
    const blogGoAddress = getGoAddress(address);
    const gravatarURL = getGravatarImageFullURL(blogAdminLargeImageURL);
    const domainNameRegisteredAtStdStr = formatDateStr(domainNameRegisteredAt, true);
    const domainNameRegisteredDateStr = null !== domainNameRegisteredAt ? formatDomainNameRegistrationDateStr(domainNameRegisteredAt) : '';

    useEffect(() => {
        setBackgroundFromAvatar('blog-detail-domain', gravatarURL);
    }, []);

    return (
        <div 
            id="blog-detail-domain" 
            style={{
                background: 'url(/assets/images/sites/blog_detail/blog-detail-header-background.jpeg)',
                padding: 16,
                borderRadius: 6
            }}
        >
            <Flex vertical gap={4}>
                <BlogCardFooter
                    statusOk={statusOk}
                    submittedInfo={submittedInfo}
                    submittedInfoTip={submittedInfoTip} />

                <Flex vertical align="center">
                    <Link href={blogGoAddress} target="_blank">
                        <Avatar
                            size={60}
                            src={gravatarURL}
                            shape="circle"
                        />
                    </Link>

                    <div style={{ marginTop: 8 }}>
                        <Link href={blogGoAddress} target="_blank" strong>
                            {name}
                        </Link>
                    </div>

                    <div>
                        <Flex gap={4} align="center">
                            <Link href={blogGoAddress} target="_blank" style={{ fontSize: 12 }}>
                                {domainName}
                            </Link>
                            <Link href={blogGoAddress} target="_blank">
                                <LinkOutlined style={{ fontSize: 12 }} />
                            </Link>
                        </Flex>
                    </div>

                    <div style={{ 
                        marginTop: 8, 
                        marginBottom: 2, 
                        backgroundColor: '#fff', 
                        padding: 6, 
                        borderRadius: 6 
                    }}>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            {description}
                        </Text>
                    </div>
                </Flex>

                <Flex justify="space-between" style={{ marginTop: 8 }}>
                    <Tooltip title={`该博客域名注册于：${domainNameRegisteredAtStdStr}`}>
                        <Flex align="center">
                            <CalendarOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                            <Text 
                                type="secondary" 
                                style={{ fontSize: 12, marginLeft: 4, userSelect: 'none' }}
                            >
                                {`博客年龄：${domainNameRegisteredDateStr}`}
                            </Text>
                        </Flex>
                    </Tooltip>

                    <Tooltip title={`该博客服务器位于：${blogServerLocation}`}>
                        <Flex align="center">
                            <EnvironmentOutlined style={{ fontSize: 14, color: '#8c8c8c' }} />
                            <Text 
                                type="secondary" 
                                style={{ fontSize: 12, marginLeft: 4, userSelect: 'none' }}
                            >
                                {blogServerLocation}
                            </Text>
                        </Flex>
                    </Tooltip>
                </Flex>
            </Flex>
        </div>
    );
}