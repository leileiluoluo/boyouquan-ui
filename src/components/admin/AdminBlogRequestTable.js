import { useState } from 'react';
import { redirectTo } from '../../utils/CommonUtil';
import { ADMIN_BLOG_REQUESTS_ADDRESS, getBlogAddress } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { getCookie } from '../../utils/CookieUtil';

const style = { display: 'table', tableLayout: 'fixed' }
const redStyle = { color: 'red' };
const greenStyle = { color: 'green' };
const fontSize14Style = { fontSize: '14px' };
const inputStyle = { width: '400px', border: '2px solid var(--primary)', caretColor: 'var(--content)', color: 'var(--content)' };

export default function AdminBlogRequestTable({ blogRequest }) {
    const id = blogRequest.id;
    const blogAddress = getBlogAddress(blogRequest.domainName);

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const approve = (e) => {
        e.preventDefault();

        const url = `/api/admin/blog-requests/${id}/approve`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    }

    const reject = (e) => {
        e.preventDefault();

        const url = `/api/admin/blog-requests/${id}/reject`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    }

    const uncollected = (e) => {
        e.preventDefault();

        const url = `/api/admin/blog-requests/${id}/uncollected`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    }

    const deleteAllInfos = (e) => {
        e.preventDefault();

        const url = `/api/admin/blog-requests/${id}`;
        RequestUtil.delete(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    }

    return (
        <div className="blog-requests">
            <div className="requests-container">
                <table style={style}>
                    <tbody>
                        <tr>
                            <td width="20%">
                                <span>博客名称</span>
                            </td>
                            <td width="80%">
                                <p><a href="">{blogRequest.name}</a></p>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <span>博客描述</span>
                            </td>
                            <td width="80%">
                                <p>{blogRequest.description}</p>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <span>RSS 地址</span>
                            </td>
                            <td width="80%">
                                <p><a href={blogRequest.rssAddress}>{blogRequest.rssAddress}</a></p>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <span>博主邮箱</span>
                            </td>
                            <td width="80%">
                                <p>{blogRequest.adminEmail}</p>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <span>提交时间</span>
                            </td>
                            <td width="80%">
                                <p>{blogRequest.requestedAt}</p>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <span>博客详情页</span>
                            </td>
                            <td width="80%">
                                <p><a href={blogAddress}>{blogAddress}</a></p>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <span>草稿文章抓取</span>
                            </td>
                            <td width="80%">
                                <ul style={fontSize14Style}>
                                    {
                                        blogRequest.posts.map(
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
                                <span>失败原因</span>
                            </td>
                            <td width="80%">
                                <p>{blogRequest.reason}</p>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <span>审核状态</span>
                            </td>
                            <td width="80%">
                                <p>{blogRequest.statusInfo}</p>
                            </td>
                        </tr>
                        <tr>
                            <td width="20%">
                                <span>操作</span>
                            </td>
                            <td width="80%">
                                {
                                    blogRequest.status == 'system_check_valid' ? <p>
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
    )
}