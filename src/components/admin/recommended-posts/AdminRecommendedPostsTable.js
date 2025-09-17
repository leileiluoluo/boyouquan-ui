import { Box, Table, Link, Text, Button, Flex } from '@radix-ui/themes';

import { redirectTo } from '../../../utils/CommonUtil';
import { getCookie } from '../../../utils/CookieUtil';
import { formatDateStr } from '../../../utils/DateUtil';
import { getBlogAddress } from '../../../utils/PageAddressUtil';
import { ADMIN_RECOMMENDED_POSTS_ADDRESS, ADMIN_POST_IMAGE_ADD_ADDRESS } from '../../../utils/PageAddressUtil';
import RequestUtil from '../../../utils/APIRequestUtil';

const unpin = (link) => {
    RequestUtil.patch('/api/admin/recommended-posts/unpin', JSON.stringify({ link: link }), {
        'Content-Type': 'application/json',
        'username': getCookie('username'),
        'sessionId': getCookie('sessionId')
    });

    redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS, 3);
};

const pin = (link) => {
    RequestUtil.patch('/api/admin/recommended-posts/pin', JSON.stringify({ link: link }), {
        'Content-Type': 'application/json',
        'username': getCookie('username'),
        'sessionId': getCookie('sessionId')
    });

    redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS, 3);
};

const addPostImage = (link) => {
    redirectTo(ADMIN_POST_IMAGE_ADD_ADDRESS + '?link=' + encodeURIComponent(link));
};

export default function AdminRecommendedPostsTable({ posts }) {
    return (
        <Box id="recommended-posts">
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>文章标题</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>博客名称</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>发布时间</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>操作</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        posts.map((post, index) => (
                            <Table.Row key={index}>
                                <Table.RowHeaderCell>
                                    <Text style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        <Link href={post.link}>{post.title}</Link>
                                    </Text>
                                </Table.RowHeaderCell>
                                <Table.Cell><Link href={getBlogAddress(post.blogDomainName)}>{post.blogName}</Link></Table.Cell>
                                <Table.Cell>{formatDateStr(post.publishedAt, true)}</Table.Cell>
                                <Table.Cell>
                                    <Flex gap="2">
                                        <Box>
                                            {
                                                post.pinned ? <Button size="1" color="crimson" onClick={() => unpin(post.link)}>取消置顶</Button>
                                                    : <Button size="1" color="cyan" onClick={() => pin(post.link)}>置顶</Button>
                                            }
                                        </Box>

                                        <Box>
                                            <Button size="1" color="amber" onClick={() => addPostImage(post.link)}>配图</Button>
                                        </Box>
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table.Root>
        </Box>
    )
}