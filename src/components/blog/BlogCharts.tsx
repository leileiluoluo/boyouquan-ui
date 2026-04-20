import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Chart } from 'frappe-charts';
import RequestUtil from '../../utils/APIRequestUtil';
import { theme, Card, Flex, Segmented, Typography } from 'antd';

const { Title } = Typography;
const { useToken } = theme;

export default function BlogCharts({ domain }) {
    const [activeTab, setActiveTab] = useState('access-charts');
    const [hasPublishChart, setHasPublishChart] = useState(false);
    const [hasInitiatedChart, setHasInitiatedChart] = useState(false);
    const chartsRef = useRef({
        accessChart: null,
        publishChart: null,
        initiatedChart: null
    });

    const { token } = useToken();

    // 销毁所有图表
    const destroyAllCharts = () => {
        Object.values(chartsRef.current).forEach(chart => {
            if (chart) chart.destroy();
        });
    };

    const fetchData = async (domain) => {
        destroyAllCharts(); // 先销毁旧图表

        const resp = await RequestUtil.get(`/api/blogs/charts?domainName=${domain}`);
        const respBody = await resp.json();

        // 浏览图表 ✅ 参数顺序正确
        chartsRef.current.accessChart = newChart(
            '#access-charts',
            '最近一年文章浏览统计',
            '次浏览',
            respBody.yearlyAccessDataLabels,
            respBody.yearlyAccessDataValues,
            token.colorPrimary
        );

        // 收录图表 ✅ 修复参数顺序！！！
        if (respBody.showLatestPublishedAtChart) {
            setHasPublishChart(true);
            chartsRef.current.publishChart = newChart(
                '#publish-charts',
                '最近一年文章收录统计',
                '篇文章',
                respBody.yearlyPublishDataLabels, // 修复：标签在前
                respBody.yearlyPublishDataValues, // 修复：数值在后
                token.colorPrimary
            );
        } else {
            setHasPublishChart(false);
        }

        // 穿梭图表
        if (respBody.showLatestInitiatedChart) {
            setHasInitiatedChart(true);
            chartsRef.current.initiatedChart = newChart(
                '#initiated-charts',
                '最近一年星球穿梭助力统计',
                '次穿梭',
                respBody.yearlyInitiatedDataLabels,
                respBody.yearlyInitiatedDataValues,
                token.colorPrimary
            );
        } else {
            setHasInitiatedChart(false);
        }
    };

    // 切换 tab
    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    useEffect(() => {
        if (domain) fetchData(domain);
        return () => destroyAllCharts();
    }, [domain]);

    // 分段选项
    const segmentOptions = [
        { value: 'access-charts', label: '浏览统计' },
        ...(hasPublishChart ? [{ value: 'publish-charts', label: '收录统计' }] : []),
        ...(hasInitiatedChart ? [{ value: 'initiated-charts', label: '穿梭统计' }] : []),
    ];

    return (
        <Card hoverable>
            <Flex vertical gap={4}>
                <Title level={5} style={{ marginTop: 0 }}>数据统计</Title>

                <Segmented
                    value={activeTab}
                    onChange={handleTabChange}
                    options={segmentOptions}
                    style={{
                        marginBottom: 8,
                        width: 'fit-content',
                        backgroundColor: '#e7eef8',
                        borderRadius: '8px',
                        padding: '2px',
                        fontSize: 13,
                    }}
                    thumbStyle={{
                        backgroundColor: token.colorPrimary,
                        borderRadius: '6px',
                    }}
                    labelStyle={{
                        color: '#130101',
                        padding: '4px 12px',
                    }}
                />

                {/* 图表容器，切换正常显示 */}
                <div id='access-charts' style={{ height: 200, display: activeTab === 'access-charts' ? 'block' : 'none' }}></div>
                <div id='publish-charts' style={{ height: 200, display: activeTab === 'publish-charts' ? 'block' : 'none' }}></div>
                <div id='initiated-charts' style={{ height: 200, display: activeTab === 'initiated-charts' ? 'block' : 'none' }}></div>
            </Flex>
        </Card>
    );
}

// 图表构造函数（参数顺序：id, title, note, labels, values, color）
function newChart(id, title, note, labels, values, color) {
    // 强制修复：确保数据干净、长度一致
    const safeLabels = Array.isArray(labels) ? labels.filter(item => item != null) : [];
    const safeValues = Array.isArray(values) ? values.filter(v => v != null) : [];

    // 核心：强制长度一致
    const maxLen = Math.max(safeLabels.length, safeValues.length);
    const finalLabels = [];
    const finalValues = [];

    for (let i = 0; i < maxLen; i++) {
        finalLabels.push(safeLabels[i] ?? '');
        finalValues.push(safeValues[i] ?? 0);
    }

    return new Chart(id, {
        data: {
            labels: finalLabels,
            datasets: [{
                name: note,
                chartType: 'line', // 折线
                values: finalValues
            }],
        },
        title: title,
        type: 'line',        // 必须 line
        height: 200,
        colors: [color],
        isNavigable: false,

        // 关键：强制显示连线！！！
        lineOptions: {
            hideDots: 0,
            dotSize: 5,
            heatline: 0,        // 关掉这个！它会导致连线异常
            regionFill: 0,      // 关掉背景填充
            spline: 1,          // 平滑曲线
            showLine: 1         // 强制显示连线（Frappe Charts 隐藏参数）
        },

        axisOptions: {
            xIsSeries: 1,
            xAxisMode: 'tick',
        },

        tooltipOptions: {
            formatTooltipX: d => (d + '').toUpperCase(),
            formatTooltipY: d => d,
        },
    });
}