import { Flex, Button } from '@radix-ui/themes';

export default function Pagination({ pageNo, pageSize, total, setCurrectPage }) {
    const hasPre = pageNo > 1 ? true : false;
    const hasNext = total > pageNo * pageSize ? true : false;

    return (
        <Flex justify="between">
            <Button onClick={() => setCurrectPage(pageNo - 1)} disabled={!hasPre}>« 上一页</Button>

            <Button onClick={() => setCurrectPage(pageNo + 1)} disabled={!hasNext}>下一页 »</Button>
        </Flex>
    )
}