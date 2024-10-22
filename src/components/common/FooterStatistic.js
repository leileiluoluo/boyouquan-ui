import { useState, useEffect } from "react";

export default function FooterStatistic() {
    const summaryStyle = {
        color: '#cb2e58', margin: '0 2px 0 2px'
    }

    const [statistic, setStatistic] = useState({});

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/statistic`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const resp = await response.json();
            setStatistic(resp);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
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
        </div>
    )
}