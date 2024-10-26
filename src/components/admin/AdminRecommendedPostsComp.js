import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/CookieUtil';

export default function AdminRecommendedPostsComp() {
    const redStyle = { color: 'red' };
    const greenStyle = { color: 'green' };
    const flexStyle = { display: 'flex', fontSize: '14px' };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [posts, setPosts] = useState([]);

    const [hasPre, setHasPre] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    const operation = async (url, method, formData) => {
        try {
            alert(JSON.stringify(formData));
            const sessionId = getCookie("sessionId");

            const response = await fetch(url, {
                method: method,
                headers: {
                    'sessionId': sessionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resp = await response.json();
            if (resp.status == 'error') {
                alert(resp.message);
            } else {
                setTimeout(function () {
                    window.location.href = '/admin/recommended-posts';
                }, 3 * 1000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async (page) => {
        try {
            const sessionId = getCookie("sessionId");
            console.log('sessionId: ' + sessionId);

            const response = await fetch(`https://www.boyouquan.com/api/admin/recommended-posts?page=${page}`, {
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
                setPosts(resp.result.results);

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
        fetchData(currentPage);
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);

        document.getElementsByClassName('blog-requests')[0].scrollIntoView();
    }

    const logout = () => {
        sendLogout();
        window.location = '/admin/login';
    }

    const unpin = (link) => {
        operation(`https://www.boyouquan.com/api/admin/recommended-posts/unpin`, 'PATCH', { link: link });
    };

    const pin = (link) => {
        operation(`https://www.boyouquan.com/api/admin/recommended-posts/pin`, 'PATCH', { link: link });
    };

    return (
        <>
            <header className="post-header">
                <h3 className="post-title" style={redStyle}>
                    推荐文章管理 - 管理页面
                </h3>
            </header>
            <div className="blog-requests">
                <div className="requests-header">
                    <h4 style={redStyle}><a href="/admin/blog-requests/add">提交博客 - 管理页面</a></h4>
                    <h4 style={redStyle}><a href="/admin/recommended-posts/add">推荐文章 - 管理页面</a></h4>
                    <div style={flexStyle}>
                        <p>olzhy</p>
                        <p><button onClick={() => logout()}> 退出登录</button></p>
                    </div>
                </div>
                <div className="requests-container">
                    <table>
                        <thead>
                            <tr>
                                <td><span>文章标题</span></td>
                                <td><span>博客名称</span></td>
                                <td><span>发布时间</span></td>
                                <td><span>操作</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map(
                                    (post, index) => (
                                        <tr key={index}>
                                            <td><a href={`/go?from=website&link=${post.link}`}>{post.title}</a></td>
                                            <td><a href="/blogs/www.xiangshitan.com">{post.blogName}</a></td>
                                            <td>
                                                <p>{post.publishedAt}</p>
                                            </td>
                                            <td>
                                                {
                                                    post.pinned ? <button style={redStyle} onClick={() => unpin(post.link)}>取消置顶</button>
                                                        : <button style={greenStyle} onClick={() => pin(post.link)}>置顶</button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                )
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