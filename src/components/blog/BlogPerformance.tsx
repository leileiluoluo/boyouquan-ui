import React from 'react';
import { Card, Flex, Typography, Progress, Tooltip } from 'antd';
import { getYearsTillNow, getYear } from '../../utils/DateUtil';

const { Text, Link } = Typography;

export default function BlogPerformance({ domainName, collectedAt }) {
    const joinedYear = getYear(collectedAt);
    const years = getYearsTillNow(collectedAt);
    const percent = Math.min((years / 10) * 100, 100); // Ant Design Progress 使用百分比 0-100
    const certLink = `/certificates/${domainName}`;

    const handleOpenCertificate = () => {
        window.open(certLink, '博客集验证', 'height=800,width=960,top=0,right=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
    };

    return (
        <Card style={{ padding: 16, width: '100%' }}>
            <Flex vertical gap={4}>
                <Text type="secondary" style={{ fontSize: 14 }}>履约进度</Text>
                <Tooltip title="点击查看履约证书">
                    <div style={{ marginTop: 8, width: '100%' }}>
                        <div onClick={handleOpenCertificate} style={{ cursor: 'pointer' }}>
                            <Flex justify="space-between" style={{ marginBottom: 8, overflowX: 'auto' }}>
                                <Text type="secondary" style={{ fontSize: 14, marginRight: 8 }}>
                                    {joinedYear}
                                </Text>
                                <Text type="secondary" style={{ fontSize: 14, marginRight: 8 }}>
                                    {joinedYear + 10}
                                </Text>
                            </Flex>

                            <Progress 
                                percent={percent} 
                                strokeColor="#faad14"  // gold 颜色
                                showInfo={false}
                            />

                            <Text type="secondary" style={{ fontSize: 12, marginTop: 8 }}>
                                * 该博客收录于 {joinedYear} 年，目前已履约 {years} 年，等级为{' '}
                                <Link 
                                    style={{ color: '#faad14', fontWeight: 'bold' }}
                                >
                                    LEVEL {years}
                                </Link>
                            </Text>
                        </div>
                    </div>
                </Tooltip>
            </Flex>
        </Card>
    );
}