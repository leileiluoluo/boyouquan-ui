import { Box, Text } from "@radix-ui/themes";

export default function AbstractDescription({ description }) {
    return (
        <Box>
            <Text size="2" color="gray" style={{
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