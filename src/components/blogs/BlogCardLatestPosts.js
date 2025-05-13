import { Box, Flex, Text, Table, Link } from '@radix-ui/themes';
import { formatDateStr } from '../../utils/DateUtil';
import { getAbstractAddress, getGoAddress } from '../../utils/PageAddressUtil';

const marginRightStyle = { marginRight: '6px', color: 'var(--secondary)' };

export default function BlogCardLatestPosts({ statusOk, posts }) {
    return (
        <Box>
            <Flex direction="column">
                <Text>最新文章</Text>
                <Box>
                    <Table.Root unstyled>
                        <Table.Body style={{ overflowX: 'auto' }}>
                            {
                                posts.map(
                                    (post, index) => (
                                        <Table.Row key={index}>
                                            <Table.RowHeaderCell><Text size="2">{formatDateStr(post.publishedAt, true)}</Text></Table.RowHeaderCell>
                                            <Table.Cell>
                                                {statusOk ? <Link href={getGoAddress(post.link)}>{post.title}</Link>
                                                    : <Link href={getAbstractAddress(post.link)}>{post.title}</Link>}
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                )
                            }
                        </Table.Body>
                    </Table.Root>
                </Box>
            </Flex>
        </Box>
    )
}