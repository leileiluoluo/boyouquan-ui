import React, { useEffect, useState } from 'react';
import { Layout, Divider, Typography, Flex, Button, Spin, Grid, Dropdown, Tooltip } from 'antd';
const { Link, Text } = Typography;
import CountUp from 'react-countup';
import { Rss, Github, Cloud, Mail, ArrowUp, Users, FileText, Eye, BarChart3, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { getStatistics } from '@services/statisticsService';
import { StatData } from '@types/statistics';

const Statistics: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<StatData>();

    const fetchData = async (): Promise<void> => {
        const stats: StatData = await getStatistics();
        setData(stats);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <Spin size="small" />;
    }

    return (
        <Flex vertical gap={4}>
            <Flex align="center" gap={4}>
                <Users size={13} style={{ color: 'rgba(255, 255, 255, 0.65)', flexShrink: 0 }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13, width: 60 }}>收录博客</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>
                    <CountUp end={data?.totalBlogs} duration={1} separator="," />
                </Text>
            </Flex>
            <Flex align="center" gap={4}>
                <FileText size={13} style={{ color: 'rgba(255, 255, 255, 0.65)', flexShrink: 0 }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13, width: 60 }}>收录文章</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>
                    <CountUp end={data?.totalPosts} duration={1} separator="," />
                </Text>
            </Flex>
            <Flex align="center" gap={4}>
                <Eye size={13} style={{ color: 'rgba(255, 255, 255, 0.65)', flexShrink: 0 }} />
                <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13, width: 60 }}>浏览文章</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: 13 }}>
                    <CountUp end={data?.totalAccesses} duration={1} separator="," />
                </Text>
            </Flex>
        </Flex>
    );
};

export default Statistics;