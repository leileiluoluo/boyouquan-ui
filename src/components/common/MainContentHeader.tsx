import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

interface MainContentHeaderProps {
    content: string;
}

export default function MainContentHeader({ content }: MainContentHeaderProps) {
    return (
        <div style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ fontSize: 14 }}>
                {content}
            </Text>
        </div>
    );
}