import React from 'react';
import { useEffect, useState } from 'react';
import AdminMenuHeader from '../AdminMenuHeader';
import MonthlySelectedCard from '../../monthly-selected/MonthlySelectedCard';
import RequestUtil from '../../../utils/APIRequestUtil';
import Pagination from '../../pagination/Pagination';
import AdminMenu from '../AdminMenu';
import { Layout, Row, Col, Button, Typography, Space, Spin, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ADMIN_LOGIN_ADDRESS, ADMIN_POST_IMAGE_ADD_ADDRESS } from '../../../utils/PageAddressUtil';
import { getCookie } from '../../../utils/CookieUtil';
import { redirectTo } from '../../../utils/CommonUtil';

const { Title } = Typography;
const { Content } = Layout;

interface MonthlySelectedItem {
    yearMonthStr?: string;
    postInfos?: Array<{
        link: string;
        [key: string]: any;
    }>;
    [key: string]: any;
}

export default function AdminMonthlySelected(): React.JSX.Element {
    const [pageNo, setPageNo] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [item, setItem] = useState<MonthlySelectedItem>({});
    const [dataReady, setDataReady] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const permissionCheck = async (): Promise<void> => {
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');

        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const permissionCheckResp = await RequestUtil.get(`/api/admin/permission-check`, {
            'username': username,
            'sessionId': sessionId,
        });

        if (typeof permissionCheckResp === 'string' || permissionCheckResp.status !== 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
        }
    };

    const fetchData = async (pageNoParam: number): Promise<void> => {
        setLoading(true);
        const username = getCookie('username');
        const sessionId = getCookie('sessionId');

        if (!username || !sessionId) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const permissionCheckResp = await RequestUtil.get(`/api/admin/permission-check`, {
            'username': username,
            'sessionId': sessionId,
        });

        if (typeof permissionCheckResp === 'string' || permissionCheckResp.status !== 200) {
            redirectTo(ADMIN_LOGIN_ADDRESS);
            return;
        }

        const resp = await RequestUtil.get(`/api/monthly-selected?page=${pageNoParam}&includeCurrentMonth=true`);

        if (typeof resp === 'string') {
            setLoading(false);
            return;
        }

        const respBody = await resp.json();
        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setItem(respBody.results[0]);
        setLoading(false);
    };

    useEffect(() => {
        permissionCheck();
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNoParam: number): void => {
        setPageNo(pageNoParam);

        const element = document.getElementById('monthly-selected-container');
        if (element) {
            element.scrollIntoView();
        }
    };

    const addPostImage = (link: string): void => {
        const url = ADMIN_POST_IMAGE_ADD_ADDRESS + '?link=' + encodeURIComponent(link);
        window.open(url);
    };

    if (!dataReady || loading) {
        return (
            <Layout>
                <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout>
            <Content>
                <AdminMenuHeader title='每月精选 - 管理页面' />
                <AdminMenu />
                <div id="monthly-selected-container" style={{ marginBottom: '8px' }}>
                    <Card style={{ marginBottom: '16px' }}>
                        <Title level={3} style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                            {item.yearMonthStr}
                        </Title>

                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Row gutter={[16, 16]}>
                                {(item.postInfos || []).map((postInfo, index) => (
                                    <Col xs={24} md={12} key={index}>
                                        <Space size="small" style={{ width: '100%' }}>
                                            <div style={{ flex: 1 }}>
                                                <MonthlySelectedCard
                                                    postInfo={postInfo}
                                                    showImage="true" />
                                            </div>
                                            <Button 
                                                size="small"
                                                icon={<PlusOutlined />}
                                                onClick={() => addPostImage(postInfo.link)}
                                            >
                                                配图
                                            </Button>
                                        </Space>
                                    </Col>
                                ))}
                            </Row>

                            <Pagination
                                pageNo={pageNo}
                                pageSize={pageSize}
                                total={total}
                                setCurrectPage={setCurrectPage} />
                        </Space>
                    </Card>
                </div>
            </Content>
        </Layout>
    )
}