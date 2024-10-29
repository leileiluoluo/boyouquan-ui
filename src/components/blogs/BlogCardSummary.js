import formatDateStr from '../../utils/DateUtil';

const highlightStyle = { color: '#cb2e58' };

export default function BlogCardSummary({ postCount, accessCount, collectedAt, latestPublishedAt, publishedAtHighlight, accessCountHighlight }) {
    const latestPublishedAtFormatted = formatDateStr(latestPublishedAt);
    const collectedAtFormatted = formatDateStr(collectedAt);

    return (
        <div className="summary">
            <div className="flex-item">
                <div className="title">
                    <p>文章收录</p>
                </div>
                <div className="count">
                    <p>{postCount}</p>
                </div>
            </div>
            <div className="flex-item">
                <div className="title">
                    <p style={accessCountHighlight ? highlightStyle : { color: 'inherit' }}>文章浏览</p>
                </div>
                <div className="count">
                    <p style={accessCountHighlight ? highlightStyle : { color: 'inherit' }}>{accessCount}</p>
                </div>
            </div>
            <div className="flex-item">
                <div className="title">
                    <p>最近更新</p>
                </div>
                <div className="count">
                    <p>{latestPublishedAtFormatted}</p>
                </div>
            </div>
            <div className="flex-item">
                <div className="title">
                    <p style={publishedAtHighlight ? highlightStyle : { color: 'inherit' }}>收录时间</p>
                </div>
                <div className="count">
                    <p style={publishedAtHighlight ? highlightStyle : { color: 'inherit' }}>{collectedAtFormatted}</p>
                </div>
            </div>
        </div>
    )
}