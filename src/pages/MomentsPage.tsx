import { Flex } from 'antd';

import { MainContentHeader, Meta } from '@components/common';
import MomentsInput from '@components/moments/MomentsInput';
import MomentsCardList from '@components/moments/MomentsCardList';
import { MetaFields } from '@types';

const meta: MetaFields = {
    title: '随手一拍 - 博友圈 · 博客人的朋友圈！',
    keywords: '随手一拍，分享照片',
    description: '随手一拍，分享此刻的一个瞬间。'
};

export default function MomentsPage() {
    return (
        <>
            <Meta meta={meta} />
            <Flex vertical gap={16} style={{ width: '100%' }}>
                <MainContentHeader content="随手拍一张照片，然后附上一段话，分享您此刻看到的一处美景或一个瞬间！" />
                <MomentsInput />
                <MomentsCardList />
            </Flex>
        </>
    );
}