import React from 'react';
import { Card, Flex, Typography, Tooltip, Avatar, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import specialThanks from '../../../json/specialThanks.json';
import LazyAvatar from '../avatar/LazyAvatar';

const { Link } = Typography;

interface SpecialThanksProps {
    isHome: boolean;
}

export default function SpecialThanks({ isHome }: SpecialThanksProps) {
    if (!isHome) return null;

    return (
        <Card
            id="special-thanks"
            style={{ marginTop: '20px', padding: '16px' }}
        >
            <Flex vertical gap={16}>
                {/* 标题 */}
                <Flex justify="center">
                    <Link
                        href="/sponsor"
                        strong
                        style={{ fontSize: 14 }}
                    >
                        感谢赞助
                    </Link>
                </Flex>

                {/* 头像列表 */}
                <Flex
                    gap={16}
                    wrap="wrap"
                    align="center"
                    justify="center"
                >
                    {specialThanks.map((item, index) => (
                        <Tooltip title={item.name} key={index}>
                            <Link href={item.link} target="_blank">
                                <LazyAvatar
                                    size={28}
                                    src={item.avatar}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Link>
                        </Tooltip>
                    ))}

                    {/* 我也要赞助按钮 */}
                    <Tooltip title="我也要赞助">
                        <Link href="/sponsor">
                            <Avatar
                                size={28}
                                icon={<PlusOutlined />}
                                style={{
                                    backgroundColor: '#f0f0f0',
                                    cursor: 'pointer'
                                }}
                            />
                        </Link>
                    </Tooltip>
                </Flex>
            </Flex>
        </Card>
    );
}