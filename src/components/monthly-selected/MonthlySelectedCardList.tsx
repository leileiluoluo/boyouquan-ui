import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import MonthlySelectedCard from './MonthlySelectedCard';
import Pagination from '../pagination/Pagination';
import { Flex, Typography, Row, Col, Spin, Divider } from 'antd';

const { Title } = Typography;

function formatDateToChinese(dateStr) {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('/');
    const monthNum = parseInt(month, 10);
    return `${year} 年 ${monthNum} 月精选`;
}

function countHasImageUsingFilter(items) {
    return items.filter(item => item.hasImage).length;
}

export default function MonthlySelectedCardList() {
    // 从 URL 读取 page 参数
    const getPageFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page');
        return page ? parseInt(page) : 1;
    };

    const [pageNo, setPageNo] = useState(getPageFromURL);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [imageCount, setImageCount] = useState(0);
    const [yearMonthStr, setYearMonthStr] = useState('');
    const [postInfos, setPostInfos] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (pageNoValue: number) => {
        setDataReady(false);
        
        try {
            const resp = await RequestUtil.get(`/api/monthly-selected?page=${pageNoValue}`);
            const respBody = await resp.json();

            setPageSize(respBody.pageSize);
            setTotal(respBody.total);
            
            if (respBody.results && respBody.results.length > 0) {
                setYearMonthStr(respBody.results[0].yearMonthStr);

                const postInfoList = respBody.results[0].postInfos || [];
                postInfoList.sort((a, b) => Number(b.hasImage) - Number(a.hasImage));
                setPostInfos(postInfoList);

                const showImageCount = countHasImageUsingFilter(postInfoList);
                setImageCount(showImageCount % 2 === 1 && showImageCount > 0 ? showImageCount - 1 : showImageCount);
            } else {
                setPostInfos([]);
                setImageCount(0);
                setYearMonthStr('');
            }
        } catch (error) {
            console.error('Failed to fetch monthly selected data:', error);
            setPostInfos([]);
            setImageCount(0);
        } finally {
            setDataReady(true);
        }
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (newPageNo: number) => {
        if (newPageNo === pageNo) return;
        
        // 更新 URL
        const url = new URL(window.location.href);
        if (newPageNo > 1) {
            url.searchParams.set('page', newPageNo.toString());
        } else {
            url.searchParams.delete('page');
        }
        window.history.pushState({}, '', url.toString());
        
        // 更新页码（会触发 useEffect 重新请求数据）
        setPageNo(newPageNo);
        
        const element = document.getElementById('monthly-selected-container');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!dataReady) {
        return (
            <Flex justify="center" align="center" style={{ padding: '100px 0' }}>
                <Spin />
            </Flex>
        );
    }

    if (!postInfos.length && total === 0) {
        return (
            <Flex vertical gap={12} id="monthly-selected-container">
                <Flex justify="center" align="center" style={{ padding: '100px 0' }}>
                    <Typography.Text type="secondary">暂无数据</Typography.Text>
                </Flex>
                <Pagination
                    pageNo={pageNo}
                    pageSize={pageSize}
                    total={total}
                    setCurrectPage={setCurrectPage} />
            </Flex>
        );
    }

    return (
        <Flex vertical gap={12} id="monthly-selected-container">
            <Flex vertical gap={8}>
                <Title level={4} style={{ margin: 0 }}>
                    {formatDateToChinese(yearMonthStr)}
                </Title>
                <Divider style={{ margin: '12px 0', width: 100, alignSelf: 'center' }} />
            </Flex>

            {imageCount > 0 && (
                <Row gutter={[12, 24]}>
                    {postInfos.slice(0, imageCount).map((postInfo, index) => (
                        <Col xs={24} lg={12} key={index}>
                            <MonthlySelectedCard postInfo={postInfo} showImage={true} />
                        </Col>
                    ))}
                </Row>
            )}

            {postInfos.length > imageCount && (
                <Flex vertical gap={16}>
                    {postInfos.slice(imageCount).map((postInfo, index) => (
                        <MonthlySelectedCard key={index} postInfo={postInfo} showImage={false} />
                    ))}
                </Flex>
            )}

            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </Flex>
    );
}