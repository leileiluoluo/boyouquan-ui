import React from 'react';
import { useState, useEffect } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { Box, Link, Text, Strong, Skeleton } from '@radix-ui/themes';

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
        <>
            <Box>
                <Text size="2" color="gray">
                    欢迎来博客广场发现好博客！截止目前博友圈已收录了 {
                        loaded ? <Strong>{statistic.totalBlogs}</Strong> : <Skeleton>1000</Skeleton>
                    } 个独立博客。这里有生活，这里有技术，如果您也拥有一个博客，就快来「<Link color="indigo" href="/blog-requests/add">提交</Link>」吧！
                </Text>
            </Box>
        </>
    )
}