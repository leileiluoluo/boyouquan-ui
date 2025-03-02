import { getGoAddress, getGravatarImageFullURL } from '../../utils/PageAddressUtil';
import { formatDateStr, formatDomainNameRegistrationDateStr } from '../../utils/DateUtil';

const blogStatusOkStyle = { backgroundColor: '#0dcb0d' };
const blogStatusBadStyle = { backgroundColor: 'red' };

export default function BlogDetailMain({ name, domainName, address, description, statusOk, submittedInfo, submittedInfoTip, statusUnOkInfo, blogAdminLargeImageURL, domainNameRegisteredAt, blogServerLocation }) {
    const blogGoAddress = getGoAddress(address);
    const gravatarURL = getGravatarImageFullURL(blogAdminLargeImageURL);
    const domainNameRegisteredAtStdStr = formatDateStr(domainNameRegisteredAt, true);
    const domainNameRegisteredDateStr = null !== domainNameRegisteredAt ? formatDomainNameRegistrationDateStr(domainNameRegisteredAt) : '';

    return (
        <div className="blog-detail-main">
            <header className="header-info">
                <div className="status-info">
                    <div style={statusOk ? blogStatusOkStyle : blogStatusBadStyle} className="status-icon"></div>
                    <p>{statusOk ? '运行良好' : '无法访问'}</p>
                    <span className="tooltiptext">{statusOk ? '该博客运行状态良好' : '该博客目前无法访问'}</span>
                </div>
                <div className="submitted-info">
                    <img src="/assets/images/sites/blog_detail/info-icon.png" />
                    <p>{submittedInfo}</p>
                    <span className="tooltiptext">{submittedInfoTip}</span>
                </div>
            </header>

            {statusOk ? '' : <header className="blog-can-not-access-tip">
                <strong>{statusUnOkInfo}</strong>
            </header>}

            <header className="blog-detail-header">
                <div className="icon">
                    <a href={blogGoAddress} target="_blank">
                        <img src={gravatarURL} />
                    </a>
                </div>
                <div className="title">
                    <a href={blogGoAddress} target="_blank"><h3>{name}</h3></a>
                </div>
                <div className="domain">
                    <a href={blogGoAddress} target="_blank">{domainName} </a>
                    <a href={blogGoAddress} target="_blank">
                        <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" height="12" width="12">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                            <path d="M15 3h6v6"></path>
                            <path d="M10 14L21 3"></path>
                        </svg>
                    </a>
                </div>
                <div className="description">
                    <p>{description}</p>
                </div>
            </header>
            <footer className="footer-info">
                {'' === domainNameRegisteredDateStr ? <div className="resvered"></div> : <div className="domain-info">
                    <img src="/assets/images/sites/blog_detail/domain-info-icon.png" />
                    <p>{`博客年龄：${domainNameRegisteredDateStr}`}</p>
                    <span className="tooltiptext">{`该博客域名注册于：${domainNameRegisteredAtStdStr}`}</span>
                </div>
                }
                <div className="location-info">
                    <img src="/assets/images/sites/blog_detail/location-icon.png" />
                    <p>{blogServerLocation}</p>
                    <span className="tooltiptext">{`该博客服务器位于：${blogServerLocation}`}</span>
                </div>
            </footer>
        </div>
    )
}