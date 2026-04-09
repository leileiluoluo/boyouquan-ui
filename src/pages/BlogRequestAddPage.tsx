import { Flex } from '@radix-ui/themes';

import { Meta } from '@components/common';
import BlogRequestAddMainContentHeader from '@components/blog-request/BlogRequestAddMainContentHeader';
import BlogRequestAdd from '@components/blog-request/BlogRequestAdd';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: '提交博客 - 博友圈 · 博客人的朋友圈！',
    keywords: '提交博客',
    description: '提交博客。'
}

export default function BlogRequestAddPage() {
    return (
        <>
            <Meta meta={meta} />
            <Flex direction="column" gap="4">
                <BlogRequestAddMainContentHeader />
                <BlogRequestAdd />
            </Flex>
        </>
    )
}