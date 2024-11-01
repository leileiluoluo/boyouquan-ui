import { useState, useEffect } from 'react';
import RequestUtil from '../../utils/RequestUtil';

const summaryStyle = {
    color: '#cb2e58', margin: '0 2px 0 2px'
}

export default function FooterStatistic() {
    const [statistic, setStatistic] = useState({});
    const [loaded, setLoaded] = useState(false);

    const fetchData = async () => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/statistics`);

        const respBody = await resp.json();
        setStatistic(respBody);
        setLoaded(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {loaded ?
                <div className="footer-summary">
                    <div className="flex-item">
                        <p>收录博客</p><a style={summaryStyle}>{statistic.totalBlogs}</a><p>个</p>
                    </div>
                    <div className="flex-item">
                        <p>收录文章</p><a style={summaryStyle}>{statistic.totalPosts}</a><p>篇</p>
                    </div>
                    <div className="flex-item">
                        <p>浏览文章</p><a style={summaryStyle}>{statistic.totalAccesses}</a><p>次</p>
                    </div>
                </div> : ''
            }
        </>
    )
}