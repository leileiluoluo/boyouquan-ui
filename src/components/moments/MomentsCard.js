import { Flex, Card, Link } from '@radix-ui/themes';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

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

                {/* <Flex direction="column" gap="1">
                    <Box>
                        <Flex gap="1">
                            <img src="/assets/images/sites/pinned/pinned.svg" style={{ display: showPinned && pinned ? 'block' : 'none' }} />
                            <Link target="_blank" size="3" weight="bold" href={blogStatusOk ? linkURL : abstractURL} style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>{title}</Link>
                        </Flex>
                    </Box>
                    <Box>
                        <Text as="div" size="2" color="gray" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {description}
                        </Text>
                    </Box>

                    <MomentsCardFooter
                        blogURL={blogURL}
                        gravatarURL={gravatarURL}
                        blogName={blogName}
                        publishedAtFormatted={publishedAtFormatted}
                        linkAccessCount={linkAccessCount}
                        sharingURL={sharingURL} />
                </Flex> */}
            </Flex>
        </Card>
    )
}