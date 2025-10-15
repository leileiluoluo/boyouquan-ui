import { useEffect, useState, useRef } from 'react';
import { Button } from '@radix-ui/themes';
import RequestUtil from '../utils/APIRequestUtil';
import { NOT_FOUND_ADDRESS } from '../utils/PageAddressUtil';
import { useParams } from 'react-router-dom';
import { redirectTo } from '../utils/CommonUtil';
import { formatDateStr, getYearsTillNow } from '../utils/DateUtil';
import { stringToSixDigitNumber } from '../utils/StringUtil';
import domtoimage from 'dom-to-image-more';
import Meta from '../components/common/Meta';
import { Helmet } from 'react-helmet';
import '../tailwind.css';

const getMeta = (name, description) => {
    return {
        title: `${name}的履约证书 - 博友圈 · 博客人的朋友圈！`,
        keywords: name,
        description: description
    }
}

const headStyle = `
    * {
    box-sizing: border-box;
    }

    body {
    background: radial-gradient(#000, #111), #000 !important;
    min-height: 100vh !important;
    }

    canvas {
    margin-top: -800px !important;
    // position: fixed;
    height: 100vh;
    width: 100vw;
    pointer-events: none; /* 让 canvas 不阻止鼠标事件 */
    }

    @keyframes typing {
    50% {
        opacity: 0.0;
    }
    }
`;

const getDomain = () => {
    let { domain, sub, subsub } = useParams();
    if (sub !== undefined) domain += '/' + sub;
    if (subsub !== undefined) domain += '/' + subsub;
    return domain;
};

// 工具函数：将外部图片转 Base64 避免跨域问题
const toBase64 = async (url) => {
    if (!url) return '';
    try {
        const res = await fetch(url);
        const blob = await res.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    } catch (err) {
        console.error('转换图片为 Base64 失败:', url, err);
        return url; // 失败则使用原 URL
    }
};

