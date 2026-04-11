import React from 'react';
import { Flex, Typography, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import RequestUtil from '../../utils/APIRequestUtil';
import { formatDateStr } from '../../utils/DateUtil';

const { Text, Link } = Typography;

export default function LinkGraphNotes() {
    const [loading, setLoading] = useState(true);
    const [datasetCreatedAt, setDatasetCreatedAt] = useState();

    const fetchDatasetCreatedAt = async () => {
        const resp = await RequestUtil.get(`/api/blog-intimacies/dataset-created-time`);

        const respBody = await resp.json();
        const createdAt = respBody.maxCreatedAt;
        const maxCreatedAt = null === createdAt ? 'Unknown' : formatDateStr(createdAt, true);
        setDatasetCreatedAt(maxCreatedAt);
        setLoading(false);
    };

    useEffect(() => {
        fetchDatasetCreatedAt();
    }, []);

    return (
        <Flex vertical style={{ marginTop: 8 }}>
            <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    * 友链数据从博客首页中含有「Link」、「友链」、「圈子」、「关于」等字样的内部页面抓取。
                </Text>
            </div>
            <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    * 该数据集每周末采集一次，这个频率不会对您的博客造成太大的压力，当前数据集采集于{' '}
                    {loading ? <Skeleton.Input active size="small" style={{ width: 40 }} /> : datasetCreatedAt}。
                </Text>
            </div>
            <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                    * 若您不想您的友链数据被采集，可以「
                    <Link 
                        href="mailto:support@boyouquan.com?subject=请将我移出友链抓取名单&body=我的博客地址：%0d%0a"
                        style={{ color: '#1677ff' }}
                    >
                        联系站长
                    </Link>
                    」将您的博客加入免采集名单。
                </Text>
            </div>
        </Flex>
    );
}