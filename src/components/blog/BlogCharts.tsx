import React from 'react';
import { useEffect, useState } from 'react';
import { Chart } from 'frappe-charts';
import RequestUtil from '../../utils/APIRequestUtil';
import { Card, Flex, Tabs, Text } from '@radix-ui/themes';

export default function BlogCharts({ domain }) {
    const [showAccessChart, setShowAccessChart] = useState(true);
    const [showPublishChart, setShowPublishChart] = useState(false);
    const [showInitiatedChart, setShowInitiatedChart] = useState(false);

    const [hasPublishChart, setHasPublishChart] = useState(false);
    const [hasInitiatedChart, setHasInitiatedChart] = useState(false);

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

        return () => {
            accessChart.destroy();
            if (null !== publishChart) {
                publishChart.destroy();
            }
            if (null !== initiatedChart) {
                initiatedChart.destroy();
            }
        };
    };

    const handleValueChange = (value) => {
        setShowAccessChart(false);
        setShowPublishChart(false);
        setShowInitiatedChart(false);
        if ('access-charts' === value) {
            setShowAccessChart(true);
        } else if ('publish-charts' == value) {
            setShowPublishChart(true);
        } else if ('initiated-charts' == value) {
            setShowInitiatedChart(true);
        }
    };

    useEffect(() => {
        fetchData(domain);
    }, [domain]);

    return (
        <Card style={{ padding: 'var(--space-4)' }}>
            <Flex direction="column" gap="1">
                <Text size="2" color="gray">数据统计</Text>
                <Tabs.Root defaultValue="access-charts" onValueChange={handleValueChange}>
                    <Tabs.List size="1">
                        <Tabs.Trigger value="access-charts" >浏览统计</Tabs.Trigger>
                        <Tabs.Trigger value="publish-charts" style={{ display: hasPublishChart ? 'block' : 'none' }}>收录统计</Tabs.Trigger>
                        <Tabs.Trigger value="initiated-charts" style={{ display: hasInitiatedChart ? 'block' : 'none' }}>穿梭统计</Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
                <div id='access-charts' style={{ display: showAccessChart ? 'block' : 'none' }}></div>
                <div id='publish-charts' style={{ display: showPublishChart ? 'block' : 'none' }}></div>
                <div id='initiated-charts' style={{ display: showInitiatedChart ? 'block' : 'none' }}></div>
            </Flex>
        </Card>
    )
}

function newChart(id, title, note, labels, values, color) {
    return new Chart(id, { // or DOM element
        data: {
            labels: labels,
            datasets: [
                {
                    name: note, chartType: 'line',
                    values: values
                }
            ],
        },

        // title: title,
        type: 'bar', // or 'bar', 'line', 'pie', 'percentage'
        height: 200,
        colors: [color],

        axisOptions: {
            xIsSeries: true,   //default:false
            xAxisMode: "tick",
        },

        lineOptions: {
            hideDots: 0,   //default:0
            regionFill: 1, // default: 0
            heatline: 1, // default: 0
            dotSize: 6, // default: 4
        },

        tooltipOptions: {
            formatTooltipX: d => (d + '').toUpperCase(),
            formatTooltipY: d => d,
        }
    });
}