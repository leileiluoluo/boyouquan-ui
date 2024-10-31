const noticeStyle = { color: '#cb2e58' };

export default function AbstractNotice() {
    return (
        <header className="notice">
            <p style={noticeStyle}>* 原始文章地址可能暂时无法访问，本页为文章的摘要信息</p>
        </header>
    )
}