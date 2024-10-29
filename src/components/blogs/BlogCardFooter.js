const statusOkBackgroundColorStyle = { backgroundColor: '#0dcb0d' };
const statusBadBackgroundColorStyle = { backgroundColor: 'red' };

export default function BlogCardFooter({ statusOk, submittedInfo, submittedInfoTip }) {
    return (
        <footer className="bottom-info">
            <div className="status-info">
                <div style={statusOk ? statusOkBackgroundColorStyle : statusBadBackgroundColorStyle} className="status-icon"></div>
                <p>{statusOk ? '运行良好' : '无法访问'}</p>
                <span className="tooltiptext">{statusOk ? '该博客运行状态良好' : '该博客目前无法访问'}</span>
            </div>
            <div className="submitted-info">
                <img src="/assets/images/sites/blog_detail/info-icon.png" />
                <p>{submittedInfo}</p>
                <span className="tooltiptext">{submittedInfoTip}</span>
            </div>
        </footer>
    )
}