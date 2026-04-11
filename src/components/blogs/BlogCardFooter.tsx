import React from 'react';
import { Flex, Typography, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function BlogCardFooter({ statusOk, submittedInfo, submittedInfoTip }) {
    const backgroundColor = statusOk ? '#0dcb0d' : '#ff4d4f';
    const statusText = statusOk ? '运行良好' : '无法访问';
    const statusTooltip = statusOk ? '该博客运行状态良好' : '该博客目前无法访问';

    return (
        <Flex justify="space-between">
            <Tooltip title={statusTooltip}>
                <Flex align="center">
                    <div
                        style={{
                            display: 'inline-block',
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: backgroundColor
                        }}
                    />
                    <Text 
                        type="secondary" 
                        style={{ 
                            fontSize: 12, 
                            marginLeft: 4, 
                            userSelect: 'none' 
                        }}
                    >
                        {statusText}
                    </Text>
                </Flex>
            </Tooltip>

            <Tooltip title={submittedInfoTip}>
                <Flex align="center">
                    <InfoCircleOutlined 
                        style={{ 
                            fontSize: 14,
                            color: '#8c8c8c'
                        }} 
                    />
                    <Text 
                        type="secondary" 
                        style={{ 
                            fontSize: 12, 
                            marginLeft: 2, 
                            userSelect: 'none' 
                        }}
                    >
                        {submittedInfo}
                    </Text>
                </Flex>
            </Tooltip>
        </Flex>
    );
}