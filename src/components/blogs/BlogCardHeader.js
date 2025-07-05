import { Avatar, Box, Flex, Link } from '@radix-ui/themes';
import { getBlogAddress, getGoAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';

export default function BlogCardHeader({ name, domainName, address, blogAdminLargeImageURL }) {
    const blogAddress = getBlogAddress(domainName);
    const gravatarURL = getGravatarImageFullURL(blogAdminLargeImageURL);
    const blogGoURL = getGoAddress(address);

    return (
        <Box>
            <Flex gap="2" align="center">
                <Box>
                    <Link href={blogAddress}>
                        <Avatar
                            style={{ width: '36px', height: '36px' }}
                            src={gravatarURL}
                            radius="full"
                        />
                    </Link>
                </Box>
                <Box>
                    <Flex direction="column">
                        <Link size="3" weight="bold" href={blogAddress}>{name}</Link>
                        <Flex gap="1" align="center">
                            <Link size="1" href={blogGoURL}>{domainName}</Link>
                            <Box size="1">
                                <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" height="12" width="12">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14L21 3"></path>
                                </svg>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}