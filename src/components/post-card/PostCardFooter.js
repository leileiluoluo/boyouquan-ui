import { Box, Flex, Avatar, Text, Link, Image } from '@radix-ui/themes';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

export default function PostCardFooter({ blogURL, gravatarURL, blogName, publishedAtFormatted, linkAccessCount, sharingURL }) {
    return <Box>
        <Flex gap="1" align="center">
            <Box>
                <Link href={blogURL}>
                    <Avatar
                        style={{ width: 20, height: 20 }}
                        src={gravatarURL}
                        radius="full"
                    />
                </Link>
            </Box>
            <Box>
                <Link size="2" href={blogURL} style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>{blogName}</Link>
            </Box>
            <Box>
                <Text> · </Text>
            </Box>
            <Box>
                <Text size="2" color="gray">
                    {publishedAtFormatted}
                </Text>
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
                    {linkAccessCount} 次浏览
                </Text>
            </Box>
            <Box>
                <Text> · </Text>
            </Box>
            <Box>
                <Flex align="center">
                    <Link size="2" color="gray" href={sharingURL} asChild><a style={{ display: 'inline-flex' }}><ExternalLinkIcon /></a></Link>
                </Flex>
            </Box>
        </Flex>
    </Box>
}