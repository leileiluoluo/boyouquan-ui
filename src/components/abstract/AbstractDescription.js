import { Box, Text } from "@radix-ui/themes";

export default function AbstractDescription({ description }) {
    return (
        <Box mt="1" p="2" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
            <Text size="2">
                <p>{description}</p>
            </Text>
        </Box>
    )
}