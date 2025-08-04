import { Box, Flex, Card, Link, Tooltip, Avatar } from '@radix-ui/themes';
import specialThanks from '../../../json/specialThanks.json';

const thanksStyle = {
    paddingTop: '8px',
    paddingBottom: '4px',
    borderBottom: '2px solid #cb2e58',
    width: '80px',
    margin: '0 auto'
}

export default function SpecialThanks() {
    return (
        <Box id="special-thanks">
            <Card>
                <Flex direction="column" gap="2">
                    <Box align="center">
                        <Link size="2" weight="bold" href="/sponsor">感谢赞助</Link>
                    </Box>
                    <Box>
                        <Flex gap="4"
                            wrap="wrap"
                            align="center"
                            justify="center">
                            {
                                specialThanks.map(
                                    (item, index) => (
                                        <Box key={index}>
                                            <Tooltip content={item.name}>
                                                <Link href={item.link}>
                                                    <Avatar
                                                        size="2"
                                                        radius="full"
                                                        src={item.avatar}
                                                    />
                                                </Link>
                                            </Tooltip>
                                        </Box>
                                    )
                                )
                            }

                            <Box>
                                <Tooltip content="我也要赞助">
                                    <Link href="/sponsor">
                                        <Avatar
                                            size="2"
                                            radius="full"
                                            fallback="+"
                                        />
                                    </Link>
                                </Tooltip>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </Card>
        </Box>
    )
}
