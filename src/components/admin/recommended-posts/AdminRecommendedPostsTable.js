import { redirectTo } from '../../../utils/CommonUtil';
import { getCookie } from '../../../utils/CookieUtil';
import { ADMIN_RECOMMENDED_POSTS_ADDRESS } from '../../../utils/PageAddressUtil';
import RequestUtil from '../../../utils/RequestUtil';

const redStyle = { color: 'red' };
const greenStyle = { color: 'green' };

const unpin = (link) => {
    RequestUtil.patch('https://www.boyouquan.com/api/admin/recommended-posts/unpin', JSON.stringify({ link: link }), {
        'Content-Type': 'application/json',
        'username': getCookie('username'),
        'sessionId': getCookie('sessionId')
    });

    redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS, 3);
};

const pin = (link) => {
    RequestUtil.patch('https://www.boyouquan.com/api/admin/recommended-posts/pin', JSON.stringify({ link: link }), {
        'Content-Type': 'application/json',
        'username': getCookie('username'),
        'sessionId': getCookie('sessionId')
    });

    redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS, 3);
};

export default function AdminRecommendedPostsTable({ posts }) {
    return (
        <div className="blog-requests">
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
    )
}