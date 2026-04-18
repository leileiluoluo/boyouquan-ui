import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import MonthlySelectedCard from './MonthlySelectedCard';
import Pagination from '../pagination/Pagination';
import { Flex, Skeleton, Typography, Card, Row, Col, Spin } from 'antd';

const { Title, Text } = Typography;

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
        if (showImageCount % 2 === 1 && showImageCount > 0) {
            setImageCount(showImageCount - 1);
        } else {
            setImageCount(showImageCount);
        }
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);
        document.getElementById('monthly-selected-container').scrollIntoView();
    }

    if (!dataReady) {
        return (
            <Spin />
        );
    }

    return (
        <Flex vertical gap={12}>
            <div id="monthly-selected-container">
                <div style={{ marginBottom: 8 }}>
                    <Title level={4} style={{ marginBottom: 0 }}>
                        {formatDateToChinese(yearMonthStr)}
                    </Title>
                </div>

                <Row gutter={[12, 12]}>
                    {postInfos.map((postInfo, index) => (
                        <Col xs={24} md={12} key={index}>
                            <MonthlySelectedCard
                                postInfo={postInfo}
                                showImage={index < imageCount}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </Flex>
    );
}