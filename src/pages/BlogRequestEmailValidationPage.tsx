import { Flex } from '@radix-ui/themes';

import { Meta } from '@components/common';
import BlogRequestAddMainContentHeader from '@components/blog-request/BlogRequestAddMainContentHeader';
import BlogRequestEmailValidation from '@components/blog-request/BlogRequestEmailValidation';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: '提交博客 - 博友圈 · 博客人的朋友圈！',
    keywords: '提交博客, 邮箱验证',
    description: '提交博客，邮箱验证。'
}

export default function BlogRequestEmailValidationPage() {
    return (
        <>
            <Meta meta={meta} />
            <Flex direction="column" gap="4">
                <BlogRequestAddMainContentHeader />
                <BlogRequestEmailValidation />
            </Flex>
        </>
    )
}