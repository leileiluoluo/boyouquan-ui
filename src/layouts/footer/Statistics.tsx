import React, { useEffect, useState } from 'react';
import { theme, Typography, Flex, Spin } from 'antd';
import CountUp from 'react-countup';
import { Users, FileText, Eye } from 'lucide-react';
import { getStatistics } from '@services/statisticsService';
import { StatData } from '@types/statistics';

const { Text } = Typography;
const { useToken } = theme;

const Statistics: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<StatData>();

    const { token } = useToken();

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
        <Flex vertical gap={token.paddingXXS}>
            <Flex align="center" gap={token.paddingXXS}>
                <Users size={13} style={{ color: token.colorTextQuaternary, flexShrink: 0 }} />
                <Flex gap={token.paddingXS}>
                    <Text style={{ color: token.colorTextQuaternary, fontSize: token.fontSize }}>收录博客</Text>
                    <Text style={{ color: token.colorTextQuaternary, fontSize: token.fontSize }}>
                        <CountUp end={data?.totalBlogs} duration={1} separator="," />
                    </Text>
                </Flex>
            </Flex>
            <Flex align="center" gap={token.paddingXXS}>
                <FileText size={13} style={{ color: token.colorTextQuaternary, flexShrink: 0 }} />
                <Flex gap={token.paddingXS}>
                    <Text style={{ color: token.colorTextQuaternary, fontSize: token.fontSize }}>收录文章</Text>
                    <Text style={{ color: token.colorTextQuaternary, fontSize: token.fontSize }}>
                        <CountUp end={data?.totalPosts} duration={1} separator="," />
                    </Text>
                </Flex>
            </Flex>
            <Flex align="center" gap={token.paddingXXS}>
                <Eye size={13} style={{ color: token.colorTextQuaternary, flexShrink: 0 }} />
                <Flex gap={token.paddingXS}>
                    <Text style={{ color: token.colorTextQuaternary, fontSize: token.fontSize }}>浏览文章</Text>
                    <Text style={{ color: token.colorTextQuaternary, fontSize: token.fontSize }}>
                        <CountUp end={data?.totalAccesses} duration={1} separator="," />
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Statistics;