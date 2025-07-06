import { Box, Text } from "@radix-ui/themes";

export default function BlogCardDescription({ description }) {
    return (
        <Box p="2" radius="large" mt="1" mb="1"
            style={{
                backgroundColor: 'rgb(245, 245, 245)'
            }}>
            <Text size="1"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                {description}
            </Text>
        </Box>
    )
}