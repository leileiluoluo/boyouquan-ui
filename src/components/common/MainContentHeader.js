import { Box, Text } from '@radix-ui/themes';

export default function MainContentHeader({ content }) {
    return (
        <Box>
            <Text size="2">
                {content}
            </Text>
        </Box>
    )
}