import React from 'react';
import { Card, Flex, Typography, Tooltip, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import specialThanks from '../../../json/specialThanks.json';

const { Title } = Typography;

interface SpecialThanksProps {
    isHome: boolean;
}

export default function SpecialThanks({ isHome }: SpecialThanksProps) {
    if (!isHome) return null;

    return (
        <Card style={{ marginTop: 20 }}>
            <Flex vertical align="center" gap={16}>
                <Title
                    level={5}
                    style={{
                        margin: 0,
                        color: '#1f2329',
                        fontWeight: 500,
                    }}
                >
                    特别赞助 ✨
                </Title>

                <Flex wrap="wrap" gap={10} justify="center" align="center">
                    {specialThanks.map((item) => (
                        <Tooltip key={item.name} title={`${item.name}`} styles={{ root: { fontSize: 12 } }}>
                            <a
                                href={item.link || 'javascript:;'}
                                rel="noopener noreferrer"
                                style={{ display: 'inline-block' }}
                            >
                                <Avatar
                                    size={30}
                                    shape="circle"
                                    src={item.avatar}
                                    icon={<UserOutlined />}
                                    style={{
                                        border: '1px solid #e5e7eb',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                />
                            </a>
                        </Tooltip>
                    ))}

                    {/* 更优雅的 + 号 */}
                    <a
                        href="/sponsor"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-block' }}
                    >
                        <Avatar
                            size={30}
                            shape="circle"
                            style={{
                                backgroundColor: '#f9fafb',
                                color: '#6b7280',
                                border: '1px dashed #d1d5db',
                            }}
                        >
                            +
                        </Avatar>
                    </a>
                </Flex>
            </Flex>
        </Card>
    );
}