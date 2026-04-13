import React from 'react';
import { Flex, Button } from 'antd';

interface PaginationProps {
    pageNo: number;
    pageSize: number;
    total: number;
    setCurrectPage: (pageNo: number) => void;
}

export default function Pagination({ pageNo, pageSize, total, setCurrectPage }: PaginationProps): React.JSX.Element {
    const hasPre = pageNo > 1;
    const hasNext = total > pageNo * pageSize;

    return (
        <Flex justify="space-between">
            <Button
                type="primary"
                onClick={() => setCurrectPage(pageNo - 1)}
                disabled={!hasPre}
            >
                « 上一页
            </Button>
            <Button
                type="primary"
                onClick={() => setCurrectPage(pageNo + 1)}
                disabled={!hasNext}
            >
                下一页 »
            </Button>
        </Flex>
    );
}