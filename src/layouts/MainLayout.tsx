import React, { Suspense, lazy } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

import CommonHeader from './header/CommonHeader';
import CommonFooter from './footer/CommonFooter';

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
                className="common-content"
                style={{
                    // padding: '24px 32px',
                    background: 'rgb(250 252 252)',
                    minHeight: 'calc(100vh - 64px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                {/* 只保留：宽度100% + 最大宽度，其余全部不定义 */}
                <div
                    style={{
                        width: '100%',
                        maxWidth: 1000,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <CommonFooter />
        </Layout>
    );
};

export default MainLayout;