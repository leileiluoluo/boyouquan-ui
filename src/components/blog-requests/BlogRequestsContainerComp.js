import { useEffect, useState } from 'react';
import getURLParameter from '../../utils/CommonUtil';
import formatDateStr from '../../utils/DateUtil';

export default function BlogRequestsContainerComp() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogRequests, setBlogRequests] = useState([]);

    const [hasPre, setHasPre] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const fetchData = async (keyword, page) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/blog-requests?keyword=${keyword}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();

            setPageSize(resp.pageSize);
            setTotal(resp.total);
            setBlogRequests(resp.results);

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
        let keyword = getURLParameter('keyword') || '';
        fetchData(keyword, currentPage);
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

        document.getElementsByClassName('blog-requests')[0].scrollIntoView();
    }

    return (
        <>
            <div className="blog-requests">
                <div className="requests-container">
                    <table>
                        <thead>
                            <tr>
                                <td width="35%"><span>博客名称</span></td>
                                <td width="35%"><span>博主邮箱</span></td>
                                <td width="20%"><span>提交时间</span></td>
                                <td width="10%"><span>审核状态</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                blogRequests.map((item, index) => (
                                    <tr key={index}>
                                        <td width="35%">
                                            <p><a href={`/blog-requests/${item.id}`}>{item.name}</a></p>
                                        </td>
                                        <td width="35%"><p>{item.adminEmail}</p></td>
                                        <td width="20%"><p>{formatDateStr(item.requestedAt, true)}</p></td>
                                        <td width="10%">
                                            <p>{item.statusInfo}</p>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
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