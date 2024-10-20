import React, { useEffect } from 'react';
import { Chart } from 'frappe-charts';

export default function PlanetShuttleChart({ labels, values }) {
    useEffect(() => {
        const chart = newChart('#initiated-charts', '最近一年星球穿梭助力统计', '次助力', labels, values, '#4299f5');

        return () => {
            chart.destroy(); // 清理图表实例
        };
    }, [labels, values]);

    return <div id='initiated-charts'></div>;
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