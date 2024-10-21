import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import formatDateStr from '../../utils/DateUtil';
import BlogChartsComp from './BlogChartsComp';
import BlogPostsComp from './BlogPostsComp';
import RandomBlogsComp from './RandomBlogsComp';

export default function BlogContainerComp() {
    const blogStatusOkStyle = { backgroundColor: '#0dcb0d' };
    const blogStatusBadStyle = { backgroundColor: 'red' };
    const blogStatisticsStyle = { fontSize: '16px', color: 'var(--secondary)' };

    const [loaded, setLoaded] = useState(false);

    const [item, setItem] = useState({});

    let { domain, sub } = useParams();
    if (undefined !== sub) {
        domain += '/' + sub;
    }

    const fetchData = async (domain) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/blogs?domainName=${domain}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItem(resp);

            setLoaded(true);

            document.title = resp.name + ' - 博友圈 · 博客人的朋友圈！';
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <>
            {loaded ?
                <Fragment>
                    <Helmet>
                        <meta name="keywords" content={item.name} />
                        <meta name="description" content={item.description} />
                        <meta property="og:title" content={item.name} />
                        <meta property="og:description" content={item.description} />
                        <script src="/assets/js/charts/frappe-charts@1.6.2.min.umd.js" type="text/javascript"></script>
                    </Helmet>
                    <div className="blog-detail-main">
                        <header className="header-info">

                            <div className="status-info">
                                <div style={item.statusOk ? blogStatusOkStyle : blogStatusBadStyle} className="status-icon"></div>
                                <p>{item.statusOk ? '运行良好' : '无法访问'}</p>
                                <span className="tooltiptext">{item.statusOk ? '该博客运行状态良好' : '该博客目前无法访问'}</span>
                            </div>


                            <div className="submitted-info">
                                <img src="/assets/images/sites/blog_detail/info-icon.png" />
                                <p>{item.submittedInfo}</p>
                                <span className="tooltiptext">{item.submittedInfoTip}</span>
                            </div>
                        </header>

                        {item.statusOk ? '' : <header className="blog-can-not-access-tip">
                            <strong>{item.statusUnOkInfo}</strong>
                        </header>}

                        <header className="blog-detail-header">
                            <div className="icon">
                                <a href={`/go?from=website&link=${encodeURIComponent(item.address)}`} target="_blank">
                                    <img src={`https://www.boyouquan.com/${item.blogAdminLargeImageURL}`} />
                                </a>
                            </div>
                            <div className="title">
                                <a href={`/go?from=website&link=${encodeURIComponent(item.address)}`} target="_blank"><h3>{item.name}</h3></a>
                            </div>
                            <div className="domain">
                                <a href={`/go?from=website&link=${encodeURIComponent(item.address)}`} target="_blank">{item.domainName} </a>
                                <a href={`/go?from=website&link=${encodeURIComponent(item.address)}`} target="_blank">
                                    <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" height="12" width="12">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                        <path d="M15 3h6v6"></path>
                                        <path d="M10 14L21 3"></path>
                                    </svg>
                                </a>
                            </div>
                            <div className="description">
                                <p>{item.description}</p>
                            </div>
                        </header>

                        <footer className="footer-info">
                            <div className="reserved"></div>
                            <div className="location-info">
                                <img src="/assets/images/sites/blog_detail/location-icon.png" />
                                <p>{item.blogServerLocation}</p>
                                <span className="tooltiptext">{`该博客服务器位于：${item.blogServerLocation}`}</span>
                            </div>
                        </footer>
                    </div>

                    <footer className="blog-detail-summary">
                        <div className="flex-item one">
                            <p style={blogStatisticsStyle}>文章收录</p>
                            <p>{item.postCount}</p>
                        </div>
                        <div className="flex-item two">
                            <p style={blogStatisticsStyle}>文章浏览</p>
                            <p>{item.accessCount}</p>
                        </div>
                        <div className="flex-item three">
                            <p style={blogStatisticsStyle}>最近更新</p>
                            <p>{formatDateStr(item.latestPublishedAt)}</p>
                        </div>
                        <div className="flex-item four">
                            <p style={blogStatisticsStyle}>收录时间</p>
                            <p>{formatDateStr(item.collectedAt)}</p>
                        </div>
                    </footer>

                    <BlogChartsComp domain={domain}/>
                    <BlogPostsComp domain={domain} />
                    <RandomBlogsComp domain={domain} />
                </Fragment> : ''
            }
        </>
    )
}