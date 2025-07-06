import { Box, Flex, Heading } from "@radix-ui/themes";

export default function Article({ title, content, publishedAt }) {
    return (
        <Box>
            <Flex direction="column" gap="4">
                <Box className="post-header">
                    <Heading as="h4">{title}</Heading>
                    {
                        publishedAt ? <div className="post-publish-date">
                            <p>{publishedAt}</p>
                        </div> : ''
                    }
                </Box>
                <Box>
                    {content}
                </Box>
            </Flex>
        </Box>
    )
}