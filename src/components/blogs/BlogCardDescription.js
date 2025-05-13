import { Box, Text } from "@radix-ui/themes";

export default function BlogCardDescription({ description }) {
    return (
        <Box>
            <Text size="1">
                {description}
            </Text>
        </Box>
    )
}