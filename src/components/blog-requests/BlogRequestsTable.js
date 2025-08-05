import { Box, Table, Link, Text } from '@radix-ui/themes';

import { formatDateStr } from '../../utils/DateUtil';
import { getAdminBlogRequestAddress, getBlogRequestAddress } from '../../utils/PageAddressUtil';

export default function BlogRequestsTable({ requests, adminPage }) {
    return (
        <Box id="blog-requests">
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>博客名称</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>博主邮箱</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>提交时间</Table.ColumnHeaderCell>
                        {adminPage ? <Table.ColumnHeaderCell>自行提交</Table.ColumnHeaderCell> : ''}
                        <Table.ColumnHeaderCell>审核状态</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        requests.map((request, index) => (
                            <Table.Row key={index}>
                                <Table.RowHeaderCell>
                                    <Text weight="bold" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        <Link href={adminPage ? getAdminBlogRequestAddress(request.id) : getBlogRequestAddress(request.id)}>{request.name}</Link>
                                    </Text>
                                </Table.RowHeaderCell>
                                <Table.Cell>{request.adminEmail}</Table.Cell>
                                <Table.Cell>{formatDateStr(request.requestedAt, true)}</Table.Cell>
                                {adminPage ? <Table.Cell>{request.selfSubmitted ? '是' : '否'}</Table.Cell> : ''}
                                <Table.Cell>{request.statusInfo}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table.Root>
        </Box>
    )
}