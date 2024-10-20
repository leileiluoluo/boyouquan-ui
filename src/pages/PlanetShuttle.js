import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function PlanetShuttle() {
    const meta = {
        title: '星球穿梭 - 博友圈 · 博客人的朋友圈！',
        keywords: '星球穿梭, 博友圈',
        description: '博友圈星球穿梭，随机穿梭到一位博友的星球！'
    }

    const textAliginStyle = { textAlign: 'center', marginBottom: '28px' };
    const planetStyle = { fontFamily: '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Oxygen,Ubuntu,Cantarell,open sans,helvetica neue,sans-serif', color: 'white', textAlign: 'center', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' };
    const fontStyle = { fontSize: '20px', textDecoration: 'none', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #d3a497, #d55b5b, #9877f1)' };
    const marginStyle = { marginTop: '28px' };
    const fontSizeLargeStyle = { fontSize: '16px' };
    const fontSizeStyle = { fontSize: '12px' };
    const animationStyle = { color: 'white', textDecoration: 'auto', animation: 'typing 0.7s infinite' };
    const colorWhiteStyle = { color: 'white' };
    const marginOneStyle = { margin: '1px 1px' };

    const [item, setItem] = useState({
        'blogName': '',
        'fromBlogInitiatedCount': 0,
        'fromBlog': { 'blogName': '', 'blogAddress': '' },
        'blogAddress': ''
    });

    const fetchData = async (referrer) => {
        try {
            fetch(`https://www.boyouquan.com/api/planet-shuttle`, {
                method: 'GET',
                headers: {
                    'From': referrer
                }
            })
                .then(response => response.json())
                .then(data => {
                    setItem(prevItem => ({
                        ...prevItem,
                        ['blogName']: data.blogName,
                        ['fromBlogInitiatedCount']: data.fromBlogInitiatedCount,
                        ['fromBlog']: data.fromBlog,
                        ['blogAddress']: data.blogAddress,
                    }));

                    setTimeout(function () {
                        window.location.href = '/go?from=website&link=' + encodeURIComponent(data.blogAddress);
                    }, 3 * 1000);
                })
                .catch(error => { throw new Error('Network response was not ok') });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        document.body.classList.remove('list');

        let referrer = document.referrer;
        fetchData(referrer);
    }, []);

    return (
        <>
            <Helmet>
                <style>{`
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
        `}</style>
                <title>{meta.title}</title>
                <meta name="keywords" content={meta.keywords} />
                <meta name="description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:description" content={meta.description} />
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
                        (null != item.fromBlog) ? <><p style={marginOneStyle}>总助力值为 {item.fromBlogInitiatedCount} 的</p><p>「<a id="shuttle" href={`/blogs/${item.fromBlog.domainName}`} style={animationStyle}>{item.fromBlog.name}</a>」正在带您穿梭到「<a id="shuttle" href={`/go?from=website&link=${encodeURIComponent(item.blogAddress)}`} style={animationStyle}>{item.blogName}</a>」的星球！</p></> : <p>您即将穿梭到「<a id="shuttle" href={`/go?from=website&link=${encodeURIComponent(item.blogAddress)}`} style={animationStyle}>{item.blogName}</a>」的星球！</p>
                    }
                </div>
                <div style={marginStyle}>
                    <span style={fontSizeStyle}>© 2023-2024 <a href="https://www.boyouquan.com/home" style={colorWhiteStyle}>博友圈</a></span>
                </div>
            </div>
        </>
    )
}