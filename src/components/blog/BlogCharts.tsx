import React from 'react';
import { useEffect, useState } from 'react';
import { Chart } from 'frappe-charts';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Tabs, Typography } from 'antd';

const { Text } = Typography;

export default function BlogCharts({ domain }) {
    const [activeTab, setActiveTab] = useState('access-charts');
    const [hasPublishChart, setHasPublishChart] = useState(false);
    const [hasInitiatedChart, setHasInitiatedChart] = useState(false);
    const [charts, setCharts] = useState({
        accessChart: null,
        publishChart: null,
        initiatedChart: null
    });

    const fetchData = async (domain) => {
        const resp = await RequestUtil.get(`/api/blogs/charts?domainName=${domain}`);

        const respBody = await resp.json();

        const accessChart = newChart('#access-charts', '最近一年文章浏览统计', '次浏览', respBody.yearlyAccessDataLabels, respBody.yearlyAccessDataValues, '#fd8754');

        let publishChart = null;
        if (respBody.showLatestPublishedAtChart) {
            setHasPublishChart(true);
            publishChart = newChart('#publish-charts', '最近一年文章收录统计', '篇文章', respBody.yearlyPublishDataLabels, respBody.yearlyPublishDataValues, '#cc6cf6');
        }

        let initiatedChart = null;
        if (respBody.showLatestInitiatedChart) {
            setHasInitiatedChart(true);
            initiatedChart = newChart('#initiated-charts', '最近一年星球穿梭助力统计', '次穿梭', respBody.yearlyInitiatedDataLabels, respBody.yearlyInitiatedDataValues, '#4299f5');
        }

        setCharts({ accessChart, publishChart, initiatedChart });

        return () => {
            accessChart.destroy();
            if (publishChart) publishChart.destroy();
            if (initiatedChart) initiatedChart.destroy();
        };
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    // 定义 Tab 项
    const tabItems = [
        { key: 'access-charts', label: '浏览统计' },
        ...(hasPublishChart ? [{ key: 'publish-charts', label: '收录统计' }] : []),
        ...(hasInitiatedChart ? [{ key: 'initiated-charts', label: '穿梭统计' }] : [])
    ];

    return (
        <Card style={{ padding: 16, width: '100%' }}>
            <Flex vertical gap={4}>
                <Text type="secondary" style={{ fontSize: 14 }}>数据统计</Text>
                <Tabs
                    activeKey={activeTab}
                    onChange={handleTabChange}
                    items={tabItems}
                    size="small"
                />
                <div id='access-charts' style={{ display: activeTab === 'access-charts' ? 'block' : 'none' }}></div>
                <div id='publish-charts' style={{ display: activeTab === 'publish-charts' ? 'block' : 'none' }}></div>
                <div id='initiated-charts' style={{ display: activeTab === 'initiated-charts' ? 'block' : 'none' }}></div>
            </Flex>
        </Card>
    )
}

function newChart(id, title, note, labels, values, color) {
    return new Chart(id, {
        data: {
            labels: labels,
            datasets: [
                {
                    name: note,
                    chartType: 'line',
                    values: values
                }
            ],
        },
        type: 'bar',
        height: 200,
        colors: [color],
        axisOptions: {
            xIsSeries: true,
            xAxisMode: "tick",
        },
        lineOptions: {
            hideDots: 0,
            regionFill: 1,
            heatline: 1,
            dotSize: 6,
        },
        tooltipOptions: {
            formatTooltipX: d => (d + '').toUpperCase(),
            formatTooltipY: d => d,
        }
    });
}