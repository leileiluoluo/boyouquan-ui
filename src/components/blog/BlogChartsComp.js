import { useEffect } from 'react';
import { Chart } from 'frappe-charts';

export default function BlogChartsComp({ domain }) {
    const fetchData = async (domain) => {
        try {
            const response = await fetch(`https://www.boyouquan.com/api/blogs/charts?domainName=${domain}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(async () => {
        const item = await fetchData(domain);

        const accessChart = newChart('#access-charts', '最近一年文章浏览统计', '次浏览', item.yearlyAccessDataLabels, item.yearlyAccessDataValues, '#fd8754');

        let publishChart = null;
        if (item.showLatestPublishedAtChart) {
            publishChart = newChart('#publish-charts', '最近一年文章收录统计', '篇文章', item.yearlyPublishDataLabels, item.yearlyPublishDataValues, '#cc6cf6');
        }

        let initiatedChart = null;
        if (item.showLatestInitiatedChart) {
            initiatedChart = newChart('#initiated-charts', '最近一年星球穿梭助力统计', '次助力', item.yearlyInitiatedDataLabels, item.yearlyInitiatedDataValues, '#4299f5');
        }

        return () => {
            accessChart.destroy();
            if (null != publishChart) {
                publishChart.destroy();
            }
            if (null != initiatedChart) {
                initiatedChart.destroy();
            }
        };
    }, [domain]);

    return (
        <div className="blog-detail-charts">
            <div className="charts-title">
                <h4>数据统计</h4>
            </div>
            <div id='access-charts'></div>
            <div id='publish-charts'></div>
            <div id='initiated-charts'></div>
        </div>
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

        title: title,
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