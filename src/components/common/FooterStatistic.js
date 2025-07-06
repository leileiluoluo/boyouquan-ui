import { useState, useEffect } from 'react';
import { Strong, Flex, Text } from '@radix-ui/themes';
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
            <Text size="2">收录博客 <Strong>{statistic.totalBlogs}</Strong> 个</Text>
            <Text size="2">收录文章 <Strong>{statistic.totalPosts}</Strong> 篇</Text>
            <Text size="2">浏览文章 <Strong>{statistic.totalAccesses}</Strong> 次</Text>
        </Flex>
    )
}