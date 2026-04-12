import React from 'react';
import { Table, Typography, Button, Space, message } from 'antd';
import { PushpinOutlined, PushpinFilled, PictureOutlined } from '@ant-design/icons';

import { redirectTo } from '../../../utils/CommonUtil';
import { getCookie } from '../../../utils/CookieUtil';
import { formatDateStr } from '../../../utils/DateUtil';
import { getBlogAddress } from '../../../utils/PageAddressUtil';
import { ADMIN_RECOMMENDED_POSTS_ADDRESS, ADMIN_POST_IMAGE_ADD_ADDRESS } from '../../../utils/PageAddressUtil';
import RequestUtil from '../../../utils/APIRequestUtil';
import { Post } from '../../../types';

const { Link, Text } = Typography;

const unpin = async (link: string): Promise<void> => {
    const username = getCookie('username');
    const sessionId = getCookie('sessionId');
    
    if (!username || !sessionId) return;

    try {
        await RequestUtil.patch('/api/admin/recommended-posts/unpin', JSON.stringify({ link: link }), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });
        message.success('已取消置顶');
        redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS, 3);
    } catch (error) {
        message.error('操作失败，请重试');
    }
};

const pin = async (link: string): Promise<void> => {
    const username = getCookie('username');
    const sessionId = getCookie('sessionId');
    
    if (!username || !sessionId) return;

    try {
        await RequestUtil.patch('/api/admin/recommended-posts/pin', JSON.stringify({ link: link }), {
            'Content-Type': 'application/json',
            'username': username,
            'sessionId': sessionId
        });
        message.success('已置顶');
        redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS, 3);
    } catch (error) {
        message.error('操作失败，请重试');
    }
};

const addPostImage = (link: string): void => {
    redirectTo(ADMIN_POST_IMAGE_ADD_ADDRESS + '?link=' + encodeURIComponent(link));
};

interface AdminRecommendedPostsTableProps {
    posts: Post[];
}

export default function AdminRecommendedPostsTable({ posts }: AdminRecommendedPostsTableProps): React.JSX.Element {
    const columns = [
        {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: Post) => (
                <Text style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    <Link href={record.link} target="_blank">{record.title}</Link>
                </Text>
            )
        },
        {
            title: '博客名称',
            dataIndex: 'blogName',
            key: 'blogName',
            render: (text: string, record: Post) => (
                <Link href={getBlogAddress(record.blogDomainName)} target="_blank">
                    {record.blogName}
                </Link>
            )
        },
        {
            title: '发布时间',
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            render: (text: string) => formatDateStr(text, true)
        },
        {
            title: '操作',
            key: 'actions',
            render: (_: any, record: Post) => (
                <Space size="small">
                    {record.pinned ? (
                        <Button 
                            size="small"
                            danger
                            icon={<PushpinFilled />}
                            onClick={() => unpin(record.link)}
                        >
                            取消置顶
                        </Button>
                    ) : (
                        <Button 
                            size="small"
                            icon={<PushpinOutlined />}
                            onClick={() => pin(record.link)}
                        >
                            置顶
                        </Button>
                    )}
                    <Button 
                        size="small"
                        icon={<PictureOutlined />}
                        onClick={() => addPostImage(record.link)}
                    >
                        配图
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div id="recommended-posts">
            <Table
                dataSource={posts}
                columns={columns}
                rowKey="link"
                pagination={false}
                bordered
                size="middle"
            />
        </div>
    )
}