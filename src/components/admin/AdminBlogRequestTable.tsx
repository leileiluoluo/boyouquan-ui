import React from 'react';
import { useState } from 'react';
import { Form, Input, Button, Table, Typography, Space, Card } from 'antd';

import { redirectTo } from '../../utils/CommonUtil';
import { ADMIN_BLOG_REQUESTS_ADDRESS, getBlogAddress } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { getCookie } from '../../utils/CookieUtil';
import { BlogRequestInfo } from '../../types';
import { Post } from '../../types';

const { Text, Link } = Typography;

const redStyle: React.CSSProperties = { color: 'red' };
const greenStyle: React.CSSProperties = { color: 'green' };
const fontSize14Style: React.CSSProperties = { fontSize: '14px' };
const inputStyle: React.CSSProperties = { width: '400px' };

interface AdminBlogRequestTableProps {
    blogRequest: BlogRequestInfo & {
        domainName?: string;
        adminEmail?: string;
        requestedAt?: string;
        reason?: string;
        statusInfo?: string;
        status?: string;
    };
}

export default function AdminBlogRequestTable({ blogRequest }: AdminBlogRequestTableProps): React.JSX.Element {
    const id = blogRequest.id;
    const domainName = blogRequest.domainName || blogRequest.domain;
    const blogAddress = getBlogAddress(domainName);

    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const approve = (): void => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) return;

        const url = `/api/admin/blog-requests/${id}/approve`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    };

    const reject = (): void => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) return;

        const url = `/api/admin/blog-requests/${id}/reject`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    };

    const uncollected = (): void => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) return;

        const url = `/api/admin/blog-requests/${id}/uncollected`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    };

    const deleteAllInfos = (): void => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');
        
        if (!username || !sessionId) return;

        const url = `/api/admin/blog-requests/${id}`;
        RequestUtil.delete(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    };

    const dataSource = [
        { key: '1', label: '博客名称', value: blogRequest.name },
        { key: '2', label: '博客描述', value: blogRequest.description },
        { key: '3', label: 'RSS 地址', value: <Link href={blogRequest.rssAddress} target="_blank">{blogRequest.rssAddress}</Link> },
        { key: '4', label: '博主邮箱', value: blogRequest.adminEmail },
        { key: '5', label: '提交时间', value: blogRequest.requestedAt },
        { key: '6', label: '博客详情页', value: <Link href={blogAddress} target="_blank">{blogAddress}</Link> },
        { 
            key: '7', 
            label: '草稿文章抓取', 
            value: (
                <ul style={fontSize14Style}>
                    {blogRequest.posts.map((post: Post, index: number) => (
                        <li key={index}>
                            <a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a>
                        </li>
                    ))}
                </ul>
            ) 
        },
        { key: '8', label: '失败原因', value: blogRequest.reason },
        { key: '9', label: '审核状态', value: blogRequest.statusInfo },
    ];

    const columns = [
        {
            title: '字段',
            dataIndex: 'label',
            key: 'label',
            width: '150px',
            render: (text: string) => <Text strong>{text}</Text>
        },
        {
            title: '内容',
            dataIndex: 'value',
            key: 'value',
        }
    ];

    return (
        <Card style={{ marginBottom: '16px' }}>
            <Table 
                dataSource={dataSource} 
                columns={columns} 
                pagination={false}
                bordered
                size="middle"
            />
            
            <div style={{ marginTop: '16px' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    {blogRequest.status === 'system_check_valid' && (
                        <Button type="primary" style={greenStyle} onClick={approve}>
                            审批通过
                        </Button>
                    )}

                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            style={inputStyle}
                            name="reason"
                            placeholder="请输入驳回原因"
                            onChange={handleChange}
                        />
                        <Button danger onClick={reject}>
                            驳回
                        </Button>
                    </Space.Compact>

                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            style={inputStyle}
                            name="reason"
                            placeholder="请输入移出原因"
                            onChange={handleChange}
                        />
                        <Button danger onClick={uncollected}>
                            移出收录名单
                        </Button>
                    </Space.Compact>

                    <Button danger onClick={deleteAllInfos}>
                        删除全部数据
                    </Button>
                </Space>
            </div>
        </Card>
    )
}