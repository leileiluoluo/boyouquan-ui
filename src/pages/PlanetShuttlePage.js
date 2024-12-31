import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import RequestUtil from '../utils/APIRequestUtil';
import Meta from '../components/common/Meta';
import { getGoAddress } from '../utils/PageAddressUtil';
import { redirectTo } from '../utils/CommonUtil';

const meta = {
    title: '星球穿梭 - 博友圈 · 博客人的朋友圈！',
    keywords: '星球穿梭, 博友圈',
    description: '博友圈星球穿梭，随机穿梭到一位博友的星球！'
};

const headStyle = `
    * {
    box-sizing: border-box;
    }

    body {
    background: radial-gradient(#000, #111), #000;
    min-height: 100vh;
    }

    canvas {
    position: fixed;
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

const textAliginStyle = { textAlign: 'center', marginBottom: '28px' };
const planetStyle = { fontFamily: '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Oxygen,Ubuntu,Cantarell,open sans,helvetica neue,sans-serif', color: 'white', textAlign: 'center', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' };
const fontStyle = { fontSize: '20px', textDecoration: 'none', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #d3a497, #d55b5b, #9877f1)' };
const marginStyle = { marginTop: '28px' };
const fontSizeLargeStyle = { fontSize: '16px' };
const fontSizeStyle = { fontSize: '12px' };
const animationStyle = { color: 'white', textDecoration: 'auto', animation: 'typing 0.7s infinite' };
const colorWhiteStyle = { color: 'white' };
const marginOneStyle = { margin: '1px 1px' };

export default function PlanetShuttlePage() {
    const [shuttleInfo, setShuttleInfo] = useState({
        'fromBlog': { 'blogName': '', 'blogAddress': '' },
    });

    const fetchData = async (referrer) => {
        const resp = await RequestUtil.get('/api/planet-shuttle', {
            'From': referrer
        });

        const respBody = await resp.json();

        setShuttleInfo(respBody);

        redirectTo(getGoAddress(respBody.blogAddress), 3);
    };

    useEffect(() => {
        document.body.classList.remove('list');

        let referrer = document.referrer;
        fetchData(referrer);
    }, []);

    return (
        <>
            <Meta meta={meta} />
            <Helmet>
                <style>{headStyle}</style>
                <script src="/assets/js/planet-shuttle/lib/TweenMax.min.js" type="text/javascript"></script>
                <script src="/assets/js/planet-shuttle/index.js" type="text/javascript"></script>
                <script src="/assets/js/tongji.js" type="text/javascript"></script>
            </Helmet>
            <div style={planetStyle}>
                <div style={textAliginStyle}>
                    <a style={fontStyle} href="/home">博友圈</a>
                </div>
                <div style={fontSizeLargeStyle}>
                    {
                        (null != shuttleInfo.fromBlog) ? <><p style={marginOneStyle}>总助力值为 {shuttleInfo.fromBlogInitiatedCount} 的</p><p>「<a id="shuttle" href={`/blogs/${shuttleInfo.fromBlog.domainName}`} style={animationStyle}>{shuttleInfo.fromBlog.name}</a>」正在带您穿梭到「<a id="shuttle" href={getGoAddress(shuttleInfo.blogAddress)} style={animationStyle}>{shuttleInfo.blogName}</a>」的星球！</p></>
                            : <p>您即将穿梭到「<a id="shuttle" href={getGoAddress(shuttleInfo.blogAddress)} style={animationStyle}>{shuttleInfo.blogName}</a>」的星球！</p>
                    }
                </div>
                <div style={marginStyle}>
                    <span style={fontSizeStyle}>Copyright © 2023-2025 <a href="https://www.boyouquan.com/home" style={colorWhiteStyle}>博友圈</a></span>
                </div>
            </div>
        </>
    )
}