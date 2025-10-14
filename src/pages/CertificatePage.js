import { useEffect, useState } from 'react';
import '../tailwind.css';
import { Button } from '@radix-ui/themes';
import RequestUtil from '../utils/APIRequestUtil';
import { NOT_FOUND_ADDRESS } from '../utils/PageAddressUtil';
import { useParams } from 'react-router-dom';
import { redirectTo } from '../utils/CommonUtil';
import { formatDateStr, getYearsTillNow } from '../utils/DateUtil';
import { stringToSixDigitNumber } from '../utils/StringUtil';

const getDomain = () => {
    let { domain, sub, subsub } = useParams();
    if (undefined !== sub) {
        domain += '/' + sub;
    }
    if (undefined !== subsub) {
        domain += '/' + subsub;
    }
    return domain;
}

export default function CertificatePage() {
    const domainName = getDomain();

    const [loaded, setLoaded] = useState(false);
    const [blogDetail, setBlogDetail] = useState({});
    const [qrUrl, setQrUrl] = useState('');
    const [joinedDate, setJoinedDate] = useState('');
    const [level, setLevel] = useState('LEVEL 0');
    const [certificateId, setCertificateId] = useState(`BYQ-${new Date().toISOString().slice(0, 4)}-${stringToSixDigitNumber(domainName)}`);
    const [issueNumber, setIssueNumber] = useState(new Date().toISOString().slice(0, 10));

    const fetchData = async (domainName) => {
        const resp = await RequestUtil.get(`/api/blogs?domainName=${domainName}`);

        if (resp.status != 200) {
            redirectTo(NOT_FOUND_ADDRESS);
        }
        const respBody = await resp.json();
        setBlogDetail(respBody);
        setLoaded(true);

        const collectedAt = formatDateStr(respBody.collectedAt, true);
        setJoinedDate(collectedAt);

        const years = getYearsTillNow(respBody.collectedAt);
        setLevel(`LEVEL ${years}`);
    };

    useEffect(() => {
        fetchData(domainName);

        const verifyUrl = `https://www.boyouquan.com/certificates/${domainName}`;
        setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(verifyUrl)}`);
    }, [domainName]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-100 text-neutral-900">
            {/* 编辑/打印按钮 */}
            <div className="absolute bg-black rounded-1xl top-4 right-4 flex gap-2">
                <Button variant="outline" className="text-yellow-400" onClick={() => window.print()}>打印/导出</Button>
            </div>
            <div className="relative w-[960px] max-w-[94vw] bg-black rounded-2xl p-9 shadow-2xl">
                <div className="relative rounded-xl p-8 bg-gradient-to-b from-neutral-900 to-neutral-900">
                    {/* Header */}
                    <header className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center">
                                <img width="40px" height="40px" src={`https://www.boyouquan.com${blogDetail.blogAdminLargeImageURL}`} />
                            </div>
                            <div className="text-yellow-200">
                                <div className="text-lg font-semibold"><a href={`https://www.boyouquan.com/blogs/${domainName}`} target="_blank">{domainName}</a></div>
                                <div className="text-xs opacity-80">收录于 {joinedDate} · {level} · 正常履约中</div>
                            </div>
                        </div>
                    </header>

                    {/* Title */}
                    <div className="text-center my-6">
                        <h1 className="text-4xl text-yellow-400 tracking-widest uppercase mb-2">履约证书</h1>

                        <p className="text-yellow-100 opacity-90">兹证明如下网站满足博友圈各项要求，且正在博友圈正常履约中。</p>
                    </div>

                    {/* Main Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 bg-neutral-800/70 p-6 rounded-xl shadow-inner border border-yellow-600/20">
                            <div className="text-2xl text-white mb-2">站点：<a href={`https://www.boyouquan.com/blogs/${domainName}`} target="_blank">{domainName}</a></div>
                            <div className="text-yellow-100/90">通过本站审核并达到 {level} 等级，本证书记录该网站的加入时间与履约信息。</div>
                            <div className="flex gap-6 mt-4 items-center">
                                <div>
                                    <div className="text-sm text-yellow-200/80">等级</div>
                                    <div className="text-yellow-400 font-bold text-lg">{level}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-yellow-200/80">收录时间</div>
                                    <div className="text-yellow-400 font-bold text-lg">{joinedDate}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-yellow-200/80">履约情况</div>
                                    <div className="text-yellow-400 font-bold text-lg">正常</div>
                                </div>
                                <div>
                                    <div className="text-sm text-yellow-200/80">收录地址</div>
                                    <div className="text-white font-medium"><a href={`https://www.boyouquan.com/blogs/${domainName}`} target="_blank">/blogs/{domainName}</a></div>
                                </div>
                            </div>
                        </div>

                        {/* 右侧金色徽章 */}
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center relative">
                            {/* 内圈高光 */}
                            <div className="absolute inset-1 rounded-full bg-gradient-to-t from-yellow-100/30 to-transparent"></div>
                            {/* 内文字 */}
                            <div className="text-center text-neutral-900 font-bold text-lg">
                                CERTIFIED
                                <br />
                                <span className="text-xs opacity-90">BY BOYOUAUAN.COM</span>
                                <div className="text-xs text-lg">Issued: {issueNumber}</div>
                            </div>
                            {/* 外圈阴影边框 */}
                            <div className="absolute inset-0 rounded-full border-2 border-yellow-700"></div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="flex flex-wrap justify-between items-center mt-6 text-yellow-200 gap-4">
                        <div className="text-sm">证书编号: {certificateId}</div>
                        <div className="text-sm">签发者: <a href="https://www.boyouquan.com/home">博友圈</a></div>
                        <div className="flex items-center gap-3">
                            {qrUrl && <img src={qrUrl} alt="验证二维码" className="w-16 h-16 rounded-md border border-yellow-500/30" />}
                            <div className="text-xs opacity-80">扫描验证证书真伪</div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
