import { getBlogAddress } from '../../utils/PageAddressUtil';

const style = { display: 'table', tableLayout: 'fixed' }

export default function BlogRequestTable({ name, description, domainName, address, rssAddress, adminEmail, requestedAt, approved, status, statusInfo, reason }) {
    const title = `博客「${name}」审核详情`;

    const blogAddress = approved ? getBlogAddress(domainName) : address;

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
                                    <p><a href={blogAddress}>{name}</a></p>
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
                                    <p><a href={blogAddress}>{statusInfo}</a></p>
                                </td>
                            </tr>
                            {
                                'rejected' === status ? <tr>
                                    <td width="20%">
                                        <span>失败原因</span>
                                    </td>
                                    <td width="80%">
                                        <p>{reason}</p>
                                    </td>
                                </tr> : ''
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}