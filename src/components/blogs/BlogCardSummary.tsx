import React from 'react';
import { Row, Col, Typography } from 'antd';
import { formatDateStr } from '../../utils/DateUtil';

const { Text } = Typography;

export default function BlogCardSummary({ 
    postCount, 
    accessCount, 
    collectedAt, 
    domainRegisteredAt, 
    latestPublishedAt, 
    publishedAtHighlight, 
    accessCountHighlight, 
    createTimeHighlight 
}) {
    const latestPublishedAtFormatted = formatDateStr(latestPublishedAt);
    const collectedAtFormatted = formatDateStr(collectedAt);
    const domainRegisteredAtFormatted = formatDateStr(domainRegisteredAt, true);

    const summaryItems = [
        {
            label: '文章收录',
            value: postCount,
            highlight: false
        },
        {
            label: '文章浏览',
            value: accessCount,
            highlight: accessCountHighlight
        },
        {
            label: '最近更新',
            value: latestPublishedAtFormatted,
            highlight: false
        },
        {
            label: createTimeHighlight ? '建博时间' : '收录时间',
            value: createTimeHighlight ? domainRegisteredAtFormatted : collectedAtFormatted,
            highlight: publishedAtHighlight || createTimeHighlight
        }
    ];

    return (
        <Row gutter={[8, 8]} justify="space-between">
            {summaryItems.map((item, index) => (
                <Col key={index}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text type="secondary" style={{ fontSize: 14 }}>{item.label}</Text>
                        <Text 
                            style={{ 
                                fontSize: 14,
                                color: item.highlight ? '#cb2e58' : undefined
                            }}
                        >
                            {item.value}
                        </Text>
                    </div>
                </Col>
            ))}
        </Row>
    );
}