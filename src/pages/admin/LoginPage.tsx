import React from 'react';
import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';
import Login from '../../components/admin/Login';
import { Box, Container } from '@radix-ui/themes';

const meta = {
    title: '登录 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '登录',
    description: '博友全管理后台登录页面。'
}

export default function LoginPage() {
    return (
        <>
            <Meta meta={meta} />
            <CommonHeader />
            <main className="main">
                <Box>
                    <Container size="2">
                        <Login />
                    </Container>
                </Box>
            </main>
            <CommonFooter />
        </>
    )
}