import { useState, useEffect } from 'react';
import RequestUtil from '../../utils/RequestUtil';

export default function BlogsMainContentHeader() {
    const blogCountStyle = { color: '#cb2e58' };

    const [loaded, setLoaded] = useState(false);
    const [statistic, setStatistic] = useState({});

    const fetchData = async () => {
        const resp = await RequestUtil.get('https://www.boyouquan.com/api/statistic');

        setStatistic(resp);
        setLoaded(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {loaded ?
                <article className="first-entry home-info">
                    <div className="entry-content">
                        <p></p>
                        <ul>
                            <li>
                                <strong>欢迎来博客广场发现好博客！截止目前博友圈已收录了</strong>
                                <strong style={blogCountStyle}>&nbsp;{statistic.totalBlogs}&nbsp;</strong>
                                <strong>个独立博客，快来搜一搜您自己的博客在不在里边吧，没有的话就快来</strong><strong>「<a href="/blog-requests/add">提交</a>」吧！</strong>
                            </li>
                        </ul>
                        <p></p>
                    </div>
                </article> : ''
            }
        </>
    )
}