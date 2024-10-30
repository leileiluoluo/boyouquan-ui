import formatDateStr from '../../utils/DateUtil';

const blogStatisticsStyle = { fontSize: '16px', color: 'var(--secondary)' };

export default function BlogDetailSummary({ postCount, accessCount, latestPublishedAt, collectedAt }) {
    const latestPublishedAtFormatted = formatDateStr(latestPublishedAt);
    const collectedAtFormatted = formatDateStr(collectedAt);

    return (
        <footer className="blog-detail-summary">
            <div className="flex-item one">
                <p style={blogStatisticsStyle}>文章收录</p>
                <p>{postCount}</p>
            </div>
            <div className="flex-item two">
                <p style={blogStatisticsStyle}>文章浏览</p>
                <p>{accessCount}</p>
            </div>
            <div className="flex-item three">
                <p style={blogStatisticsStyle}>最近更新</p>
                <p>{latestPublishedAtFormatted}</p>
            </div>
            <div className="flex-item four">
                <p style={blogStatisticsStyle}>收录时间</p>
                <p>{collectedAtFormatted}</p>
            </div>
        </footer>
    )
}