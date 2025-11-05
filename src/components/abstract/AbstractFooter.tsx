import React from 'react';
import { formatDateStr } from '../../utils/DateUtil';
import { getBlogAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';
import PostCardFooter from '../post-card/PostCardFooter';

interface AbstractFooterProps {
    blogName: string;
    blogDomainName: string;
    blogAdminMediumImageURL?: string;
    publishedAt: string;
    linkAccessCount?: number;
}

export default function AbstractFooter({ blogName, blogDomainName, blogAdminMediumImageURL, publishedAt, linkAccessCount }: AbstractFooterProps): React.JSX.Element {
    const blogAddress = getBlogAddress(blogDomainName);
    const gravatarImageFullURL = getGravatarImageFullURL(blogAdminMediumImageURL || '');
    const publishedAtFormatted = formatDateStr(publishedAt);

    return (
        <PostCardFooter
            blogURL={blogAddress}
            gravatarURL={gravatarImageFullURL}
            blogName={blogName}
            publishedAtFormatted={publishedAtFormatted}
            linkAccessCount={linkAccessCount}
            sharingURL='' />
    )
}