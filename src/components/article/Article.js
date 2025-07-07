import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

export default function Article({ title, content, publishedAt }) {
    return (
        <Card>
            <Flex direction="column" gap="4">
                <Box className="post-header">
                    <Heading size="4">{title}</Heading>
                    <Box mt="1">{
                        publishedAt ? <Text color="gray" size="2">
                            {publishedAt}
                        </Text> : ''
                    }</Box>
                </Box>
                <Box>
                    {content}
                </Box>
            </Flex>
        </Card>
    )
}