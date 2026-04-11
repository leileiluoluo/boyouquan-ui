import React from 'react';
import { Table, Typography, Tag, Space } from 'antd';
import { formatDateStr } from '../../utils/DateUtil';
import { getAdminBlogRequestAddress, getBlogRequestAddress } from '../../utils/PageAddressUtil';
import { BlogRequest } from '../../types';

const { Text, Link } = Typography;

interface BlogRequestsTableProps {
    requests: BlogRequest[];
    adminPage?: string | boolean;
}

export default function BlogRequestsTable({ requests, adminPage }: BlogRequestsTableProps): React.JSX.Element {
    // 定义表格列
    const columns = [
        {
            title: '博客名称',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: BlogRequest) => (
                <Link 
                    href={adminPage ? getAdminBlogRequestAddress(record.id) : getBlogRequestAddress(record.id)}
                    style={{
                        fontWeight: 'bold',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {text}
                </Link>
            ),
        },
        {
            title: '博主邮箱',
            dataIndex: 'adminEmail',
            key: 'adminEmail',
        },
        {
            title: '提交时间',
            dataIndex: 'requestedAt',
            key: 'requestedAt',
            render: (requestedAt: string) => formatDateStr(requestedAt, true),
        },
        ...(adminPage ? [{
            title: '自行提交',
            dataIndex: 'selfSubmitted',
            key: 'selfSubmitted',
            render: (selfSubmitted: boolean) => selfSubmitted ? '是' : '否',
        }] : []),
        {
            title: '审核状态',
            dataIndex: 'statusInfo',
            key: 'statusInfo',
            render: (statusInfo: string, record: BlogRequest) => {
                let color = 'orange';
                if (record.approved) {
                    color = 'green';
                } else if (record.failed) {
                    color = 'red';
                }
                return <Tag color={color}>{statusInfo}</Tag>;
            },
        },
    ];

    return (
        <Table 
            dataSource={requests}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={false}
            bordered={false}
            size="middle"
        />
    );
}