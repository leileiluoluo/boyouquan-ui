const style = { display: 'table', tableLayout: 'fixed' }

export default function BlogRequestTable({ name, description, rssAddress, adminEmail, requestedAt, statusInfo }) {
    const title = `博客「${name}」审核详情`;

    return (
        <>
            <header className="post-header">
                <h3 className="post-title">{title}</h3>
            </header>
            <div className="blog-requests">
                <div className="requests-container">
                    <table style={style}>
                        <tbody>
                            <tr>
                                <td width="20%">
                                    <span>博客名称</span>
                                </td>
                                <td width="80%">
                                    <p><a href="">{name}</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>博客描述</span>
                                </td>
                                <td width="80%">
                                    <p>{description}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>RSS 地址</span>
                                </td>
                                <td width="80%">
                                    <p><a href={rssAddress}>{rssAddress}</a></p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>博主邮箱</span>
                                </td>
                                <td width="80%">
                                    <p>{adminEmail}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>提交时间</span>
                                </td>
                                <td width="80%">
                                    <p>{requestedAt}</p>
                                </td>
                            </tr>
                            <tr>
                                <td width="20%">
                                    <span>审核状态</span>
                                </td>
                                <td width="80%">
                                    <p>{statusInfo}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}