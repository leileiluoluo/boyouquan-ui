import { formatDateStr } from '../../utils/DateUtil';
import { getBlogAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';

export default function AbstractFooter({ blogName, blogDomainName, blogAdminMediumImageURL, publishedAt, linkAccessCount }) {
    const blogAddress = getBlogAddress(blogDomainName);
    const gravatarImageFullURL = getGravatarImageFullURL(blogAdminMediumImageURL);
    const publishedAtFormatted = formatDateStr(publishedAt);

    return (
        <footer className="entry-footer">
            <div className="flex-item">
                <a href={blogAddress}>
                    <img src={gravatarImageFullURL} />
                </a>
            </div>
            <div className="flex-item">
                <a href={blogAddress}>{blogName}</a>
            </div>
            <div className="flex-item">
                · <span>{publishedAtFormatted}</span>
            </div>
            <div className="flex-item">
                · <span>{linkAccessCount}</span>次浏览
            </div>
        </footer>
    )
}