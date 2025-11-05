import React from 'react';
import AdminMenuHeader from './AdminMenuHeader';
import AdminMenu from './AdminMenu';
import AdminRecommendedPostAdd from './recommended-posts/AdminRecommendedPostAdd';

export default function AdminRecommendPost() {
    return (
        <>
            <AdminMenuHeader title='推荐文章 - 管理页面' />
            <AdminMenu />
            <AdminRecommendedPostAdd />
        </>
    )
}