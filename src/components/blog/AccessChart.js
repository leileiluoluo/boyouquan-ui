import React, { useEffect } from 'react';
import { Chart } from 'frappe-charts';

export default function AccessChart({ labels, values }) {
    useEffect(() => {
        const chart = newChart('#access-charts', '最近一年文章浏览统计', '次浏览', labels, values, '#fd8754');

        return () => {
            chart.destroy(); // 清理图表实例
        };
    }, [labels, values]);

    return <div id='access-charts'></div>;
};

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