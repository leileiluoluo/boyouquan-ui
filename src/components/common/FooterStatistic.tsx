import React, { useState, useEffect } from 'react';
import { Typography, Space, Divider, Skeleton } from 'antd';
import RequestUtil from '../../utils/APIRequestUtil';

const { Text, Strong } = Typography;

export default function FooterStatistic() {
    const [statistic, setStatistic] = useState<Record<string, any>>({});
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
        <>
            {loaded ? (
                // 加载完成：显示统计数据
                <div style={{ textAlign: 'center' }}>
                    <div style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
                        <Space align="center" size="small">
                            <Text>
                                收录博客 <Strong>{statistic.totalBlogs}</Strong> 个
                            </Text>
                            <Divider type="vertical" />
                            <Text>
                                收录文章 <Strong>{statistic.totalPosts}</Strong> 篇
                            </Text>
                            <Divider type="vertical" />
                            <Text>
                                浏览文章 <Strong>{statistic.totalAccesses}</Strong> 次
                            </Text>
                        </Space>
                    </div>
                </div>
            ) : (
                // 加载中：显示骨架屏
                <Space align="center" size="small" style={{ justifyContent: 'center' }}>
                    <Skeleton.Text paragraph={false} placeholder="收录博客" />
                    <Divider type="vertical" />
                    <Skeleton.Text paragraph={false} placeholder="收录文章" />
                    <Divider type="vertical" />
                    <Skeleton.Text paragraph={false} placeholder="浏览文章" />
                </Space>
            )}
        </>
    );
}