import { Flex, Box, Text, Table, Link, Strong } from '@radix-ui/themes';
import { getBlogAddress } from '../../utils/PageAddressUtil';

const style = { display: 'table', tableLayout: 'fixed' }

export default function BlogRequestTable({ name, description, domainName, address, rssAddress, adminEmail, requestedAt, approved, status, statusInfo, reason }) {
    const title = `博客「${name}」审核详情`;

    const blogAddress = approved ? getBlogAddress(domainName) : address;

    return (
        <Flex direction="column" gap="2">
            <Box>
                <Text size="3" weight="bold">{title}</Text>
            </Box>
            <Box>
                <Table.Root variant="surface">
                    <Table.Body>
                        <Table.Row>
                            <Table.RowHeaderCell><Strong>博客名称</Strong></Table.RowHeaderCell>
                            <Table.Cell>{name}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell><Strong>博客描述</Strong></Table.RowHeaderCell>
                            <Table.Cell>{description}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell><Strong>RSS 地址</Strong></Table.RowHeaderCell>
                            <Table.Cell><Link href={rssAddress}>{rssAddress}</Link></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell><Strong>博主邮箱</Strong></Table.RowHeaderCell>
                            <Table.Cell>{adminEmail}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell><Strong>提交时间</Strong></Table.RowHeaderCell>
                            <Table.Cell>{requestedAt}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.RowHeaderCell><Strong>审核状态</Strong></Table.RowHeaderCell>
                            <Table.Cell><Link href={blogAddress}>{statusInfo}</Link></Table.Cell>
                        </Table.Row>
                        {
                            'rejected' === status || 'uncollected' == status ? <Table.Row>
                                <Table.RowHeaderCell><Strong>驳回原因</Strong></Table.RowHeaderCell>
                                <Table.Cell>{reason}</Table.Cell>
                            </Table.Row> : ''
                        }
                    </Table.Body>
                </Table.Root>
            </Box>
        </Flex>
    )
}