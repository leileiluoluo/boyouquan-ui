import React, { useEffect, useState } from 'react';
import { Menu, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom'; // 如果你项目用的是 next/link 就换成 next/link

const { Text } = Typography;

export default function Header(): React.JSX.Element {
    const [pathname, setPathname] = useState<string>('');

    // 渐变文字样式（完全保留）
    const siteNameStyle: React.CSSProperties = {
        fontSize: '22px',
        fontWeight: 500,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundImage: 'linear-gradient(to right, rgba(205, 28, 87, 1), rgba(126, 9, 184, 1))',
        cursor: 'pointer',
        textDecoration: 'none'
    };

    // 获取当前路径
    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    // 导航选中逻辑
    const getSelectedKey = () => {
        if (pathname === '/home') return 'home';
        if (pathname === '/moments') return 'moments';
        if (pathname === '/monthly-selected') return 'monthly-selected';
        if (pathname.startsWith('/blogs')) return 'blogs';
        if (pathname === '/link-graphs') return 'link-graphs';
        if (pathname.startsWith('/blog-requests/add')) return 'blog-add';
        if (pathname.startsWith('/blog-requests')) return 'blog-requests';
        return 'home';
    };

    // 导航菜单
    const menuItems = [
        { key: 'home', label: <Link to="/home">首页</Link> },
        { key: 'moments', label: <Link to="/moments">随手一拍</Link> },
        { key: 'monthly-selected', label: <Link to="/monthly-selected">每月精选</Link> },
        { key: 'blogs', label: <Link to="/blogs">博客广场</Link> },
        { key: 'link-graphs', label: <Link to="/link-graphs">连接系数</Link> },
        { key: 'planet-shuttle', label: <a href="/planet-shuttle" target="_blank" rel="noreferrer">星球穿梭</a> },
        { key: 'blog-add', label: <Link to="/blog-requests/add/email-validation">提交博客</Link> },
        { key: 'blog-requests', label: <Link to="/blog-requests">审核结果</Link> },
    ];

    return (
        <div style={{ marginTop: -8, marginBottom: 10 }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 16px' }}>
                <Row align="middle" justify="space-between">
                    {/* 左侧 Logo */}
                    <Col flex="20%">
                        <div style={{ marginTop: 4 }}>
                            <Link to="/" style={siteNameStyle}>
                                博友圈
                            </Link>
                        </div>
                    </Col>

                    {/* 右侧横向滚动导航 */}
                    <Col flex="80%">
                        <div style={{
                            whiteSpace: 'nowrap',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }}>
                            <Menu
                                mode="horizontal"
                                selectedKeys={[getSelectedKey()]}
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    borderBottom: 'none'
                                }}
                                items={menuItems}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}