import { Box, Flex, Card, Link, Tooltip, Avatar } from '@radix-ui/themes';
import specialThanks from '../../../json/specialThanks.json';
import LazyAvatar from '../avatar/LazyAvatar';

export default function SpecialThanks({ isHome }) {
    return (
        <Box id="special-thanks" display={isHome ? "block" : "none"}>
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
                                                    <LazyAvatar
                                                        style={{ width: 28, height: 28 }}
                                                        src={item.avatar}
                                                        radius="full"
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
