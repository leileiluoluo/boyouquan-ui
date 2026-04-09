// @layouts/MainLayout.tsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '@layouts/header/MainHeader';
import MainFooter from '@layouts/footer/MainFooter';

const { Content } = Layout;

// 不需要 Header/Footer 的路径列表
const NO_LAYOUT_PATHS = ['/planet-shuttle'];

const MainLayout: React.FC = () => {
    const location = useLocation();
    const shouldShowLayout = !NO_LAYOUT_PATHS.includes(location.pathname);

    if (!shouldShowLayout) {
        return <Outlet />;
    }

    return (
        <Layout>
            <MainHeader />
            <Content style={{ margin: '16px 0', padding: '0 48px' }}>
                <div
                    style={{
                        backgroundColor: 'white',
                        minHeight: 400,
                        padding: 24,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <MainFooter />
        </Layout>
    );
};

export default MainLayout;