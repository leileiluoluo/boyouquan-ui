import { getGoAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';
import { formatDateStr, formatDomainNameRegistrationDateStr } from '../../utils/DateUtil';
import { Card, Box, Flex, Link, Avatar, Text, Tooltip } from '@radix-ui/themes';
import BlogCardFooter from '../blogs/BlogCardFooter';

export default function BlogDetailMain({ name, domainName, address, description, statusOk, submittedInfo, submittedInfoTip, statusUnOkInfo, blogAdminLargeImageURL, domainNameRegisteredAt, blogServerLocation }) {
    const blogGoAddress = getGoAddress(address);
    const gravatarURL = getGravatarImageFullURL(blogAdminLargeImageURL);
    const domainNameRegisteredAtStdStr = formatDateStr(domainNameRegisteredAt, true);
    const domainNameRegisteredDateStr = null !== domainNameRegisteredAt ? formatDomainNameRegistrationDateStr(domainNameRegisteredAt) : '';

    return (
        <Card style={{
            backgroundImage: 'url(/assets/images/sites/blog_detail/blog-detail-header-background.jpeg)',
            padding: 'var(--space-4)'
        }}>
            <Flex gap="1" direction="column">
                <BlogCardFooter
                    statusOk={statusOk}
                    submittedInfo={submittedInfo}
                    submittedInfoTip={submittedInfoTip} />

                <Flex gap="1" direction="column" align="center">
                    <Link href={blogGoAddress}>
                        <Avatar
                            style={{ width: '60px', height: '60px' }}
                            src={gravatarURL}
                            radius="full"
                        />
                    </Link>
                    <Link weight="bold" href={blogGoAddress}>
                        {name}
                    </Link>
                    <Flex gap="1" align="center">
                        <Link size="1" href={blogGoAddress}>{domainName}</Link>
                        <Box size="1">
                            <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" height="12" width="12">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                <path d="M15 3h6v6"></path>
                                <path d="M10 14L21 3"></path>
                            </svg>
                        </Box>
                    </Flex>
                    <Box style={{ backgroundColor: 'rgb(255, 255, 255)', padding: '4px', borderRadius: 'calc(0.4rem)' }}>
                        <Text size="2" color="gray">{description}</Text>
                    </Box>
                </Flex>

                <Flex justify="between" mt="2">
                    <Box>
                        <Tooltip content={`该博客域名注册于：${domainNameRegisteredAtStdStr}`}>
                            <Flex align="center">
                                <img style={{
                                    userSelect: 'none',
                                    width: '14px',
                                    display: 'block'
                                }} src="/assets/images/sites/blog_detail/domain-info-icon.png" />
                                <Text size="1" ml="1" color="gray" style={{ userSelect: 'none' }}>{`博客年龄：${domainNameRegisteredDateStr}`}</Text>
                            </Flex>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip content={`该博客服务器位于：${blogServerLocation}`}>
                            <Flex align="center">
                                <img style={{
                                    userSelect: 'none',
                                    width: '14px',
                                    display: 'block'
                                }} src="/assets/images/sites/blog_detail/location-icon.png" />
                                <Text size="1" ml="1" color="gray" style={{ userSelect: 'none' }}>{blogServerLocation}</Text>
                            </Flex>
                        </Tooltip>
                    </Box>
                </Flex>
            </Flex>
        </Card>
    )
}