export default function CertificatePage() {
    const domainName = getDomain();

    const certRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [blogDetail, setBlogDetail] = useState({});
    const [qrUrl, setQrUrl] = useState('');
    const [joinedDate, setJoinedDate] = useState('');
    const [level, setLevel] = useState('LEVEL 0');
    const [certificateId, setCertificateId] = useState(
        `BYQ-${new Date().toISOString().slice(0, 4)}-${stringToSixDigitNumber(domainName)}`
    );
    const [issueNumber, setIssueNumber] = useState(new Date().toISOString().slice(0, 10));

    const fetchData = async (domainName) => {
        const resp = await RequestUtil.get(`/api/blogs?domainName=${domainName}`);
        if (resp.status !== 200) {
            redirectTo(NOT_FOUND_ADDRESS);
            return;
        }
        const respBody = await resp.json();

        // 转换头像为 Base64
        const avatarUrl = respBody.blogAdminLargeImageURL
            ? await toBase64(`https://www.boyouquan.com${respBody.blogAdminLargeImageURL}`)
            : '';
        respBody.blogAdminLargeImageURL = avatarUrl;

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
        toBase64(
            `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
                verifyUrl
            )}`
        ).then(setQrUrl);
    }, [domainName]);

    const handleScreenCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: 'always' },
                audio: false,
            });

            const track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track);
            const bitmap = await imageCapture.grabFrame();

            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(bitmap, 0, 0);

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'screenshot.png';
                a.click();
                URL.revokeObjectURL(url);
            });

            track.stop();
        } catch (err) {
            console.error('截屏失败：', err);
        }
    };

    if (!loaded) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Meta meta={getMeta(blogDetail.name, blogDetail.description)} />
            <Helmet>
                <style>{headStyle}</style>
                <script src="/assets/js/tongji.js" type="text/javascript"></script>
            </Helmet>
            <div className="flex items-center justify-center min-h-screen bg-neutral-100 text-neutral-900 p-4 sm:p-8">
                <div className="relative w-full max-w-[960px] bg-black rounded-2xl p-4 sm:p-9 shadow-2xl">
                    {/* 证书内容区域 - 添加文字渲染优化样式 */}
                    <div
                        ref={certRef}
                        className="relative rounded-xl p-4 sm:p-8 bg-gradient-to-b from-neutral-900 to-neutral-900"
                        style={{
                            textRendering: 'optimizeLegibility',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale',
                        }}
                    >
                        {/* Header */}
                        <header className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center">
                                    <img
                                        width="40"
                                        height="40"
                                        className="rounded"
                                        src={blogDetail.blogAdminLargeImageURL}
                                        alt="博主头像"
                                    />
                                </div>
                                <div className="text-yellow-200 text-center sm:text-left">
                                    <div className="text-base sm:text-lg font-semibold break-all">
                                        <a
                                            href={`https://www.boyouquan.com/blogs/${domainName}`}
                                            target="_blank"
                                        >
                                            {domainName}
                                        </a>
                                    </div>
                                    <div className="text-xs opacity-80">
                                        收录于 {joinedDate} · {level} · 正常履约中
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Title */}
                        <div className="text-center my-6">
                            <h1 className="text-2xl sm:text-4xl text-yellow-400 tracking-widest uppercase mb-2">
                                履约证书
                            </h1>
                            <p className="text-yellow-100 opacity-90 text-sm sm:text-base">
                                兹证明如下网站满足博友圈各项要求，且正在博友圈正常履约中。
                            </p>
                        </div>

                        {/* Main Section */}
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 bg-neutral-800/70 p-4 sm:p-6 rounded-xl shadow-inner border border-yellow-600/20 w-full">
                                <div className="text-lg sm:text-2xl text-white mb-2 break-all">
                                    站点：
                                    <a
                                        href={`https://www.boyouquan.com/blogs/${domainName}`}
                                        target="_blank"
                                    >
                                        {domainName}
                                    </a>
                                </div>
                                <div className="text-yellow-100/90 text-sm sm:text-base">
                                    通过本站审核并达到 {level} 等级，本证书记录该网站的加入时间与履约信息。
                                </div>

                                <div className="grid grid-cols-2 sm:flex sm:gap-6 mt-4 items-center text-center sm:text-left">
                                    <div>
                                        <div className="text-xs sm:text-sm text-yellow-200/80">等级</div>
                                        <div className="text-yellow-400 font-bold text-base sm:text-lg">
                                            {level}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs sm:text-sm text-yellow-200/80">
                                            收录时间
                                        </div>
                                        <div className="text-yellow-400 font-bold text-base sm:text-lg">
                                            {joinedDate}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs sm:text-sm text-yellow-200/80">
                                            履约情况
                                        </div>
                                        <div className="text-yellow-400 font-bold text-base sm:text-lg">
                                            正常
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs sm:text-sm text-yellow-200/80">
                                            收录地址
                                        </div>
                                        <div className="text-white font-medium text-xs sm:text-sm break-all">
                                            <a
                                                href={`https://www.boyouquan.com/blogs/${domainName}`}
                                                target="_blank"
                                            >
                                                /blogs/{domainName}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 右侧金色徽章 */}
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center relative">
                                <div className="absolute inset-1 rounded-full bg-gradient-to-t from-yellow-100/30 to-transparent"></div>
                                <div className="text-center text-neutral-900 font-bold text-sm sm:text-lg leading-tight">
                                    CERTIFIED
                                    <br />
                                    <span className="text-[10px] sm:text-xs opacity-90">
                                        BY BOYOUQUAN.COM
                                    </span>
                                    <div className="text-xs sm:text-sm mt-1">Issued: {issueNumber}</div>
                                </div>
                                <div className="absolute inset-0 rounded-full border-2 border-yellow-700"></div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="flex flex-col sm:flex-row flex-wrap justify-between items-center mt-6 text-yellow-200 gap-3 sm:gap-4 text-center sm:text-left">
                            <div className="text-xs sm:text-sm">证书编号: {certificateId}</div>
                            <div className="text-xs sm:text-sm">
                                签发者:{' '}
                                <a href="https://www.boyouquan.com/home" target="_blank">
                                    博友圈
                                </a>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                                {qrUrl && (
                                    <img
                                        src={qrUrl}
                                        alt="验证二维码"
                                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-md border border-yellow-500/30"
                                    />
                                )}
                                <div className="text-[10px] sm:text-xs opacity-80">
                                    扫描验证证书真伪
                                </div>
                            </div>
                        </footer>
                    </div>

                    {/* 底部按钮区 */}
                    <div className="flex justify-center gap-4 mt-8 print:hidden">
                        <Button
                            variant="outline"
                            className="text-yellow-400 bg-black/80 rounded-lg text-sm sm:text-base px-4 py-2"
                            onClick={() => window.print()}
                        >
                            打印 / 导出
                        </Button>

                        <Button
                            variant="outline"
                            className="text-yellow-400 bg-black/80 rounded-lg text-sm sm:text-base px-4 py-2"
                            onClick={handleScreenCapture} // 调用截屏生成 PNG
                        >
                            截屏为 PNG
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}