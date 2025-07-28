import { useState } from 'react';
import { Form } from '@radix-ui/react-form';
import { Box, Table, Link, Strong, TextField, Flex } from '@radix-ui/themes';

import { redirectTo } from '../../utils/CommonUtil';
import { ADMIN_BLOG_REQUESTS_ADDRESS, getBlogAddress } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/APIRequestUtil';
import { getCookie } from '../../utils/CookieUtil';

const redStyle = { color: 'red' };
const greenStyle = { color: 'green' };
const fontSize14Style = { fontSize: '14px' };
const inputStyle = { width: '400px', border: '2px solid var(--primary)', caretColor: 'var(--content)', color: 'var(--content)' };


export default function AdminBlogRequestTable({ blogRequest }) {
    const id = blogRequest.id;
    const blogAddress = getBlogAddress(blogRequest.domainName);

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const approve = (e) => {
        e.preventDefault();

        const url = `/api/admin/blog-requests/${id}/approve`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    }

    const reject = (e) => {
        e.preventDefault();

        const url = `/api/admin/blog-requests/${id}/reject`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    }

    const uncollected = (e) => {
        e.preventDefault();

        const url = `/api/admin/blog-requests/${id}/uncollected`;
        RequestUtil.patch(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    }

    const deleteAllInfos = (e) => {
        e.preventDefault();

        const url = `/api/admin/blog-requests/${id}`;
        RequestUtil.delete(url, JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        redirectTo(ADMIN_BLOG_REQUESTS_ADDRESS, 3);
    }

    return (
        <Box>
            <Table.Root variant="surface">
                <Table.Body>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>博客名称</Strong></Table.RowHeaderCell>
                        <Table.Cell>{blogRequest.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>博客描述</Strong></Table.RowHeaderCell>
                        <Table.Cell>{blogRequest.description}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>RSS 地址</Strong></Table.RowHeaderCell>
                        <Table.Cell><Link href={blogRequest.rssAddress}>{blogRequest.rssAddress}</Link></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>博主邮箱</Strong></Table.RowHeaderCell>
                        <Table.Cell>{blogRequest.adminEmail}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>提交时间</Strong></Table.RowHeaderCell>
                        <Table.Cell>{blogRequest.requestedAt}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>博客详情页</Strong></Table.RowHeaderCell>
                        <Table.Cell><Link href={blogAddress}>{blogAddress}</Link></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>草稿文章抓取</Strong></Table.RowHeaderCell>
                        <Table.Cell>
                            <ul style={fontSize14Style}>
                                {
                                    blogRequest.posts.map(
                                        (post, index) => (
                                            <li key={index}>
                                                <a href={post.link}>{post.title}</a>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>失败原因</Strong></Table.RowHeaderCell>
                        <Table.Cell>{blogRequest.reason}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>审核状态</Strong></Table.RowHeaderCell>
                        <Table.Cell>{blogRequest.statusInfo}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.RowHeaderCell><Strong>操作</Strong></Table.RowHeaderCell>
                        <Table.Cell>
                            {
                                blogRequest.status == 'system_check_valid' ? <p>
                                    <form onSubmit={approve}>
                                        <button style={greenStyle} type="submit">审批通过</button>
                                    </form>
                                </p> : ''
                            }

                            <p>
                                <Form onSubmit={reject}>
                                    <Flex gap="1" align="center">
                                        <TextField.Root mt="2" style={inputStyle} name="reason" onChange={handleChange} />
                                        <Box><button style={redStyle} type="submit">驳回</button></Box>
                                    </Flex>
                                </Form>
                            </p>

                            <p>
                                <Form onSubmit={uncollected}>
                                    <Flex gap="1" align="center">
                                        <TextField.Root mt="2" style={inputStyle} name="reason" onChange={handleChange} />
                                        <Box><button style={redStyle} type="submit">移出收录名单</button></Box>
                                    </Flex>
                                </Form>
                            </p>

                            <p>
                                <Form onSubmit={deleteAllInfos}>
                                    <button style={redStyle} type="submit">删除全部数据</button>
                                </Form>
                            </p>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </Box>
    )
}