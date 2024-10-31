import { useEffect, useState } from 'react';
import formatDateStr from '../../utils/DateUtil';
import RequestUtil from '../../utils/RequestUtil';

const postsTableStyle = { display: 'table', tableLayout: 'fixed' };
const postTableClumn20Style = { width: '20%' };
const postTableClumn80Style = { width: '80%' };
const textStyle = { marginRight: '6px' };

export default function BlogPosts({ domain, blogStatusOk }) {
    const [showPostsLimit, setShowPostsLimit] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/blogs/posts?domainName=${domain}`);

        const respBody = await resp.json();
        setPosts(respBody);

        if (respBody.length == 100) {
            setShowPostsLimit(true);
        }
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <div className="blog-detail-articles">
            <div className="articles-title">
                <h4>收录文章</h4>
            </div>
            <div className="articles-container">
                <table style={postsTableStyle}>
                    <tbody>
                        {
                            posts.map(
                                (post, index) => (
                                    <tr key={index}>
                                        <td style={postTableClumn20Style}>
                                            <p style={textStyle}>{formatDateStr(post.publishedAt, true)}</p>
                                        </td>

                                        <td style={postTableClumn80Style}>
                                            {
                                                blogStatusOk ? <a href={`/go?from=website&link=${encodeURIComponent(post.link)}`} target="_blank">{post.title}</a>
                                                    : <a href={`/abstract?link=${encodeURIComponent(post.link)}`} target="_blank">{post.title}</a>
                                            }
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                showPostsLimit ? <div className="articles-footer">
                    <p>* 仅显示最新100篇文章</p>
                </div> : ''
            }
        </div>
    )
}