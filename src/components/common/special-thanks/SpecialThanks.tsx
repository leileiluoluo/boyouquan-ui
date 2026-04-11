import React from 'react';
import { Card, Flex, Typography, Tooltip, Avatar } from 'antd';
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
        <div
            style={{
                marginTop: '10px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '900px',  // 固定最大宽度
                    margin: '0 auto',     // 水平居中
                    padding: '40px 24px',
                    backgroundColor: '#fff',
                }}
            >
                <Flex vertical gap={20}>
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
                        gap={20}
                        wrap="wrap"
                        align="center"
                        justify="center"
                        className="special-thanks-avatars"
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
            </div>
        </div>
    );
}