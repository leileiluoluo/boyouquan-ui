import { Box, Card, Flex, Avatar, Text } from '@radix-ui/themes';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress, getGravatarImageFullURL, getSharingAddress } from '../../utils/PageAddressUtil';
import { Link } from 'react-router-dom';

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
        // <article className={className}>
        //     <header className="entry-header">
        //         {
        //             showPinned && pinned ? <div className="pinned-icon">
        //                 <img src="/assets/images/sites/pinned/pinned.svg" />
        //             </div> : ''
        //         }
        //         <div className="article-go">
        //             <a href={blogStatusOk ? linkURL : abstractURL} target="_blank"><h4>{title}</h4></a>
        //         </div>
        //     </header>
        //     <div className="entry-content">
        //         <p>{description}</p>
        //         <a style={displayNoneStyle} href={abstractURL}>[完整摘要]</a>
        //     </div>
        //     <footer className="entry-footer">
        //         <div className="flex-item">
        //             <a href={blogURL}>
        //                 <img src={gravatarURL} />
        //             </a>
        //         </div>
        //         <div className="flex-item">
        //             <a href={blogURL}>{blogName}</a>
        //         </div>
        //         <div className="flex-item">
        //             · <span>{publishedAtFormatted}</span>
        //         </div>
        //         <div className="flex-item">
        //             · <span>{linkAccessCount}</span>次浏览 ·
        //         </div>
        //         <div className="flex-item">
        //             <a href={sharingURL}>
        //                 <div className="sharing">
        //                     <img src="/assets/images/sites/share/share-black.png" width="20px" height="20px" />
        //                 </div>
        //             </a>
        //         </div>
        //     </footer>
        // </article>

        <Card>
            <Flex>
                <Link href={blogStatusOk ? linkURL : abstractURL}>{title}</Link>
            </Flex>
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
            <Flex gap="1">
                <Avatar
                    size="1"
                    src={gravatarURL}
                    radius="full"
                />
                <Box>
                    <Link href={blogURL}>{blogName}</Link>
                </Box>
                <Box>
                    <Text> · </Text>
                </Box>
                <Box>
                    <Text>
                        {publishedAtFormatted}
                    </Text>
                </Box>
                <Box>
                    <Text> · </Text>
                </Box>
                <Box>
                    <Text>
                        {linkAccessCount} 次浏览
                    </Text>
                </Box>
                <Box>
                    <Text> · </Text>
                </Box>
                <Box>
                    <Link href={sharingURL} asChild><a style={{ display: 'inline-flex' }}><ExternalLinkIcon /></a></Link>
                </Box>
            </Flex>
        </Card>
    )
}