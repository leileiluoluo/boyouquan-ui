import React from 'react';
import { List, Card, Typography, Tag, Space } from 'antd';
import { formatDateStr } from '../../utils/DateUtil';
import { getAdminBlogRequestAddress, getBlogRequestAddress } from '../../utils/PageAddressUtil';
import { BlogRequest } from '../../types';

const { Text, Link } = Typography;

interface BlogRequestsTableProps {
    requests: BlogRequest[];
    adminPage?: string | boolean;
}

export default function BlogRequestsTable({ requests, adminPage }: BlogRequestsTableProps): React.JSX.Element {

    return (
        <List
            dataSource={requests}
            rowKey="id"
            pagination={false}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        size="small"
                        hoverable
                        style={{ width: '100%', borderRadius: 8 }}
                    >
                        {/* 第一行：博客名称 + 状态 */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 8
                        }}>
                            <Link
                                href={adminPage ? getAdminBlogRequestAddress(item.id) : getBlogRequestAddress(item.id)}
                                style={{ fontWeight: 600, fontSize: 15 }}
                            >
                                <Text>{item.name}</Text>
                            </Link>

                            {/* 状态标签 */}
                            {(() => {
                                let color = 'orange';
                                if (item.approved) color = 'green';
                                if (item.failed) color = 'red';
                                return <Tag color={color} style={{fontWeight: 500}}>{item.statusInfo}</Tag>;
                            })()}
                        </div>

                        {/* 信息行 */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: '#666' }}>
                            <Text>博主邮箱：{item.adminEmail}</Text>
                            <Text>提交时间：{formatDateStr(item.requestedAt, true)}</Text>
                            {adminPage && (
                                <Text>自行提交：{item.selfSubmitted ? '是' : '否'}</Text>
                            )}
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    );
}