import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import MonthlySelectedCard from './MonthlySelectedCard';
import Pagination from '../pagination/Pagination';
import { Flex, Typography, Row, Col, Spin, Divider } from 'antd';

const { Title } = Typography;

function formatDateToChinese(dateStr) {
    const [year, month] = dateStr.split('/');
    const monthNum = parseInt(month, 10);
    return `${year} 年 ${monthNum} 月精选`;
}

function countHasImageUsingFilter(items) {
    return items.filter(item => item.hasImage).length;
}

export default function MonthlySelectedCardList() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [imageCount, setImageCount] = useState(0);
    const [yearMonthStr, setYearMonthStr] = useState();
    const [postInfos, setPostInfos] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`/api/monthly-selected?page=${pageNo}`);
        const respBody = await resp.json();

        setDataReady(true);
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setYearMonthStr(respBody.results[0].yearMonthStr);

        const postInfoList = respBody.results[0].postInfos;
        postInfoList.sort((a, b) => Number(b.hasImage) - Number(a.hasImage));
        setPostInfos(postInfoList);

        const showImageCount = countHasImageUsingFilter(postInfoList);
        setImageCount(showImageCount % 2 === 1 && showImageCount > 0 ? showImageCount - 1 : showImageCount);
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);
        document.getElementById('monthly-selected-container')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!dataReady) {
        return (
            <Flex justify="center" align="center" style={{ padding: '100px 0' }}>
                <Spin size="large" />
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
                <Row gutter={[24, 24]}>
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