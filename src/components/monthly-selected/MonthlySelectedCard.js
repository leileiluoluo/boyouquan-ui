import formatDateStr from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress } from '../../utils/PageAddressUtil';

const tableStyle = { display: 'table', tableLayout: 'fixed' };
const dateStyle = { marginRight: '6px' };

export default function MonthlySelectedCard({ yearMonthStr, postInfos }) {
    return (
        <div className="monthly-selected-single">
            <div className="blog-detail-articles">
                <div className="articles-title">
                    <h4>{yearMonthStr}</h4>
                </div>
                <div className="articles-container">
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <td width="20%"><span>博客名称</span></td>
                                <td width="60%"><span>文章标题</span></td>
                                <td width="20%"><span>发布时间</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                postInfos.map(
                                    (postInfo, index) => (
                                        <tr key={index}>
                                            <td width="20%">
                                                <a href={getBlogAddress(postInfo.blogDomainName)}>{postInfo.blogName}</a>
                                            </td>
                                            <td width="60%">
                                                {
                                                    postInfo.blogStatusOk ? <a href={getGoAddress(postInfo.link)} target="_blank">{postInfo.title}</a>
                                                        : <a href={getAbstractAddress(postInfo.link)} target="_blank">{postInfo.title}</a>
                                                }
                                            </td>
                                            <td width="20%">
                                                <p style={dateStyle}>{formatDateStr(postInfo.publishedAt, true)}</p>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}