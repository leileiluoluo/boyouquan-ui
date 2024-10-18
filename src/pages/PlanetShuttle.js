import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function PlanetShuttle() {
    const textAliginStyle = { textAlign: 'center', marginBottom: '28px' };
    const planetStyle = { fontFamily: '-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Oxygen,Ubuntu,Cantarell,open sans,helvetica neue,sans-serif', color: 'white', textAlign: 'center', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' };
    const fontStyle = { fontSize: '20px', textDecoration: 'none', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #d3a497, #d55b5b, #9877f1)' };
    const marginStyle = { marginTop: '28px' };
    const fontSizeStyle = { fontSize: '12px' };
    const animationStyle = { color: 'white', textDecoration: 'auto', animation: 'typing 0.7s infinite' };
    const colorWhiteStyle = { color: 'white' };

    const [item, setItem] = useState({
        'blogInfo': {'posts': []},
        'randomBlogInfos': []
    });

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/planet-shuttle`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();

            setItem(prevItem=> ({
                ...prevItem,
                ['blogInfo']: resp.blogInfo,
                ['randomBlogInfos']: resp.randomBlogInfos,
              }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        document.body.classList.remove('list');
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
            }

            @keyframes typing {
            50% {
                opacity: 0.0;
            }
            }
        `}</style>

                <script src="/assets/js/planet-shuttle/index.js" type="text/javascript"></script>
                <script src="/assets/js/planet-shuttle/lib/TweenMax.min.js" type="text/javascript"></script>
                <script src="/assets/js/tongji.js" type="text/javascript"></script>
                <script src="/assets/js/planet-shuttle/go.js" type="text/javascript"></script>
            </Helmet>
            <script src="/assets/js/planet-shuttle/index.js" type="text/javascript"></script>
            <canvas height="615" width="1280"></canvas>
            <div style={planetStyle}>
                <div style={textAliginStyle}>
                    <a style={fontStyle} href="/home">博友圈</a>
                </div>
                <div>
                    <p>您即将穿梭到「<a id="shuttle" href="/go?from=website&amp;link=https%3A%2F%2Fwww.xalaok.top%2F" style={animationStyle}>Xalaok</a>」的星球！</p>
                </div>
                <div style={marginStyle}>
                    <span style={fontSizeStyle}>© 2023-2024 <a href="https://www.boyouquan.com/home" style={colorWhiteStyle}>博友圈</a></span>
                </div>
            </div>
        </>
    )
}