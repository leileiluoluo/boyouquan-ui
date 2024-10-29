import { getBlogAddress, getGoAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';

export default function BlogCardHeader({ name, domainName, address, blogAdminLargeImageURL }) {
    const blogAddress = getBlogAddress(domainName);
    const gravatarURL = getGravatarImageFullURL(blogAdminLargeImageURL);
    const blogGoURL = getGoAddress(address);

    return (
        <header className="blog-entry-header">
            <div className="blogger-icon">
                <a href={blogAddress}>
                    <img src={gravatarURL} />
                </a>
            </div>
            <div className="blogger-basic">
                <div className="icon-and-title">
                    <div className="flex-item">
                        <a href={blogAddress}><h4>{name}</h4></a>
                    </div>
                </div>
                <div className="domain">
                    <div className="flex-item-left">
                        <div className="domain-name">
                            <a href={blogGoURL} target="_blank">{domainName}</a>
                        </div>
                        <div className="link">
                            <a href={blogGoURL} target="_blank">
                                <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" height="12" width="12">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14L21 3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}