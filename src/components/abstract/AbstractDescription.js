import { Box, Text } from "@radix-ui/themes";

export default function AbstractDescription({ description }) {
    return (
        <Box mt="2" p="1" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
            <Text size="2" style={{
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {description}
            </Text>
        </Box>
    )
}