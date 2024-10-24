import { useEffect, useState } from 'react';
import getURLParameter from '../../utils/CommonUtil';
import formatDateStr from '../../utils/DateUtil';
import { scrollToHash, clearHash } from '../../utils/ScrollUtil';

export default function HomeContainerComp() {
    const displayNoneStyle = { display: 'none' };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);

    const [hasPre, setHasPre] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const [showPinned, setShowPinned] = useState(false);

    const fetchData = async (sortType, keyword, page) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/posts?sort=${sortType}&keyword=${keyword}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();

            setPageSize(resp.pageSize);
            setTotal(resp.total);
            setItems(resp.results);

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
        let sort = getURLParameter('sort') || 'recommended';
        let keyword = getURLParameter('keyword') || '';
        if (keyword.length > 0) {
            sort = 'latest';
        }

        if ('recommended' === sort) {
            setShowPinned(true);
        }

        fetchData(sort, keyword, currentPage);

        scrollToHash();
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

        clearHash();

        document.getElementsByClassName('switch-sort-type')[0].scrollIntoView();
    }

    return (
        <>
            {
                items.map(
                    (item, index) => (
                        <article key={index} className={showPinned && item.pinned ? 'post-entry pinned' : 'post-entry'}>
                            <header className="entry-header">
                                {
                                    showPinned && item.pinned ? <div className="pinned-icon">
                                        <img src="/assets/images/sites/pinned/pinned.svg" />
                                    </div> : ''
                                }

                                <div className="article-go">
                                    {
                                        item.blogStatusOk ? <a href={`/go?from=website&link=${encodeURIComponent(item.link)}`} target="_blank"><h4>{item.title}</h4></a>
                                            : <a href={`/abstract?link=${encodeURIComponent(item.link)}`} target="_blank"><h4>{item.title}</h4></a>
                                    }
                                </div>
                            </header>
                            <div className="entry-content">
                                <p>{item.description}</p>
                                <a style={displayNoneStyle} href={`/abstract?link=${encodeURIComponent(item.link)}`}>[完整摘要]</a>
                            </div>
                            <footer className="entry-footer">
                                <div className="flex-item">
                                    <a href={`/blogs/${item.blogDomainName}`}>
                                        <img src={`https://www.boyouquan.com${item.blogAdminMediumImageURL}`} />
                                    </a>
                                </div>
                                <div className="flex-item">
                                    <a href={`/blogs/${item.blogDomainName}`}>{item.blogName}</a>
                                </div>
                                <div className="flex-item">
                                    · <span>{formatDateStr(item.publishedAt)}</span>
                                </div>
                                <div className="flex-item">
                                    · <span>{item.linkAccessCount}</span>次浏览 ·
                                </div>
                                <div className="flex-item">
                                    <a href={`/sharing?link=${encodeURIComponent(item.link)}`}>
                                        <div className="sharing">
                                            <img src="/assets/images/sites/share/share-black.png" width="20px" height="20px" />
                                        </div>
                                    </a>
                                </div>
                            </footer>
                        </article>
                    ))
            }
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