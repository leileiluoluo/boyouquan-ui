import { useEffect, useState, useCallback, useRef } from 'react';
import { Flex, Skeleton, Typography, Row, Col, Card, Spin, Empty, message, Grid } from 'antd';
import RequestUtil from '../../utils/APIRequestUtil';
import MomentsCard from './MomentsCard';

const { Title } = Typography;
const { useBreakpoint } = Grid;

// 根据屏幕断点获取每行列数
const getColumnsCount = (screens) => {
    if (screens.xxl) return 4;      // ≥1600px: 4列
    if (screens.xl) return 3;       // ≥1200px: 3列
    if (screens.lg) return 3;       // ≥992px: 3列
    if (screens.md) return 2;       // ≥768px: 2列
    return 1;                        // <768px: 1列
};

// 根据每行列数计算每次请求的数量
const getPageSizeByColumns = (columnsCount) => {
    const screensPerLoad = 3; // 每次加载 3 屏的数据
    return columnsCount * screensPerLoad;
};

export default function MomentsCardList() {
    const screens = useBreakpoint();
    const [pageNo, setPageNo] = useState(1);
    const [total, setTotal] = useState(0);
    const [moments, setMoments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [dynamicPageSize, setDynamicPageSize] = useState(9);
    
    const observerRef = useRef(null);
    const loadingRef = useRef(null);

    // 监听屏幕尺寸变化，重新计算 pageSize
    useEffect(() => {
        const columnsCount = getColumnsCount(screens);
        const newPageSize = getPageSizeByColumns(columnsCount);
        setDynamicPageSize(newPageSize);
        
        // 如果 pageSize 变化且不是初始加载，重新获取数据
        if (!initialLoading && moments.length > 0) {
            setPageNo(1);
            setMoments([]);
            setHasMore(true);
            fetchData(1, false, newPageSize);
        }
    }, [screens]);

    const fetchData = async (page: number, isLoadMore = false, customPageSize?: number) => {
        if (loading) return;
        
        const size = customPageSize || dynamicPageSize;
        setLoading(true);
        try {
            const resp = await RequestUtil.get(`/api/moments?page=${page}&size=${size}`);
            const respBody = await resp.json();
            
            const newResults = respBody.results || [];
            const currentTotal = respBody.total || 0;
            
            if (page === 1) {
                setMoments(newResults);
            } else {
                setMoments(prev => [...prev, ...newResults]);
            }
            
            setTotal(currentTotal);
            
            // 修复：正确判断是否还有更多数据
            const loadedCount = page === 1 ? newResults.length : moments.length + newResults.length;
            setHasMore(loadedCount < currentTotal);
            
        } catch (error) {
            message.error('加载失败，请稍后重试');
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    };

    // 初始加载
    useEffect(() => {
        const columnsCount = getColumnsCount(screens);
        const initialSize = getPageSizeByColumns(columnsCount);
        setDynamicPageSize(initialSize);
        fetchData(1, false, initialSize);
    }, []);

    // 无限滚动监听
    useEffect(() => {
        if (initialLoading) return;
        
        const options = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const callback = (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && hasMore && !loading) {
                const nextPage = pageNo + 1;
                setPageNo(nextPage);
                fetchData(nextPage, true);
            }
        };

        observerRef.current = new IntersectionObserver(callback, options);
        
        if (loadingRef.current) {
            observerRef.current.observe(loadingRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, loading, pageNo, initialLoading]);

    const renderSkeleton = () => {
        const skeletonCount = dynamicPageSize;
        
        return (
            <Row gutter={[16, 16]}>
                {Array.from({ length: skeletonCount }).map((_, index) => (
                    <Col 
                        xs={24}
                        sm={12}
                        md={8}
                        lg={8}
                        xl={8}
                        xxl={6}
                        key={index}
                    >
                        <Card style={{ borderRadius: '12px' }}>
                            <Flex vertical gap={12}>
                                <Skeleton.Image active style={{ width: '100%', height: 176 }} />
                                <Flex vertical gap={8}>
                                    <Skeleton.Input active size="small" block />
                                    <Flex gap={8} align="center">
                                        <Skeleton.Avatar active size="small" />
                                        <Skeleton.Input active size="small" style={{ width: 80 }} />
                                        <Skeleton.Input active size="small" style={{ width: 50 }} />
                                        <Skeleton.Input active size="small" style={{ width: 40 }} />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    };

    const renderLoadMore = () => {
        if (!hasMore && moments.length > 0) {
            return (
                <Flex justify="center" style={{ padding: '20px 0' }}>
                    <Typography.Text type="secondary">没有更多了 ~</Typography.Text>
                </Flex>
            );
        }
        
        if (loading && moments.length > 0) {
            return (
                <Flex justify="center" style={{ padding: '20px 0' }}>
                    <Spin tip="加载中..." />
                </Flex>
            );
        }
        
        return <div ref={loadingRef} style={{ height: '20px' }} />;
    };

    if (initialLoading) {
        return (
            <Flex vertical gap={24} style={{ width: '100%' }}>
                <div id="moments-container">
                    <Title level={4} style={{ marginBottom: 16, fontWeight: 'bold' }}>
                        最新随拍
                    </Title>
                    {renderSkeleton()}
                </div>
            </Flex>
        );
    }

    return (
        <Flex vertical gap={24} style={{ width: '100%' }}>
            <div id="moments-container">
                <Title level={4} style={{ marginBottom: 16, fontWeight: 'bold' }}>
                    最新随拍
                </Title>

                {moments.length === 0 ? (
                    <Empty description="暂无随拍内容" />
                ) : (
                    <>
                        <Row gutter={[16, 16]}>
                            {moments.map((moment) => (
                                <Col 
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    lg={8}
                                    xl={8}
                                    xxl={6}
                                    key={moment.id}
                                >
                                    <MomentsCard moment={moment} />
                                </Col>
                            ))}
                        </Row>
                        {renderLoadMore()}
                    </>
                )}
            </div>
        </Flex>
    );
}