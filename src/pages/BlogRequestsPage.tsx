import { Box, Container, Flex } from '@radix-ui/themes';

import { CommonHeader, CommonFooter, MainContentHeader, SearchBox, Meta } from '@components/common';
import BlogRequests from '@components/blog-requests/BlogRequests';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: '博客审核结果 - 博友圈 · 博客人的朋友圈！',
    keywords: '博客收录申请',
    description: '博客收录申请。'
}

export default function BlogRequestsPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <MainContentHeader content="这里会列出所有已提交的博客与审核结果，如果您的博客很遗憾被驳回了，请按照错误提示修改后重新提交！" />
                            <SearchBox placeholder="搜索已提交的博客 ↵" gotoPage="/blog-requests" />
                            <BlogRequests />
                        </Flex>
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}