import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

function NoShowChart() {
    useEffect(() => {

    });

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    
    const data = {
        labels,
        datasets: [
            {
                label: '노쇼 비율',
                data: [1, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: '예약',
                data: [1, 2, 3],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: '노쇼',
                data: [1, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
      };

    return (
        <div>
            <a className='contents-box-title-text'>노쇼 통계</a>
            <Bar data={data} />
        </div>
    );
}

export default NoShowChart;