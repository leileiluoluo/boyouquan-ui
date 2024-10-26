import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getCookie } from '../../utils/CookieUtil';

export default function AdminBlogRequestComp() {
    const style = { display: 'table', tableLayout: 'fixed' }
    const redStyle = { color: 'red' };
    const greenStyle = { color: 'green' };
    const fontSize14Style = { fontSize: '14px' };
    const inputStyle = { width: '400px', border: '2px solid var(--primary)', caretColor: 'var(--content)', color: 'var(--content)' };

    const [formData, setFormData] = useState({ reason: '' });
    const [item, setItem] = useState({ 'posts': [] });

    const { id } = useParams();

    const operation = async (url, method, formData) => {
        try {
            const sessionId = getCookie("sessionId");

            const response = await fetch(url, {
                method: method,
                headers: {
                    'sessionId': sessionId,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resp = await response.json();
            if (resp.status == 'error') {
                alert(resp.message);
            } else {
                setTimeout(function () {
                    window.location.href = '/admin/blog-requests';
                }, 3 * 1000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async (id) => {
        try {
            const sessionId = getCookie("sessionId");

            const response = await fetch(`https://www.boyouquan.com/api/admin/blog-requests/${id}`, {
                method: 'GET',
                headers: {
                    'sessionid': sessionId,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setItem(resp.result);

            document.title = '博客「' + resp.result.name + '」审核详情 - 博友圈 · 博客人的朋友圈！';
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const approve = (e) => {
        e.preventDefault();

        const url = `https://www.boyouquan.com/api/admin/blog-requests/approve/${id}`;
        operation(url, 'PATCH', formData);
    }

    const reject = (e) => {
        e.preventDefault();

        const url = `https://www.boyouquan.com/api/admin/blog-requests/reject/${id}`;
        operation(url, 'PATCH', formData);
    }

    const uncollected = (e) => {
        e.preventDefault();

        const url = `https://www.boyouquan.com/api/admin/blog-requests/${id}/uncollected`;
        operation(url, 'PATCH', formData);
    }

    const deleteAllInfos = (e) => {
        e.preventDefault();

        const url = `https://www.boyouquan.com/api/admin/blog-requests/${id}`;
        operation(url, 'DELETE', formData);
    }

    return (
        <>
            <Helmet>
                <meta name="keywords" content={item.name} />
                <meta name="description" content={item.description} />
                <meta property="og:title" content={item.name} />
                <meta property="og:description" content={item.description} />
            </Helmet>
            <header className="post-header">
                <h3 className="post-title">{`博客「${item.name}」审核详情`}</h3>
            </header>
            <div className="blog-requests">
                <div className="requests-header">
                    <h4 style={redStyle}><a href="/admin/blog-requests">返回「博客列表 - 管理页面」</a></h4>
                </div>
                <div className="requests-container">
                    <table style={style}>
                        <tbody>
                            <tr>
                                <td width="20%">
                                    <span>博客名称</span>
                                </td>
                                <td width="80%">
                                    <p><a href="">{item.name}</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>博客描述</span>
                                </td>
                                <td width="80%">
                                    <p>{item.description}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>RSS 地址</span>
                                </td>
                                <td width="80%">
                                    <p><a href={item.rssAddress}>{item.rssAddress}</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>博主邮箱</span>
                                </td>
                                <td width="80%">
                                    <p>{item.adminEmail}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>提交时间</span>
                                </td>
                                <td width="80%">
                                    <p>{item.requestedAt}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>博客详情页</span>
                                </td>
                                <td width="80%">
                                    <p><a href={`/blogs/${item.domainName}`}>{`/blogs/${item.domainName}`}</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>草稿文章抓取</span>
                                </td>
                                <td width="80%">
                                    <ul style={fontSize14Style}>
                                        {
                                            item.posts.map(
                                                (post, index) => (
                                                    <li key={index}>
                                                        <a href={post.link}>{post.title}</a>
                                                    </li>
                                                )
                                            )
                                        }
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>审核信息</span>
                                </td>
                                <td width="80%">
                                    <p>{item.reason}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>审核状态</span>
                                </td>
                                <td width="80%">
                                    <p>{item.statusInfo}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>操作</span>
                                </td>
                                <td width="80%">
                                    {
                                        item.status == 'system_check_valid' ? <p>
                                            <form onSubmit={approve}>
                                                <button style={greenStyle} type="submit">审批通过</button>
                                            </form>
                                        </p> : ''
                                    }

                                    <p>
                                        <form onSubmit={reject}>
                                            <input style={inputStyle} name="reason" onChange={handleChange} />
                                            <button style={redStyle} type="submit">驳回</button>
                                        </form>
                                    </p>

                                    <p>
                                        <form onSubmit={uncollected}>
                                            <input style={inputStyle} name="reason" onChange={handleChange} />
                                            <button style={redStyle} type="submit">移出收录名单</button>
                                        </form>
                                    </p>

                                    <p>
                                        <form onSubmit={deleteAllInfos}>
                                            <button style={redStyle} type="submit">删除全部数据</button>
                                        </form>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}