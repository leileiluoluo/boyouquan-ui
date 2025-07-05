import { Box, Flex, Text, Table, Link } from '@radix-ui/themes';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';

const marginRightStyle = { marginRight: '6px', color: 'var(--secondary)' };

export default function BlogCardLatestPosts({ statusOk, posts }) {
    return (
        <Box mt="1" mb="2">
            <Flex direction="column">
                <Text size="2" color="gray">最新文章</Text>
                <Flex direction="column">
                    {
                        posts.map(
                            (post, index) => (
                                <Flex gap="2" key={index}>
                                    <Text size="2">{formatDateStr(post.publishedAt, true)}</Text>
                                    <Text size="2" style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {statusOk ? <Link href={getGoAddress(post.link)}>{post.title}</Link>
                                            : <Link href={getAbstractAddress(post.link)}>{post.title}</Link>}
                                    </Text>
                                </Flex>
                            )
                        )
                    }
                </Flex>
                {/* <Box>
                    <Table.Root style={{
                        '--table-background': 'transparent',
                        '--table-border': 'none',
                        '--table-cell-padding': '0',
                        '--table-row-box-shadow': 'none',
                        '--table-row-border': 'none',
                    }}>
                        <Table.Body style={{ overflowX: 'auto' }}>
                            {
                                posts.map(
                                    (post, index) => (
                                        <Table.Row key={index} style={{ borderBottom: 'none' }}>
                                            <Table.RowHeaderCell><Text size="2">{formatDateStr(post.publishedAt, true)}</Text></Table.RowHeaderCell>
                                            <Table.Cell>
                                                <Text style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {statusOk ? <Link href={getGoAddress(post.link)}>{post.title}</Link>
                                                        : <Link href={getAbstractAddress(post.link)}>{post.title}</Link>}
                                                </Text>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )
                            }
                        </Table.Body>
                    </Table.Root>
                </Box> */}
            </Flex>
        </Box>
    )
}