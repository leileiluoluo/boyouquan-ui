import { Box, Flex, Text } from '@radix-ui/themes';

export default function HomeBanner() {
    return (
        <Flex mt="-4" mb="-4" direction="column" gap="1">
            <Box>
                <Text size="2">博友圈祝博友们国庆中秋双节快乐！</Text>
            </Box>
            <Box mt="0">
                <p style={{ marginTop: '0px' }}>
                    <img align="center" src="/assets/images/sites/banner/national-day-and-mid-autumn-day.jpeg" />
                </p>
            </Box>
        </Flex>
    )
}