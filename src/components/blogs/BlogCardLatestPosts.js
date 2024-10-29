import formatDateStr from '../../utils/DateUtil';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';

const marginRightStyle = { marginRight: '6px', color: 'var(--secondary)' };

export default function BlogCardLatestPosts({ statusOk, posts }) {
    return (
        <div className="latest-posts">
            <p>最新文章</p>
            {
                posts.map(
                    (post, index) => (
                        <p key={index}>
                            <a style={marginRightStyle}>{formatDateStr(post.publishedAt, true)}</a>

                            {statusOk ? <a href={getGoAddress(post.link)} target="_blank">{post.title}</a>
                                : <a href={getAbstractAddress(post.link)} target="_blank">{post.title}</a>}
                        </p>
                    )
                )
            }
        </div>
    )
}