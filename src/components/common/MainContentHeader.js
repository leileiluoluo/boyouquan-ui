import { Box, Text } from "@radix-ui/themes";

export default function MainContentHeader( {content} ) {
    return (
        <Box>
            <Text size="2" color="gray">
            {content}
            </Text>
        </Box>
    )
}