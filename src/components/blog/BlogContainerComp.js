import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BlogContainerComp() {
    const blogStatusStyle = { backgroundColor: '#0dcb0d' };
    const blogStatisticsStyle = { fontSize: '16px', color: 'var(--secondary)'};
    const postsTableStyle = { display: 'table', tableLayout: 'fixed' };
    const postTableClumn20Style = {width: '20%'};
    const postTableClumn80Style = {width: '80%'};
    const textStyle = {marginRight: '6px'};

    const [item, setItem] = useState({
        'blogInfo': {'posts': []},
        'randomBlogInfos': []
    });

    const { domain } = useParams();

    const fetchData = async (domain) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/blogs/${domain}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            console.log('resp: ' + resp);
            setItem(prevItem=> ({
                ...prevItem,
                ['blogInfo']: resp.blogInfo,
                ['randomBlogInfos']: resp.randomBlogInfos,
              }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    document.title = item.blogInfo.name + ' - 博友圈 · 博客人的朋友圈！';

    return (
        <>
    <div className="blog-detail-main">
        <header className="header-info">
            
            <div className="status-info">
                <div style={blogStatusStyle} className="status-icon"></div>
                <p>{item.blogInfo.statusOk ? '运行良好' : '无法访问'}</p>
                <span className="tooltiptext">该博客运行状态良好</span>
            </div>
            

            <div className="submitted-info">
                <img src="/assets/images/sites/blog_detail/info-icon.png" />
                <p>{item.blogInfo.submittedInfo}</p>
                <span className="tooltiptext">{item.blogInfo.submittedInfoTip}</span>
            </div>
        </header>

        <header className="blog-detail-header">
            <div className="icon">
                <a href={`/go?from=website&link=${item.blogInfo.address}`} target="_blank">
                    <img src={`https://www.boyouquan.com/${item.blogInfo.blogAdminLargeImageURL}`} />
                </a>
            </div>
            <div className="title">
                <a href={`/go?from=website&link=${item.blogInfo.address}`} target="_blank"><h3>{item.blogInfo.name}</h3></a>
            </div>
            <div className="domain">
                <a href={`/go?from=website&link=${item.blogInfo.address}`} target="_blank">{item.blogInfo.domainName}</a>
                <a href={`/go?from=website&link=${item.blogInfo.address}`} target="_blank">
                    <svg fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" height="12" width="12">
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
                            <tr>
                    <td style={postTableClumn20Style}>
                        <text style={textStyle}>{post.publishedAt}</text>
                    </td>

                    <td style={postTableClumn80Style}>
                        <a href={`/go?from=website&link=${post.link}`} target="_blank">{post.title}</a>                        
                    </td>
                </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
        
    </div>

    <div className="blog-detail-random-blogs">
        <div className="blogs-title">
            <h4>随机链接</h4>
        </div>
        <div className="blogs-container">
            {
                item.randomBlogInfos.map(
                    (blog, index) => (
                        <div className="blog-entry">
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
                                    <a href={`/go?from=website&link=${blog.address}`}>{blog.domainName}</a>
                                </div>
                                <div className="link">
                                    <a href={`/go?from=website&link=${blog.address}`}>
                                        <svg fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewBox="0 0 24 24" height="12" width="12">
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
                    <p>糖果补充能量，谎言侵蚀灵魂</p>
                </div>
            </div>
                    )
                )
            }
        </div>
    </div>
        </>
    )
}