import { Box, Card, Flex, Avatar, Text, Link, Image } from '@radix-ui/themes';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress, getGravatarImageFullURL, getSharingAddress } from '../../utils/PageAddressUtil';
import PostCardFooter from './PostCardFooter';

export default function PostCard({
    showPinned,
    pinned,
    blogDomainName,
    blogName,
    blogStatusOk,
    blogAdminMediumImageURL,
    link,
    title,
    description,
    publishedAt,
    linkAccessCount }) {
    const displayNoneStyle = { display: 'none' };

    const className = showPinned && pinned ? 'post-entry pinned' : 'post-entry';

    const gravatarURL = getGravatarImageFullURL(blogAdminMediumImageURL);
    const blogURL = getBlogAddress(blogDomainName);
    const linkURL = getGoAddress(link);
    const abstractURL = getAbstractAddress(link);
    const sharingURL = getSharingAddress(link);
    const publishedAtFormatted = formatDateStr(publishedAt);

    return (
        <Card>
            <Flex direction="column" gap="1">
                <Box>
                    <Flex gap="1">
                        <img src="/assets/images/sites/pinned/pinned.svg" style={{ display: showPinned && pinned ? 'block' : 'none' }} />
                        <Link size="3" weight="bold" href={blogStatusOk ? linkURL : abstractURL}>{title}</Link>
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

                <PostCardFooter
                    blogURL={blogURL}
                    gravatarURL={gravatarURL}
                    blogName={blogName}
                    publishedAtFormatted={publishedAtFormatted}
                    linkAccessCount={linkAccessCount}
                    sharingURL={sharingURL} />
            </Flex>
        </Card>
    )
}