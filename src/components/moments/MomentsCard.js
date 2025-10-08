import { Flex, Card, Box, Link } from '@radix-ui/themes';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import MomentsCardFooter from './MomentsCardFooter';

export default function MomentsCard({ moment }) {
    return (
        <Card>
            <Flex direction="column" gap="2">
                <AspectRatio.Root
                    ratio={16 / 9}
                    style={{
                        flexShrink: 0,
                        backgroundColor: "#f3f3f3",
                        borderRadius: "4px",
                        overflow: "hidden",
                    }}>
                    <Link target="_blank" size="3" weight="bold">
                        <img
                            src={moment.imageURL}
                            style={{ width: "100%", height: "100%", objectFit: "cover", animation: "autoClear 1s ease-in-out forwards", transform: "scale(1.1)", filter: "blur(2px)" }} />
                    </Link>
                </AspectRatio.Root>

                <Flex direction="column" gap="1">
                    <Box>
                        <Flex gap="1">
                            <Link target="_blank" size="2" weight="bold" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>{moment.description}</Link>
                        </Flex>
                    </Box>

                    <MomentsCardFooter
                        moment={moment} />
                </Flex>
            </Flex>
        </Card>
    )
}