import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/RequestUtil';
import MonthlySelectedCard from './MonthlySelectedCard';
import Pagination from '../pagination/Pagination';

export default function MonthlySelectedCardList() {
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);

    const fetchData = async (pageNo) => {
        const resp = await RequestUtil.get(`https://www.boyouquan.com/api/monthly-selected?page=${pageNo}`);

        setPageSize(resp.pageSize);
        setTotal(resp.total);
        setItems(resp.results);
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
            <div className="monthly-selected-container">
                {
                    items.map(
                        (item, index) => (
                            <MonthlySelectedCard
                                key={index}
                                yearMonthStr={item.yearMonthStr}
                                postInfos={item.postInfos} />
                        ))
                }
            </div>
            <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                total={total}
                setCurrectPage={setCurrectPage} />
        </>
    )
}