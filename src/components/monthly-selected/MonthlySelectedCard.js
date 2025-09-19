import { Flex, Card, Link } from '@radix-ui/themes';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import PostCard from '../post-card/PostCard';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';

export default function MonthlySelectedCard({ postInfo, showImage }) {
    const linkURL = getGoAddress(postInfo.link);
    const abstractURL = getAbstractAddress(postInfo.link);

    return (
        <Card>
            <Flex direction="column" gap="2">
                {postInfo.hasImage && showImage ? <AspectRatio.Root
                    ratio={16 / 9}
                    style={{
                        flexShrink: 0,
                        backgroundColor: "#f3f3f3",
                        borderRadius: "4px",
                        overflow: "hidden",
                    }}>
                    <Link target="_blank" size="3" weight="bold" href={postInfo.blogStatusOk ? linkURL : abstractURL}>
                        <img
                            src={'https://www.boyouquan.com' + postInfo.imageURL}
                            alt={postInfo.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", animation: "autoClear 1s ease-in-out forwards", transform: "scale(1.1)", filter: "blur(2px)" }} />
                    </Link>
                </AspectRatio.Root> : ''}

                <PostCard
                    blogDomainName={postInfo.blogDomainName}
                    blogName={postInfo.blogName}
                    blogStatusOk={postInfo.blogStatusOk}
                    blogAdminMediumImageURL={postInfo.blogAdminMediumImageURL}
                    link={postInfo.link}
                    title={postInfo.title}
                    description={postInfo.description}
                    publishedAt={postInfo.publishedAt}
                    linkAccessCount={postInfo.linkAccessCount} />
            </Flex>
        </Card>
    )
}