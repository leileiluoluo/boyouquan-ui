import { useEffect, useState, useRef } from 'react';
import { Button } from '@radix-ui/themes';
import RequestUtil from '../utils/APIRequestUtil';
import { NOT_FOUND_ADDRESS } from '../utils/PageAddressUtil';
import { useParams } from 'react-router-dom';
import { redirectTo } from '../utils/CommonUtil';
import { formatDateStr, getYearsTillNow } from '../utils/DateUtil';
import { stringToSixDigitNumber } from '../utils/StringUtil';
import Meta from '../components/common/Meta';
import { Helmet } from 'react-helmet';
import html2canvas from 'html2canvas';

const getMeta = (name, description) => {
    return {
        title: `${name}的履约证书 - 博友圈 · 博客人的朋友圈！`,
        keywords: name,
        description: description
    }
}

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
    const [selectedTheme, setSelectedTheme] = useState('dark'); // 'dark' or 'dim'
    const [copied, setCopied] = useState(false);

    // 两个不同的代码片段（你可以按需修改具体代码内容）
    const darkCode = `<a href="https://www.boyouquan.com/certificates/${domainName}" title="正在博友圈履约中" target="_blank"><img style="height: 26px;" src="https://www.boyouquan.com/images/logo/performance-dark.svg?domainName=${domainName}" alt="正在博友圈履约中" /></a>`;
    const dimCode = `<a href="https://www.boyouquan.com/certificates/${domainName}" title="正在博友圈履约中" target="_blank"><img style="height: 26px;" src="https://www.boyouquan.com/images/logo/performance.svg?domainName=${domainName}" alt="正在博友圈履约中" /></a>`;

    const currentCode = selectedTheme === 'dark' ? darkCode : dimCode;

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
        const collectedAt = formatDateStr(respBody.collectedAt, true);
        setJoinedDate(collectedAt);

        const years = getYearsTillNow(respBody.collectedAt);
        setLevel(`LEVEL ${years}`);

        setLoaded(true);
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
            const element = document.getElementById('capture-area');
            if (!element) {
                throw new Error('未找到截图区域');
            }

            // 保存原始状态
            const originalScrollY = window.scrollY;
            const originalOverflow = document.body.style.overflow;

            // 防止滚动干扰
            document.body.style.overflow = 'hidden';

            // 滚动到元素位置
            window.scrollTo(0, element.offsetTop);

            // 增加等待时间确保渲染完成
            await new Promise(resolve => setTimeout(resolve, 500));

            // 检查元素是否包含图片等资源
            const images = element.getElementsByTagName('img');
            const imageLoadPromises = [];

            // 预加载所有图片
            for (let img of images) {
                if (img.complete) continue;

                const promise = new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = resolve; // 即使加载失败也继续
                    // 重新触发图片加载
                    img.src = img.src + (img.src.includes('?') ? '&' : '?') + 't=' + Date.now();
                });
                imageLoadPromises.push(promise);
            }

            // 等待图片加载或超时
            if (imageLoadPromises.length > 0) {
                await Promise.race([
                    Promise.all(imageLoadPromises),
                    new Promise(resolve => setTimeout(resolve, 2000))
                ]);
            }

            // 进一步等待渲染
            await new Promise(resolve => setTimeout(resolve, 300));

            const canvas = await html2canvas(element, {
                scale: window.devicePixelRatio || 1, // 使用设备像素比
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#ffffff',
                logging: true,
                removeContainer: true, // 清理临时容器

                // 移动端优化配置
                width: Math.min(element.scrollWidth, 2000), // 限制最大宽度
                height: Math.min(element.scrollHeight, 4000), // 限制最大高度

                // 性能优化
                async: true,
                proxy: null, // 禁用代理

                // 忽略元素配置
                ignoreElements: (element) => {
                    if (element.classList?.contains('ignore-capture')) {
                        return true;
                    }
                    // 忽略视频等复杂元素
                    if (element.tagName === 'VIDEO' || element.tagName === 'IFRAME') {
                        return true;
                    }
                    return false;
                },

                // 图像处理配置
                imageTimeout: 15000, // 增加图片加载超时时间
                onclone: (clonedDoc, clonedElement) => {
                    // 确保克隆元素样式正确
                    clonedElement.style.width = 'auto';
                    clonedElement.style.height = 'auto';
                    clonedElement.style.overflow = 'visible';
                    clonedElement.style.position = 'static';

                    // 处理克隆的图片
                    const clonedImages = clonedElement.getElementsByTagName('img');
                    for (let img of clonedImages) {
                        if (!img.complete || img.naturalHeight === 0) {
                            // 替换加载失败的图片
                            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYc8L3RleHQ+PC9zdmc+';
                        }
                    }
                }
            });

            // 恢复原始状态
            document.body.style.overflow = originalOverflow;
            window.scrollTo(0, originalScrollY);

            // 处理图片数据 - 移动端优化
            let imageData;
            try {
                imageData = canvas.toDataURL('image/png', 0.9); // 降低质量减少大小
            } catch (dataError) {
                console.warn('高质量导出失败，尝试低质量:', dataError);
                imageData = canvas.toDataURL('image/jpeg', 0.7); // 尝试JPEG格式
            }

            // 下载处理 - 移动端兼容
            if (imageData.length > 2000000) { // 如果图片大于2MB
                console.warn('图片尺寸较大，可能下载失败');
            }

            const link = document.createElement('a');
            link.download = `履约证书-${domainName}-${new Date().toISOString().slice(0, 10)}.png`;
            link.href = imageData;

            // 移动端特殊处理
            document.body.appendChild(link);

            // 触发下载
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            link.dispatchEvent(clickEvent);

            // 延迟移除链接
            setTimeout(() => {
                document.body.removeChild(link);
            }, 100);

        } catch (error) {
            console.error('截图失败:', error);

            // 恢复状态
            document.body.style.overflow = originalOverflow;
            if (originalScrollY !== undefined) {
                window.scrollTo(0, originalScrollY);
            }

            // 更友好的错误提示
            if (error.message.includes('security') || error.message.includes('tainted')) {
                alert('截图失败：安全限制，请确保所有图片来自可信源');
            } else if (error.message.includes('memory') || error.message.includes('size')) {
                alert('截图失败：内容过大，请尝试缩小内容范围');
            } else {
                alert('截图失败，请重试或联系技术支持');
            }
        }
    };

    if (!loaded) {
        return <div>加载中...</div>;
    }

    return (
        <>
            <Meta meta={getMeta(blogDetail.name, blogDetail.description)} />
            <Helmet>
                <link rel="stylesheet" href="/assets/css/tailwind/tailwind.css" />
                <script src="/assets/js/tongji.js" type="text/javascript"></script>
            </Helmet>
            <div style={{ backgroundColor: 'white' }}>
                <div id="capture-area" className="flex items-center justify-center min-h-screen bg-neutral-100 text-neutral-900 p-4 sm:p-8">
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
                            <header className="flex items-start justify-between mb-6 gap-4">
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
                                    <div className="text-yellow-200">
                                        <div className="text-base sm:text-lg font-semibold break-all">
                                            <a
                                                href={`/blogs/${domainName}`}
                                                target="_blank"
                                            >
                                                {blogDetail.name} ({domainName})
                                            </a>
                                        </div>
                                        <div className="text-xs opacity-80">
                                            收录于 {joinedDate} · {level} · 履约中
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* Title */}
                            <div className="text-center my-6">
                                <h1 className="text-4xl text-yellow-400 mb-6 break-all" style={{ fontSize: '30px' }}>
                                    履约证书
                                </h1>
                                <p className="text-lg sm:text-1xl text-yellow-100 break-all">
                                    兹证明如下博客正在与「<a href="https://www.boyouquan.com/" target="_blank">博友圈</a>」正常履约中，未有不可访问及中途毁约等情形。
                                </p>
                            </div>

                            {/* Main Section */}
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1 bg-neutral-800/70 p-4 sm:p-6 rounded-xl shadow-inner border border-yellow-600/20 w-full">
                                    <div className="text-lg sm:text-1xl text-white mb-2 break-all">
                                        博客域名：
                                        <a
                                            href={`/blogs/${domainName}`}
                                            target="_blank"
                                        >
                                            {domainName}
                                        </a>
                                    </div>
                                    <div className="text-yellow-100/90 text-sm sm:text-base break-all">
                                        本证书可证明该博客的收录时间、收录地址、博客等级与履约情况等信息在「<a href="https://www.boyouquan.com/" target="_blank">博友圈</a>」真实有效。
                                    </div>

                                    <div className="grid grid-cols-2 sm:flex sm:gap-6 mt-4 items-center text-center sm:text-left">
                                        <div>
                                            <div className="text-xs sm:text-sm text-yellow-200/80">
                                                收录时间
                                            </div>
                                            <div className="text-yellow-400 font-semibold text-base sm:text-lg">
                                                {joinedDate}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs sm:text-sm text-yellow-200/80">
                                                收录地址
                                            </div>
                                            <div className="text-yellow-400 font-semibold text-base sm:text-lg">
                                                <a
                                                    href={`/blogs/${domainName}`}
                                                    target="_blank"
                                                >
                                                    /blogs/{domainName}
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs sm:text-sm text-yellow-200/80">博客等级</div>
                                            <div className="text-yellow-400 font-semibold text-base sm:text-lg">
                                                {level}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs sm:text-sm text-yellow-200/80">
                                                履约情况
                                            </div>
                                            <div className="text-yellow-400 font-semibold text-base sm:text-lg">
                                                正常
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 右侧金色徽章 + 浮雕麦穗 + 柔光外环 */}
                                <div className="relative flex items-center justify-center">
                                    {/* 柔光外环 */}
                                    <div className="absolute inset-0 w-[180%] h-[180%] sm:w-[200%] sm:h-[200%] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.25)_0%,rgba(255,215,0,0)_70%)]"></div>

                                    {/* 左侧浮雕金麦穗 */}
                                    <div className="absolute -left-16 sm:-left-20 w-14 sm:w-20 z-10">
                                        <svg
                                            viewBox="0 0 64 64"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-full h-auto"
                                        >
                                            <defs>
                                                <linearGradient id="goldGradientLeft" x1="0" y1="0" x2="1" y2="1">
                                                    <stop offset="0%" stopColor="#fff6b7" />
                                                    <stop offset="35%" stopColor="#f9d423" />
                                                    <stop offset="70%" stopColor="#ffcc00" />
                                                    <stop offset="100%" stopColor="#c49b0b" />
                                                </linearGradient>
                                                <filter id="goldEmbossLeft" x="-10%" y="-10%" width="130%" height="130%">
                                                    <feOffset result="offOut" in="SourceAlpha" dx="1" dy="1" />
                                                    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1.2" />
                                                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                                                </filter>
                                            </defs>
                                            <path
                                                d="M50,10 C45,15 40,25 35,35 C30,45 25,50 20,55 L25,60 C30,55 35,50 40,40 C45,30 50,20 55,15 Z"
                                                fill="url(#goldGradientLeft)"
                                                stroke="#8b6f00"
                                                strokeWidth="1"
                                                filter="url(#goldEmbossLeft)"
                                            />
                                        </svg>
                                    </div>

                                    {/* 中心徽章 */}
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-[0_0_25px_rgba(255,215,0,0.35)] flex items-center justify-center relative z-20">
                                        <img width="100%" src="/assets/images/sites/performance/performance.svg" />
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <footer className="flex flex-col sm:flex-row flex-wrap justify-between items-center mt-6 text-yellow-200 gap-3 sm:gap-4 text-center sm:text-left">
                                <div className="text-xs sm:text-sm">证书编号: {certificateId}</div>
                                <div className="text-xs sm:text-sm">
                                    签发网站:{' '}
                                    <a href="https://www.boyouquan.com/home" target="_blank">
                                        博友圈
                                    </a>
                                </div>
                                <div className="text-xs sm:text-sm">签发时间: {issueNumber}</div>
                                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                                    {qrUrl && (
                                        <img
                                            src={qrUrl}
                                            alt="验证二维码"
                                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-md border border-yellow-500/30"
                                        />
                                    )}
                                    <div className="text-[10px] sm:text-xs opacity-80">
                                        扫码验证真伪
                                    </div>
                                </div>
                            </footer>
                        </div>

                        {/* 底部按钮区 */}
                        <div className="flex justify-center gap-4 mt-8 print:hidden ignore-capture">
                            <Button
                                variant="outline"
                                className="text-yellow-400 bg-black/80 border-yellow-400 rounded-lg text-sm sm:text-base px-4 py-2"
                                onClick={() => window.print()}
                            >
                                打印 / 导出
                            </Button>

                            <Button
                                variant="outline"
                                className="text-yellow-400 bg-black/80 border-yellow-400 rounded-lg text-sm sm:text-base px-4 py-2"
                                onClick={handleScreenCapture} // 调用截屏生成 PNG
                            >
                                截屏为 PNG
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pb-6 p-4 w-full flex justify-center print:hidden">
                    <div className="flex flex-col p-4 rounded-xl border border-yellow-600/30 w-full max-w-[960px] relative bg-white/70 backdrop-blur-sm shadow-lg">

                        {/* 提示文字 */}
                        <label className="text-black-400 font-semibold text-sm mb-3 text-center">
                            拷贝如下代码，将「履约中」LOGO 嵌入您的网站底部：
                        </label>

                        {/* 🔹 Tabs（移动到文字下方） */}
                        <div className="flex mt-4 justify-center gap-3">
                            {[
                                { id: 'dark', label: '深色背景' },
                                { id: 'dim', label: '浅色背景' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTheme(tab.id)}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 shadow-sm
                ${selectedTheme === tab.id
                                            ? 'bg-black-500 text-black border-yellow-500 shadow-yellow-500/40 shadow-inner'
                                            : 'bg-neutral-900/80 text-neutral-200 border-neutral-700 hover:bg-neutral-800 hover:text-yellow-400'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* LOGO 预览 */}
                        <div className="mt-4 ml-2 flex justify-center">
                            <a
                                href={`/certificates/${domainName}`}
                                title="正在博友圈履约中"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    style={{ height: '26px' }}
                                    src={
                                        selectedTheme === 'dark'
                                            ? `https://www.boyouquan.com/images/logo/performance-dark.svg?domainName=${domainName}`
                                            : `https://www.boyouquan.com/images/logo/performance.svg?domainName=${domainName}`
                                    }
                                    alt="正在博友圈履约中"
                                />
                            </a>
                        </div>

                        {/* 代码 + 复制按钮 */}
                        <div className="mt-4 flex w-full gap-2 items-start">
                            <textarea
                                className={`ml-2 pb-2 flex-1 text-sm sm:text-base p-3 rounded-lg resize-none border border-yellow-400/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition
              ${selectedTheme === 'dark'
                                        ? 'bg-neutral-900 text-neutral-100'
                                        : 'bg-neutral-800 text-neutral-50'
                                    }`}
                                rows={4}
                                readOnly
                                value={currentCode}
                            />

                            <Button
                                variant="outline"
                                className="text-black-100 border-black-400 rounded-lg text-sm sm:text-base px-4 py-2 h-fit bg-transparent hover:bg-yellow-100/40 transition"
                                onClick={() => {
                                    navigator.clipboard.writeText(currentCode);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                            >
                                复制
                            </Button>
                        </div>

                        {/* 复制提示 */}
                        {copied && (
                            <div className="absolute top-[-1.5rem] right-0 bg-yellow-400 text-black text-xs sm:text-sm px-2 py-1 rounded shadow-lg animate-fade-in-out">
                                已复制到剪贴板
                            </div>
                        )}

                        <style>
                            {`
            @keyframes fade-in-out {
              0% { opacity: 0; transform: translateY(-5px); }
              10% { opacity: 1; transform: translateY(0); }
              90% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(-5px); }
            }
            .animate-fade-in-out {
              animation: fade-in-out 2s ease-in-out forwards;
            }
          `}
                        </style>
                    </div>
                </div>
            </div>
        </>
    );
}