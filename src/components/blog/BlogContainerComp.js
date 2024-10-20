import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AccessChart from './AccessChart';
import CollectChart from './CollectChart';
import PlanetShuttleChart from './PlanetShuttleChart';

export default function BlogContainerComp() {
    const blogStatusOkStyle = { backgroundColor: '#0dcb0d' };
    const blogStatusBadStyle = { backgroundColor: 'red' };
    const blogStatisticsStyle = { fontSize: '16px', color: 'var(--secondary)' };
    const postsTableStyle = { display: 'table', tableLayout: 'fixed' };
    const postTableClumn20Style = { width: '20%' };
    const postTableClumn80Style = { width: '80%' };
    const textStyle = { marginRight: '6px' };
    const [loaded, setLoaded] = useState(false);

    const [showPostsLimit, setShowPostsLimit] = useState(false);

    const [item, setItem] = useState({
        'blogInfo': { 'posts': [] },
        'randomBlogInfos': [],
        'yearlyAccessDataLabels': [],
        'yearlyAccessDataValues': [],
        'yearlyPublishDataLabels': [],
        'yearlyPublishDataValues': [],
        'yearlyInitiatedDataLabels': [],
        'yearlyInitiatedDataValues': [],
        'showLatestPublishedAtChart': false,
        'showLatestInitiatedChart': false
    });

    let { domain, sub } = useParams();
    if (undefined !== sub) {
        domain += '/' + sub;
    }

    const fetchData = async (domain) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/blogs/${domain}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItem(prevItem => ({
                ...prevItem,
                ['blogInfo']: resp.blogInfo,
                ['randomBlogInfos']: resp.randomBlogInfos,
                ['yearlyAccessDataLabels']: resp.yearlyAccessDataLabels,
                ['yearlyAccessDataValues']: resp.yearlyAccessDataValues,
                ['yearlyPublishDataLabels']: resp.yearlyPublishDataLabels,
                ['yearlyPublishDataValues']: resp.yearlyPublishDataValues,
                ['yearlyInitiatedDataLabels']: resp.yearlyInitiatedDataLabels,
                ['yearlyInitiatedDataValues']: resp.yearlyInitiatedDataValues,
                ['showLatestPublishedAtChart']: resp.showLatestPublishedAtChart,
                ['showLatestInitiatedChart']: resp.showLatestInitiatedChart,
            }));

            if (resp.blogInfo.postCount >= 100) {
                setShowPostsLimit(true);
            }

            setLoaded(true);

            document.title = resp.blogInfo.name + ' - 博友圈 · 博客人的朋友圈！';
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    // showChart('#access-charts', '最近一年文章浏览统计', '次浏览', item.yearlyAccessDataLabels, item.yearlyAccessDataValues, '#fd8754');
    //         if (item.showLatestPublishedAtChart) {
    //             showChart('#publish-charts', '最近一年文章收录统计', '篇文章', item.yearlyPublishDataLabels, item.yearlyPublishDataValues, '#cc6cf6');
    //         }
    //         if (item.showLatestInitiatedChart) {
    //             showChart('#initiated-charts', '最近一年星球穿梭助力统计', '次助力', item.yearlyInitiatedDataLabels, item.yearlyInitiatedDataValues, '#4299f5');
    //         }

    return (
        <>
            {loaded ?
                <Fragment>
                    <Helmet>
                        <meta name="keywords" content={item.blogInfo.name} />
                        <meta name="description" content={item.blogInfo.description} />
                        <meta property="og:title" content={item.blogInfo.name} />
                        <meta property="og:description" content={item.blogInfo.description} />
                        <script src="/assets/js/charts/frappe-charts@1.6.2.min.umd.js" type="text/javascript"></script>
                    </Helmet>
                    <div className="blog-detail-main">
                        <header className="header-info">

                            <div className="status-info">
                                <div style={item.blogInfo.statusOk ? blogStatusOkStyle : blogStatusBadStyle} className="status-icon"></div>
                                <p>{item.blogInfo.statusOk ? '运行良好' : '无法访问'}</p>
                                <span className="tooltiptext">{item.blogInfo.statusOk ? '该博客运行状态良好' : '该博客目前无法访问'}</span>
                            </div>


                            <div className="submitted-info">
                                <img src="/assets/images/sites/blog_detail/info-icon.png" />
                                <p>{item.blogInfo.submittedInfo}</p>
                                <span className="tooltiptext">{item.blogInfo.submittedInfoTip}</span>
                            </div>
                        </header>

                        {item.blogInfo.statusOk ? '' : <header className="blog-can-not-access-tip">
                            <strong>{item.blogInfo.statusUnOkInfo}</strong>
                        </header>}

                        <header className="blog-detail-header">
                            <div className="icon">
                                <a href={`/go?from=website&link=${encodeURIComponent(item.blogInfo.address)}`} target="_blank">
                                    <img src={`https://www.boyouquan.com/${item.blogInfo.blogAdminLargeImageURL}`} />
                                </a>
                            </div>
                            <div className="title">
                                <a href={`/go?from=website&link=${encodeURIComponent(item.blogInfo.address)}`} target="_blank"><h3>{item.blogInfo.name}</h3></a>
                            </div>
                            <div className="domain">
                                <a href={`/go?from=website&link=${encodeURIComponent(item.blogInfo.address)}`} target="_blank">{item.blogInfo.domainName} </a>
                                <a href={`/go?from=website&link=${encodeURIComponent(item.blogInfo.address)}`} target="_blank">
                                    <svg fill="none" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" height="12" width="12">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                        <path d="M15 3h6v6"></path>
                                        <path d="M10 14L21 3"></path>
                                    </svg>
                                </a>
                            </div>
                            <div className="description">
                                <p>{item.blogInfo.description}</p>
                            </div>
                        </header>

                        <footer className="footer-info">
                            <div className="reserved"></div>
                            <div className="location-info">
                                <img src="/assets/images/sites/blog_detail/location-icon.png" />
                                <p>{item.blogInfo.blogServerLocation}</p>
                                <span className="tooltiptext">{`该博客服务器位于：${item.blogInfo.blogServerLocation}`}</span>
                            </div>
                        </footer>
                    </div>

                    <footer className="blog-detail-summary">
                        <div className="flex-item one">
                            <p style={blogStatisticsStyle}>文章收录</p>
                            <p>{item.blogInfo.postCount}</p>
                        </div>
                        <div className="flex-item two">
                            <p style={blogStatisticsStyle}>文章浏览</p>
                            <p>{item.blogInfo.accessCount}</p>
                        </div>
                        <div className="flex-item three">
                            <p style={blogStatisticsStyle}>最近更新</p>
                            <p>{item.blogInfo.latestPublishedAt}</p>
                        </div>
                        <div className="flex-item four">
                            <p style={blogStatisticsStyle}>收录时间</p>
                            <p>{item.blogInfo.collectedAt}</p>
                        </div>
                    </footer>

                    <div className="blog-detail-charts">
                        <div className="charts-title">
                            <h4>数据统计</h4>
                        </div>
                        {item.yearlyAccessDataLabels ? <AccessChart labels={item.yearlyAccessDataLabels} values={item.yearlyAccessDataValues} /> : ''}
                        {item.yearlyPublishDataLabels ? <CollectChart labels={item.yearlyPublishDataLabels} values={item.yearlyPublishDataValues} /> : ''}
                        {item.yearlyInitiatedDataLabels ? <PlanetShuttleChart labels={item.yearlyInitiatedDataLabels} values={item.yearlyInitiatedDataValues} /> : ''}
                    </div>

                    <div className="blog-detail-articles">
                        <div className="articles-title">
                            <h4>收录文章</h4>
                        </div>
                        <div className="articles-container">
                            <table style={postsTableStyle}>
                                <tbody>
                                    {
                                        item.blogInfo.posts.map(
                                            (post, index) => (
                                                <tr key={index}>
                                                    <td style={postTableClumn20Style}>
                                                        <p style={textStyle}>{post.publishedAt}</p>
                                                    </td>

                                                    <td style={postTableClumn80Style}>
                                                        <a href={`/go?from=website&link=${encodeURIComponent(post.link)}`} target="_blank">{post.title}</a>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        {
                            showPostsLimit ? <div class="articles-footer">
                                <p>* 仅显示最新100篇文章</p>
                            </div> : ''
                        }

                    </div>

                    <div className="blog-detail-random-blogs">
                        <div className="blogs-title">
                            <h4>随机链接</h4>
                        </div>
                        <div className="blogs-container">
                            {
                                item.randomBlogInfos.map(
                                    (blog, index) => (
                                        <div key={index} className="blog-entry">
                                            <header className="blog-entry-header">
                                                <div className="blogger-icon">
                                                    <a href={`/blogs/${blog.domainName}`}>
                                                        <img src={`https://www.boyouquan.com${blog.blogAdminLargeImageURL}`} />
                                                    </a>
                                                </div>
                                                <div className="blogger-basic">
                                                    <div className="icon-and-title">
                                                        <div className="flex-item">
                                                            <a href={`/blogs/${blog.domainName}`}><h4>{blog.name}</h4></a>
                                                        </div>
                                                    </div>
                                                    <div className="domain">
                                                        <div className="flex-item-left">
                                                            <div className="domain-name">
                                                                <a href={`/go?from=website&link=${encodeURIComponent(blog.address)}`}>{blog.domainName}</a>
                                                            </div>
                                                            <div className="link">
                                                                <a href={`/go?from=website&link=${encodeURIComponent(blog.address)}`}>
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
                                            <div className="description">
                                                <p>{blog.description}</p>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </Fragment> : ''
            }
        </>
    )
}