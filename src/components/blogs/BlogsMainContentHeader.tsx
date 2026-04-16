import React from 'react';
import { useState, useEffect } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Typography, Skeleton } from 'antd';

const { Text, Link } = Typography;

export default function BlogsMainContentHeader() {
    const [loaded, setLoaded] = useState(false);
    const [statistic, setStatistic] = useState({});

    const fetchData = async () => {
        const resp = await RequestUtil.get('/api/statistics');
        const respBody = await resp.json();
        setStatistic(respBody);
        setLoaded(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Text type="secondary">
                欢迎来博客广场发现好博客！截止目前博友圈已收录了{' '}
                {loaded ? (
                    <strong>{statistic.totalBlogs}</strong>
                ) : (
                    <Skeleton.Button active size="small" shape="round" style={{ width: 40, height: 16, margin: '0 4px' }} />
                )}{' '}
                个独立博客。这里有生活，这里有技术，如果您也拥有一个博客，就快来「
                <Link href="/blog-requests/add">提交</Link>
                」吧！
            </Text>
        </div>
    );
}