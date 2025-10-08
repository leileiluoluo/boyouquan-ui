import { Box, Flex, Avatar, Text, Link, Image } from '@radix-ui/themes';
import { getBlogAddress } from '../../utils/PageAddressUtil';
import { formatDateStr } from '../../utils/DateUtil';

export default function MomentsCardFooter({ moment }) {
    const blogURL = getBlogAddress(moment.blogDomainName);
    const createdAtFormatted = formatDateStr(moment.createdAt);

    return <Flex gap="1" align="center">
        <Box>
            <Link href={blogURL}>
                <Flex align="center">
                    <Avatar
                        style={{ width: 20, height: 20 }}
                        src={moment.blogInfo.blogAdminMediumImageURL}
                        radius="full"
                    />
                </Flex>
            </Link>
        </Box>
        <Box>
            <Link size="2" href={blogURL} style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>{moment.blogInfo.name}</Link>
        </Box>
        <Box>
            <Text> · </Text>
        </Box>
        <Box>
            <Text size="2" color="gray" style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {createdAtFormatted}
            </Text>
        </Box>
    </Flex>
}