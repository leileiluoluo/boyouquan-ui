import { useEffect, useState } from 'react';

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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        document.title = '每月精选 - 博友圈 · 博客人的朋友圈！';

        fetchData(currentPage);

        // hasPre
        if (currentPage > 1) {
            setHasPre(true);
        } else {
            setHasPre(false);
        }

        // hasNext
        if (total > currentPage * pageSize) {
            setHasNext(true);
        } else {
            setHasNext(false);
        }

        console.log('total: ' + currentPage * pageSize);
    }, [currentPage, pageSize, total]);

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
                            <div className="monthly-selected-single">
                                <div className="blog-detail-articles">
                                    <div className="articles-title">
                                        <h4 key={`Outter-${index}`}>{item.yearMonthStr}</h4>
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
                                                        (itemt, indext) => {
                                                            return (
                                                                <tr key={`Inner-${indext}`}>
                                                                    <td width="20%">
                                                                        <a href={`/blogs/${itemt.blogDomainName}`}>{itemt.blogName}</a>
                                                                    </td>
                                                                    <td width="60%">
                                                                        <a href={`/go?link=${itemt.link}`} target="_blank">{itemt.title}</a>
                                                                    </td>
                                                                    <td width="20%">
                                                                        <p style={dateStyle}>{itemt.publishedAt}</p>
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