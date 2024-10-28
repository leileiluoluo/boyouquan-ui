import formatDateStr from '../../utils/DateUtil';

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

    const gravatarURL = `https://www.boyouquan.com${blogAdminMediumImageURL}`;
    const blogURL = `/blogs/${blogDomainName}`;
    const linkURL = `/go?from=website&link=${encodeURIComponent(link)}`;
    const abstractURL = `/abstract?link=${encodeURIComponent(link)}`;
    const sharingURL = `/sharing?link=${encodeURIComponent(link)}`;
    const publishedAtFormatted = formatDateStr(publishedAt);

    return (
        <article className={className}>
            <header className="entry-header">
                {
                    showPinned && pinned ? <div className="pinned-icon">
                        <img src="/assets/images/sites/pinned/pinned.svg" />
                    </div> : ''
                }
                <div className="article-go">
                    <a href={blogStatusOk ? linkURL : abstractURL} target="_blank"><h4>{title}</h4></a>
                </div>
            </header>
            <div className="entry-content">
                <p>{description}</p>
                <a style={displayNoneStyle} href={abstractURL}>[完整摘要]</a>
            </div>
            <footer className="entry-footer">
                <div className="flex-item">
                    <a href={blogURL}>
                        <img src={gravatarURL} />
                    </a>
                </div>
                <div className="flex-item">
                    <a href={blogURL}>{blogName}</a>
                </div>
                <div className="flex-item">
                    · <span>{publishedAtFormatted}</span>
                </div>
                <div className="flex-item">
                    · <span>{linkAccessCount}</span>次浏览 ·
                </div>
                <div className="flex-item">
                    <a href={sharingURL}>
                        <div className="sharing">
                            <img src="/assets/images/sites/share/share-black.png" width="20px" height="20px" />
                        </div>
                    </a>
                </div>
            </footer>
        </article>
    )
}