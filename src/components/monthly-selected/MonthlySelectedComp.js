import { useEffect, useState } from 'react';
import formatDateStr from '../../utils/DateUtil';

export default function MonthlySelectedComp() {
    const tableStyle = { display: 'table', tableLayout: 'fixed' };
    const dateStyle = { marginRight: '6px' };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);

    const [hasPre, setHasPre] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const fetchData = async (page) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/monthly-selected?page=${page}`);
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
        fetchData(currentPage);
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

        document.getElementsByClassName('monthly-selected-container')[0].scrollIntoView();
    }

    return (
        <>
            <div className="monthly-selected-container">
                {
                    items.map(
                        (item, index) => (
                            <div key={index} className="monthly-selected-single">
                                <div className="blog-detail-articles">
                                    <div className="articles-title">
                                        <h4>{item.yearMonthStr}</h4>
                                    </div>
                                    <div className="articles-container">
                                        <table style={tableStyle}>
                                            <thead>
                                                <tr>
                                                    <td width="20%"><span>博客名称</span></td>
                                                    <td width="60%"><span>文章标题</span></td>
                                                    <td width="20%"><span>发布时间</span></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    item.postInfos.map(
                                                        (post, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td width="20%">
                                                                        <a href={`/blogs/${post.blogDomainName}`}>{post.blogName}</a>
                                                                    </td>
                                                                    <td width="60%">
                                                                        <a href={`/go?from=website&link=${encodeURIComponent(post.link)}`} target="_blank">{post.title}</a>
                                                                    </td>
                                                                    <td width="20%">
                                                                        <p style={dateStyle}>{formatDateStr(post.publishedAt)}</p>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
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