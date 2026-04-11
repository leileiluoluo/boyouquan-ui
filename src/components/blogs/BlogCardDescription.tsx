import React from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

export default function BlogCardDescription({ description }) {
    return (
        <div
            style={{
                padding: 4,
                marginTop: 4,
                marginBottom: 4,
                backgroundColor: '#f5f5f5',
                borderRadius: 8
            }}
        >
            <Paragraph
                ellipsis={{ rows: 1, expandable: false }}
                style={{
                    fontSize: 14,
                    marginBottom: 0
                }}
            >
                {description}
            </Paragraph>
        </div>
    );
}