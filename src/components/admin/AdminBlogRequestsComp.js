import { useEffect, useState } from 'react';
import getURLParameter from '../../utils/CommonUtil';
import { getCookie } from '../../utils/CookieUtil';
import SearchBox from '../../components/common/SearchBox';

export default function AdminBlogRequestsComp() {
    const redStyle = { color: 'red' };
    const flexStyle = { display: 'flex', fontSize: '14px' };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [blogRequests, setBlogRequests] = useState([]);

    const [hasPre, setHasPre] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const fetchData = async (keyword, page) => {
        try {
            const sessionId = getCookie("sessionId");
            console.log('sessionId: ' + sessionId);

            const response = await fetch(`https://www.boyouquan.com/api/admin/blog-requests?keyword=${keyword}&page=${page}`, {
                method: 'GET',
                headers: {
                    'sessionid': sessionId,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resp = await response.json();
            if (resp.status == 'error') {
                window.location = '/admin/login';
            } else {
                setPageSize(resp.result.pageSize);
                setTotal(resp.result.total);
                setBlogRequests(resp.result.results);

                // hasPre
                if (page > 1) {
                    setHasPre(true);
                } else {
                    setHasPre(false);
                }

                // hasNext
                if (resp.result.total > page * resp.result.pageSize) {
                    setHasNext(true);
                } else {
                    setHasNext(false);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendLogout = async () => {
        try {
            const sessionId = getCookie("sessionId");

            const response = await fetch(`https://www.boyouquan.com/api/admin/logout`, {
                method: 'GET',
                headers: {
                    'sessionid': sessionId,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resp = await response.json();
            if (resp.status == 'error') {
                alert(resp.message);
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

    const logout = () => {
        sendLogout();
        window.location = '/admin/login';
    }

    return (
        <>
            <header className="post-header">
                <h3 className="post-title" style={redStyle}>
                    博客审核 - 管理页面
                </h3>
            </header>
            <div className="blog-requests">
                <div className="requests-header">
                    <h4 style={redStyle}><a href="/admin/blog-requests/add">提交博客 - 管理页面</a></h4>
                    <h4 style={redStyle}><a href="/admin/recommended-posts">推荐文章管理 - 管理页面</a></h4>
                    <div style={flexStyle}>
                        <p>olzhy</p>
                        <p><button onClick={() => logout()}> 退出登录</button></p>
                    </div>
                </div>
                <SearchBox placeholder='搜索已提交的博客 ↵' gotoPage='/admin/blog-requests' />
                <div className="requests-container">
                    <table>
                        <thead>
                            <tr>
                                <td><span>博客名称</span></td>
                                <td><span>博主邮箱</span></td>
                                <td><span>自行提交</span></td>
                                <td><span>提交时间</span></td>
                                <td><span>审核状态</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                blogRequests.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <p><a href={`/admin/blog-requests/${item.id}`}>{item.name}</a></p>
                                        </td>
                                        <td><p>{item.adminEmail}</p></td>
                                        <td><p>{item.selfSubmitted ? '是' : '否'}</p></td>
                                        <td><p>{item.requestedAt}</p></td>
                                        <td>
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