import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import MonthlySelectedCard from './MonthlySelectedCard';
import Pagination from '../pagination/Pagination';
import { Box } from '@radix-ui/themes';

export default function MonthlySelectedCardList() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`/api/monthly-selected?page=${pageNo}`);

        const respBody = await resp.json();
        setPageSize(respBody.pageSize);
        setTotal(respBody.total);
        setItems(respBody.results);
    };

    useEffect(() => {
        fetchData(pageNo);
    }, [pageNo]);

    const setCurrectPage = (pageNo) => {
        setPageNo(pageNo);

        document.getElementsByClassName('monthly-selected-container')[0].scrollIntoView();
    }

    return (
        <>
            <Box>
                {
                    items.map(
                        (item, index) => (
                            <MonthlySelectedCard
                                key={index}
                                yearMonthStr={item.yearMonthStr}
                                postInfos={item.postInfos} />
                        ))
                }
            </Box>
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </>
    )
}