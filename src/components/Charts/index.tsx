import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Bar, Line } from 'react-chartjs-2';

  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Total Sales',
        color: 'white',
        font: {
          size: 10,
          family: 'Nunito'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        beginAtZero: true
      }
    } 
  };

  const optionBar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Total Sales',
        color: 'white',
        font: {
          size: 10,
          family: 'Nunito'
        }
      }
    }
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const barLabels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', ''];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: [50, 70, 100, 15, 12, 3, 30, 15, 23, 10, 11, 40],
        borderColor: '#A9DFD8',
        backgroundColor: '#A9DFD8',
      },
    ],
  };

  const barData = {
    labels: barLabels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: [10,20,40,12,15,22,15, 0],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: '#F80595',
      },
    ],
  };

const ChartComponent = ({type}) => {
  return (
    <>
      {
        type === 'line' && <Line 
          options={options} 
          data={data} 
          />
      }

{
        type === 'bar-chart' && <Bar options={optionBar} data={barData} />
      }
    </>
    
  )
}

export default ChartComponent 