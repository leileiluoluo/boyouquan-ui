import { Flex, Card, Link } from '@radix-ui/themes';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

import PostCard from '../post-card/PostCard';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';

export default function MonthlySelectedCard({ postInfo }) {
    const linkURL = getGoAddress(postInfo.link);
    const abstractURL = getAbstractAddress(postInfo.link);

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="2">
                {postInfo.hasImage ? <AspectRatio.Root
                    ratio={16 / 9}
                    style={{
                        flexShrink: 0,
                        backgroundColor: "#f3f3f3",
                        borderRadius: "4px",
                        overflow: "hidden",
                    }}>
                    <Link target="_blank" size="3" weight="bold" href={postInfo.blogStatusOk ? linkURL : abstractURL}>
                        <img
                            src={postInfo.imageURL}
                            alt={postInfo.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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