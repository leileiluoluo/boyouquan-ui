import { useEffect, useState } from 'react';
import getURLParameter from '../../utils/CommonUtil';
import formatDateStr from '../../utils/DateUtil';

export default function BlogsContainerComp() {
    const marginRightStyle = { marginRight: '6px', color: 'var(--secondary)' };
    const statusOkBackgroundColorStyle = { backgroundColor: '#0dcb0d' };
    const statusBadBackgroundColorStyle = { backgroundColor: 'red' };
    const highlightStyle = { color: '#cb2e58' };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogs, setBlogs] = useState([]);

    const [publishedAtHighlight, setPublishedAtHighlight] = useState(false);
    const [accessCountHighlight, setAccessCountHighlight] = useState(false);

    const [hasPre, setHasPre] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const fetchData = async (sortType, keyword, page) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/blogs?sort=${sortType}&keyword=${keyword}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();

            setPageSize(resp.pageSize);
            setTotal(resp.total);
            setBlogs(resp.results);

            // hasPre
            if (page > 1) {
                setHasPre(true);
            } else {
                setHasPre(false);
            }

            // hasNext
            if (resp.total > page * resp.pageSize) {
                setHasNext(true);
            } else {
                setHasNext(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        let sort = getURLParameter('sort') || 'collect_time';
        let keyword = getURLParameter('keyword') || '';

        if ('collect_time' === sort) {
            setPublishedAtHighlight(true);
        } else {
            setAccessCountHighlight(true);
        }

        fetchData(sort, keyword, currentPage);
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

        document.getElementsByClassName('switch-sort-type')[0].scrollIntoView();
    }

    return (
        <>
            <div className="blog-container">
                {
                    blogs.map(
                        (blog, index) => (
                            <article key={index} className="blog-entry">
                                <header className="blog-entry-header">
                                    <div className="blogger-icon">
                                        <a href={`/blogs/${blog.domainName}`}>
                                            <img src={`https://www.boyouquan.com/${blog.blogAdminLargeImageURL}`} />
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
                                                    <a href={`/go?from=website&link=${encodeURIComponent(blog.address)}`} target="_blank">{blog.domainName}</a>
                                                </div>
                                                <div className="link">
                                                    <a href={`/go?from=website&link=${encodeURIComponent(blog.address)}`} target="_blank">
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
                                <div className="summary">
                                    <div className="flex-item">
                                        <div className="title">
                                            <p>文章收录</p>
                                        </div>
                                        <div className="count">
                                            <p>{blog.postCount}</p>
                                        </div>
                                    </div>
                                    <div className="flex-item">
                                        <div className="title">
                                            <p style={accessCountHighlight ? highlightStyle : { color: 'inherit' }}>文章浏览</p>
                                        </div>
                                        <div className="count">
                                            <p style={accessCountHighlight ? highlightStyle : { color: 'inherit' }}>{blog.accessCount}</p>
                                        </div>
                                    </div>
                                    <div className="flex-item">
                                        <div className="title">
                                            <p>最近更新</p>
                                        </div>
                                        <div className="count">
                                            <p>{formatDateStr(blog.latestPublishedAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex-item">
                                        <div className="title">
                                            <p style={publishedAtHighlight ? highlightStyle : { color: 'inherit' }}>收录时间</p>
                                        </div>
                                        <div className="count">
                                            <p style={publishedAtHighlight ? highlightStyle : { color: 'inherit' }}>{formatDateStr(blog.collectedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="latest-posts">
                                    <p>最新文章</p>
                                    {
                                        blog.posts.map(
                                            (post, index) => (
                                                <p key={index}>
                                                    <a style={marginRightStyle}>{formatDateStr(post.publishedAt, true)}</a>

                                                    {blog.statusOk ? <a href={`/go?from=website&link=${encodeURIComponent(post.link)}`} target="_blank">{post.title}</a>
                                                        : <a href={`/abstract?link=${encodeURIComponent(post.link)}`} target="_blank">{post.title}</a>}
                                                </p>
                                            )
                                        )
                                    }
                                </div>
                                <footer className="bottom-info">
                                    <div className="status-info">
                                        <div style={blog.statusOk ? statusOkBackgroundColorStyle : statusBadBackgroundColorStyle} className="status-icon"></div>
                                        <p>{blog.statusOk ? '运行良好' : '无法访问'}</p>
                                        <span className="tooltiptext">{blog.statusOk ? '该博客运行状态良好' : '该博客目前无法访问'}</span>
                                    </div>
                                    <div className="submitted-info">
                                        <img src="/assets/images/sites/blog_detail/info-icon.png" />
                                        <p>{blog.submittedInfo}</p>
                                        <span className="tooltiptext">{blog.submittedInfoTip}</span>
                                    </div>
                                </footer>
                            </article>
                        ))
                }
            </div>
            <footer className="page-footer blog-footer">
                <nav className="pagination">
                    {
                        hasPre && <button className="pre" onClick={() => paginate(currentPage - 1)}>« 上一页</button>
                    }
                    {
                        hasNext && <button className="next" onClick={() => paginate(currentPage + 1)}>下一页 »</button>
                    }
                </nav>
            </footer>
        </>
    )
}