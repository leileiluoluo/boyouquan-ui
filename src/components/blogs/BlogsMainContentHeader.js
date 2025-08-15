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
                    } 个独立博客，快来搜一搜您自己的博客在不在里边吧，没有的话就快来「<Link color="indigo" href="/blog-requests/add">提交</Link>」吧！
                </Text>
            </Box>
        </>
    )
}