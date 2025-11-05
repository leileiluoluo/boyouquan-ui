import React from 'react';
import CommonHeader from '../components/common/CommonHeader';
import CommonFooter from '../components/common/CommonFooter';
import BlogRequestAddMainContentHeader from '../components/blog-request/BlogRequestAddMainContentHeader';
import Meta from '../components/common/Meta';
import BlogRequestAdd from '../components/blog-request/BlogRequestAdd';
import { Box, Container, Flex } from '@radix-ui/themes';

const meta = {
    title: '提交博客 - 博友圈 · 博客人的朋友圈！',
    keywords: '提交博客',
    description: '提交博客。'
}

export default function BlogRequestAddPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">

                <Box>
                    <Container size="2">
                        <Flex direction="column" gap="4">
                            <BlogRequestAddMainContentHeader />
                            <BlogRequestAdd />
                        </Flex>
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}