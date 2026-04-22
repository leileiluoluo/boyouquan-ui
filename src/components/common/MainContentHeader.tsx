import { Typography } from 'antd';

const { Text } = Typography;

interface MainContentHeaderProps {
    content: string;
}

export default function MainContentHeader({ content }: MainContentHeaderProps) {
    return (
        <div>
            <Text type="secondary" style={{ fontSize: 14 }}>
                {content}
            </Text>
        </div>
    );
}