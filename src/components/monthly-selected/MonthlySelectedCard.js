import { Flex, Box, Text, Table, Link, Heading } from '@radix-ui/themes';

import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getBlogAddress, getGoAddress } from '../../utils/PageAddressUtil';

export default function MonthlySelectedCard({ yearMonthStr, postInfos }) {
    return (
        <Flex direction="column" gap="2">
            <Box>
                <Heading size="4" weight="bold">{yearMonthStr}</Heading>
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
                                    <Table.Row key={index}>
                                        <Table.RowHeaderCell><Link href={getBlogAddress(postInfo.blogDomainName)}>{postInfo.blogName}</Link></Table.RowHeaderCell>
                                        <Table.Cell>
                                            <Text style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {postInfo.blogStatusOk ?
                                                    <Link href={getGoAddress(postInfo.link)}>{postInfo.title}</Link>
                                                    : <Link href={getAbstractAddress(postInfo.link)}>{postInfo.title}</Link>
                                                }
                                            </Text>
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