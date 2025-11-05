import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import RequestUtil from '../utils/APIRequestUtil';
import Meta from '../components/common/Meta';
import { getGoAddress } from '../utils/PageAddressUtil';
import { redirectTo } from '../utils/CommonUtil';
import { Box } from '@radix-ui/themes';
import { getDaysTillNow } from '../utils/DateUtil';

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

const textAliginStyle = { textAlign: 'center', marginBottom: '28px' };
const planetStyle = { fontFamily: '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Oxygen,Ubuntu,Cantarell,open sans,helvetica neue,sans-serif', color: 'white', textAlign: 'center', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' };
const fontStyle = { fontSize: '20px', textDecoration: 'none', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #d3a497, #d55b5b, #9877f1)' };
const marginStyle = { marginTop: '28px' };
const fontSizeLargeStyle = { fontSize: '16px' };
const blogDescriptionStyle = { fontSize: '14px', color: 'gray', marginTop: '20px', maxWidth: '460px' };
const animationStyle = { color: 'white', textDecoration: 'auto', animation: 'typing 0.7s infinite' };
const colorWhiteStyle = { color: 'white' };
const marginOneStyle = { margin: '1px 1px' };

export default function PlanetShuttlePage() {
    const [shuttleInfo, setShuttleInfo] = useState({
        'fromBlog': { 'blogName': '', 'blogAddress': '' },
    });

    const [fromBlogJoinDays, setFromBlogJoinDays] = useState(0);

    const fetchData = async (referrer: string) => {
        const resp = await RequestUtil.get('/api/planet-shuttle', {
            'From': referrer
        });

        let respBody;
        if (typeof resp === 'string') {
            try {
                respBody = JSON.parse(resp);
            } catch (e) {
                console.error('Failed to parse response string', e);
                respBody = {};
            }
        } else {
            respBody = await resp.json();
        }

        setShuttleInfo(respBody);
        if (null !== respBody.fromBlog) {
            const days = getDaysTillNow(respBody.fromBlog.collectedAt);
            setFromBlogJoinDays(days);
        }

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
            <Box style={planetStyle}>
                <Box style={textAliginStyle}>
                    <a style={fontStyle} href="/home"><img width="90px" height="28px" src="/assets/images/sites/logo/planet-shuttle-dark.svg"></img></a>
                </Box>
                <Box style={fontSizeLargeStyle}>
                    {
                        (null !== shuttleInfo.fromBlog) ? <><p style={marginOneStyle}>加入博友圈 {fromBlogJoinDays} 天、总助力值为 {shuttleInfo.fromBlogInitiatedCount} 的</p><p>「<a id="shuttle" href={`/blogs/${shuttleInfo.fromBlog.domainName}`} style={animationStyle}>{shuttleInfo.fromBlog.name}</a>」正在带您穿梭到「<a id="shuttle" href={getGoAddress(shuttleInfo.blogAddress)} style={animationStyle}>{shuttleInfo.blogName}</a>」的星球！</p></>
                            : <p>您即将穿梭到「<a id="shuttle" href={getGoAddress(shuttleInfo.blogAddress)} style={animationStyle}>{shuttleInfo.blogName}</a>」的星球！</p>
                    }
                </Box>
                <Box style={blogDescriptionStyle}>
                    {
                        <p>“ {shuttleInfo.blogDescription} ”</p>
                    }
                </Box>
                <Box style={marginStyle}>
                    <span style={{ fontSize: '12px' }}>Copyright © 2023-2025 <a href="https://www.boyouquan.com/home" style={colorWhiteStyle}>博友圈</a></span>
                </Box>
            </Box>
        </>
    )
}