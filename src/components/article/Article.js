import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

export default function Article({ title, content, publishedAt }) {
    return (
        <Flex direction="column" gap="2">
            <Box className="post-header">
                <Heading size="4">{title}</Heading>
                <Box mt="1">{
                    publishedAt ? <Text color="gray" size="2">
                        {publishedAt}
                    </Text> : ''
                }</Box>
            </Box>
            <Card mt="2" mb="2" p="2">
                {content}
            </Card>
        </Flex>
    )
}