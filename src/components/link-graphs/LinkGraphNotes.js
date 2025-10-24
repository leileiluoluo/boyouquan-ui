import { Box, Flex, Link, Text } from '@radix-ui/themes';

export default function LinkGraphNotes() {
    return (
        <Flex direction="column" mt="2">
            <Box>
                <Text size="1" color="gray">
                    * 友链数据从博客首页中含有「Link」、「友链」、「圈子」、「关于」等字样的内部页面抓取。
                </Text>
            </Box>
            <Box>
                <Text size="1" color="gray">
                    * 该数据集每月采集一次，这个频率不会对您的博客造成太大的压力，当前数据集采集于 2025/10/18。
                </Text>
            </Box>
            <Box>
                <Text size="1" color="gray">
                    * 若您不想您的友链数据被采集，可以「<Link href="mailto:support@boyouquan.com?subject=请将我移出友链抓取名单&body=我的博客地址：%0d%0a">联系站长</Link>」将您的博客加入免采集名单。
                </Text>
            </Box>
        </Flex>
    )
}