import { Flex, Box, Heading, Table, Link } from '@radix-ui/themes';

import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress } from '../../utils/PageAddressUtil';

export default function MonthlySelectedCard({ yearMonthStr, postInfos }) {
    return (
        <Flex direction="column" gap="2">
            <Box>
                <Heading as="h4">{yearMonthStr}</Heading>
            </Box>
            <Box>
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>博客名称</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>文章标题</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>发布时间</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            postInfos.map(
                                (postInfo, index) => (

                                    <Table.Row>
                                        <Table.RowHeaderCell><Link href={getBlogAddress(postInfo.blogDomainName)}>{postInfo.blogName}</Link></Table.RowHeaderCell>
                                        <Table.Cell>
                                            {postInfo.blogStatusOk ?
                                                <Link href={getGoAddress(postInfo.link)}>{postInfo.title}</Link>
                                                : <Link href={getAbstractAddress(postInfo.link)}>{postInfo.title}</Link>
                                            }
                                        </Table.Cell>
                                        <Table.Cell>{formatDateStr(postInfo.publishedAt, true)}</Table.Cell>
                                    </Table.Row>
                                )
                            )
                        }
                    </Table.Body>
                </Table.Root>
            </Box>
        </Flex>
    )
}