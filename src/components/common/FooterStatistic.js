import { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import RequestUtil from '../../utils/APIRequestUtil';

export default function FooterStatistic() {
    const [statistic, setStatistic] = useState({});
    const [loaded, setLoaded] = useState(false);

    const fetchData = async () => {
        try {
            const resp = await RequestUtil.get(`/api/statistics`);

            const respBody = await resp.json();
            setStatistic(respBody);
            setLoaded(true);
        } catch (e) {
            console.error(e);
            setLoaded(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Flex gap="2" justify="center">
            <Text>收录博客 {statistic.totalBlogs} 个</Text>
            <Text>收录文章 {statistic.totalPosts} 篇</Text>
            <Text>浏览文章 {statistic.totalAccesses} 次</Text>
        </Flex>
    )
}