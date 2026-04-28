import React from 'react';
import { Flex, Card, Typography, Tag } from 'antd';
import { getBlogAddress } from '../../utils/PageAddressUtil';

const { Text, Link, Title } = Typography;

interface BlogRequestTableProps {
    name?: string;
    description?: string;
    domainName?: string;
    address?: string;
    rssAddress?: string;
    adminEmail?: string;
    requestedAt?: string;
    updatedAt?: string;
    approved?: boolean;
    failed?: boolean;
    status?: string;
    statusInfo?: string;
    reason?: string;
}

export default function BlogRequestTable({
    name,
    description,
    domainName,
    address,
    rssAddress,
    adminEmail,
    requestedAt,
    updatedAt,
    approved,
    failed,
    status,
    statusInfo,
    reason
}: BlogRequestTableProps): React.JSX.Element {
    const title = `博客「${name}」审核详情`;
    const blogAddress = approved && domainName ? getBlogAddress(domainName) : (address || '');

    const getStatusColor = () => {
        if (approved) return 'green';
        if (failed) return 'red';
        return 'orange';
    };

    // 定义信息行
    const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <Flex gap={16} style={{ padding: '8px 0' }}>
            <Text style={{ flexShrink: 0, fontWeight: 500 }}>{label}</Text>
            <Text style={{ flex: 1 }}>{value}</Text>
        </Flex>
    );

    return (
        <Flex vertical gap={8}>
            <Title level={5} style={{ margin: 0 }}>
                {title}
            </Title>
            <Card style={{ width: '100%' }}>
                <InfoRow label="博客名称" value={<Link href={address} target="_blank">{name}</Link>} />
                <InfoRow label="博客描述" value={description} />
                <InfoRow label="RSS 地址" value={<Link href={rssAddress} target="_blank">{rssAddress}</Link>} />
                <InfoRow label="博主邮箱" value={adminEmail} />
                <InfoRow label="提交时间" value={requestedAt} />
                <InfoRow label="审核状态" value={<Tag color={getStatusColor()} style={{ fontWeight: 500 }}>{statusInfo}</Tag>} />

                {status === 'approved' && (
                    <InfoRow label="收录地址" value={<Link href={blogAddress}>{blogAddress}</Link>} />
                )}

                {(status === 'approved' || status === 'rejected' || status === 'uncollected') && (
                    <InfoRow label="审核时间" value={updatedAt} />
                )}

                {(status === 'system_check_invalid' || status === 'rejected' || status === 'uncollected') && (
                    <InfoRow label="驳回原因" value={reason} />
                )}
            </Card>
        </Flex>
    );
}