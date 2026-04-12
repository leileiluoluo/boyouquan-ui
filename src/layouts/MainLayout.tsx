// @layouts/MainLayout.tsx
import React, { Suspense, lazy } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '@layouts/header/MainHeader';
import MainFooter from '@layouts/footer/MainFooter';
import Header from './header/CommonHeader';
import CommonHeader from './header/CommonHeader';
import CommonFooter from './footer/CommonFooter';

const SpecialThanks = lazy(() => import('@components/common/special-thanks/SpecialThanks'));

const { Content } = Layout;

// 不需要 Header/Footer 的路径列表
const NO_LAYOUT_PATHS = ['/planet-shuttle', '/go', '/certificates'];

const MainLayout: React.FC = () => {
    const location = useLocation();

    const shouldShowLayout = !NO_LAYOUT_PATHS.some(path => location.pathname.includes(path));

    if (!shouldShowLayout) {
        return <Outlet />;
    }

    return (
        <Layout>
            <CommonHeader />
            <Content
                style={{
                    padding: 24,
                    background: '#f0f2f5', // AntD 官方标准背景色
                    minHeight: 'calc(100vh - 64px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: 1000,
                        background: '#fff',    // 内容区白色背景
                        borderRadius: 8,       // 圆角更美观
                        padding: '24px',       // 内边距
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', // 极轻阴影
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Suspense>
                {/* <SpecialThanks isHome={true} /> */}
            </Suspense>
            <CommonFooter />
        </Layout>
    );
};

export default MainLayout;