import React from 'react';
import CommonHeader from '../../components/common/CommonHeader';
import CommonFooter from '../../components/common/CommonFooter';
import Meta from '../../components/common/Meta';
import AdminMonthlySelected from '../../components/admin/monthly-selected/AdminMonthlySelected';

const meta = {
    title: '每月精选 - 管理页面 - 博友圈 · 博客人的朋友圈！',
    keywords: '管理页面',
    description: '管理页面'
}

export default function AdminMonthlySelectedPage() {
    return (
        <AdminMonthlySelected />
    )
}