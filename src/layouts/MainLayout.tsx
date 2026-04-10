// @layouts/MainLayout.tsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

import MainHeader from '@layouts/header/MainHeader';
import MainFooter from '@layouts/footer/MainFooter';
import SpecialThanks from '@components/common/special-thanks/SpecialThanks';

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
            <MainHeader />
            <Content>
                <div
                    style={{
                        marginTop: '10px',
                        backgroundColor: '#f5f5f5',
                        minHeight: '400px',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '900px',  // 固定最大宽度
                            margin: '0 auto',     // 水平居中
                            padding: '40px 24px',
                            backgroundColor: '#fff',
                            minHeight: '400px',
                        }}
                    >
                        <Outlet />
                    </div>
                </div>
            </Content>
            <SpecialThanks isHome={true} />
            <MainFooter />
        </Layout>
    );
};

export default MainLayout;