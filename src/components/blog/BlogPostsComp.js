import { useEffect, useState } from 'react';
import formatDateStr from '../../utils/DateUtil';

export default function BlogPostsComp({ domain }) {
    const postsTableStyle = { display: 'table', tableLayout: 'fixed' };
    const postTableClumn20Style = { width: '20%' };
    const postTableClumn80Style = { width: '80%' };
    const textStyle = { marginRight: '6px' };

    const [showPostsLimit, setShowPostsLimit] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchData = async (domain) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/blogs/posts?domainName=${domain}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setPosts(resp);

            if (resp.length == 100) {
                setShowPostsLimit(true);
            }
        } catch (error) {
            console.error(error);
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
                                            <a href={`/go?from=website&link=${encodeURIComponent(post.link)}`} target="_blank">{post.title}</a>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                showPostsLimit ? <div class="articles-footer">
                    <p>* 仅显示最新100篇文章</p>
                </div> : ''
            }
        </div>
    )
}