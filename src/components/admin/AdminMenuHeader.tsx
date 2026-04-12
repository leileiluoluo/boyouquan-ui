import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface AdminMenuHeaderProps {
    title: string;
}

export default function AdminMenuHeader({ title }: AdminMenuHeaderProps): React.JSX.Element {
    return (
        <Title level={3} style={{ fontWeight: 'bold' }}>
            {title}
        </Title>
    )
}