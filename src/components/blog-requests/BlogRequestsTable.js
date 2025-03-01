import { formatDateStr } from '../../utils/DateUtil';
import { getAdminBlogRequestAddress, getBlogRequestAddress } from '../../utils/PageAddressUtil';

export default function BlogRequestsTable({ requests, adminPage }) {
    return (
        <div className="blog-requests">
            <div className="requests-container">
                <table>
                    <thead>
                        <tr>
                            <td width="30%"><span>博客名称</span></td>
                            <td width="20%"><span>博主邮箱</span></td>
                            <td width="20%"><span>提交时间</span></td>
                            { adminPage ? <td width="20%"><span>自行提交</span></td> : ''}
                            <td width="10%"><span>审核状态</span></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((request, index) => (
                                <tr key={index}>
                                    <td width="30%">
                                        <p><a href={adminPage ? getAdminBlogRequestAddress(request.id) : getBlogRequestAddress(request.id)}>{request.name}</a></p>
                                    </td>
                                    <td width="20%"><p>{request.adminEmail}</p></td>
                                    <td width="20%"><p>{formatDateStr(request.requestedAt, true)}</p></td>
                                    { adminPage ? <td width="20%">{request.selfSubmitted ? '是' : '否'}</td> : ''}
                                    <td width="10%">
                                        <p>{request.statusInfo}</p>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}