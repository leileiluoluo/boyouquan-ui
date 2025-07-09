import { Flex, Button } from '@radix-ui/themes';

export default function Pagination({ pageNo, pageSize, total, setCurrectPage }) {
    const hasPre = pageNo > 1 ? true : false;
    const hasNext = total > pageNo * pageSize ? true : false;

    return (
        <Flex justify="between">
            <Button style={{ fontSize: '12px' }} onClick={() => setCurrectPage(pageNo - 1)} disabled={!hasPre}>« 上一页</Button>

            <Button style={{ fontSize: '12px' }} onClick={() => setCurrectPage(pageNo + 1)} disabled={!hasNext}>下一页 »</Button>
        </Flex>
    )
}