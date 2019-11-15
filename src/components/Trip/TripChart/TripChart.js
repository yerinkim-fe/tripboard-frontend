import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import Header from '../../App/Header';
import './TripChart.scss';

export default function TripChart(props) {
  const { history, trip, user, onTripLoad } = props;
  const [ dataLine, setDataLine ] = useState();
  const [ dataPie, setDataPie ] = useState();
  const [ dataBar, setDataBar ] = useState();

  useEffect(() => {
    if (user) {
      onTripLoad(user.user_id);
    }
  }, [user]);

  useEffect(() => {
    if (trip.length) {
      const year = {}
      const month = {}
      const place = {}

      for (let i = 0; i < 12; i++) {
        month[i] = 0;
      }

      trip.forEach(item => {
        const sdate = new Date(item.sdate);
        const edate = new Date(item.edate);
        let count = sdate;

        while (count <= edate) {
          if (!year[count.getFullYear()]) year[count.getFullYear()] = 0;

          month[count.getMonth()]++;
          year[count.getFullYear()]++;
          count.setDate(count.getDate() + 1);
        }

        if (item.address.country === '대한민국') {
          if (!place[item.address.city]) place[item.address.city] = 0;
          place[item.address.city]++;
        } else {
          if (!place[item.address.country]) place[item.address.country] = 0;
          place[item.address.country]++;
        }
      });

      const mm = Object.keys(month).map(mm => `${Number(mm) + 1}월`);
      const barData = {
        labels: mm,
        datasets: [
          {
            label: '월별 여행일수',
            backgroundColor: '#54D3C2',
            borderColor: '#54D3C2',
            borderWidth: 1,
            hoverBackgroundColor: '#54D3C2',
            hoverBorderColor: '#54D3C2',
            data: Object.values(month)
          }
        ]
      };
      setDataBar(barData);


      const PieData = {
        labels: Object.keys(place),
        datasets: [{
          data: Object.values(place),
          backgroundColor: [
            '#47ACB1',
            '#F36422',
            '#542823',
            '#286B4F',
            '#676766',
            '#C9212A',
            '#95247A',
            '#ADD5D6',
            '#F9AA7B',
            '#232F49',
            '#FFCD34',
            '#6CE3D5',
          ],
          hoverBackgroundColor: [
            '#47ACB1',
            '#F36422',
            '#542823',
            '#286B4F',
            '#676766',
            '#C9212A',
            '#95247A',
            '#ADD5D6',
            '#F9AA7B',
            '#232F49',
            '#FFCD34',
            '#6CE3D5',
          ]
        }],
      };
      setDataPie(PieData);

      const lineData = {
        labels: Object.keys(year),
        datasets: [
          {
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#5799DA',
            borderColor: '#5799DA',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#5799DA',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#5799DA',
            pointHoverBorderColor: '#5799DA',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(year),
          }
        ]
      };
      setDataLine(lineData);
    }
  }, [trip]);

  return (
    <div className='container'>
      <Header
        title='Chart'
        history={history}
      />

      {
        trip.length > 0 ?

        <div className='chart'>

          {
            dataLine &&
            <div className='item'>
              <h3>연도별 여행일수</h3>
              <Line
                data={dataLine}
                options={{
                  legend: {
                    display: false
                  }
                }}
              />
            </div>
          }

          {
            dataBar &&
            <div className='item'>
              <h3>월별 여행일수</h3>
              <Bar
                data={dataBar}
                options={{
                  legend: {
                    display: false
                  },
                }}
              />
            </div>
          }

          {
            dataPie &&
            <div className='item'>
              <h3>여행지별 방문횟수</h3>
              <Pie
                data={dataPie}
                width={80}
                height={80}
                options={{
                  legend: {
                    display: true,
                    position: 'bottom',
                    align: "start"
                  }
                }}
              />
            </div>
          }
        </div> :
        <p className='nodata'>데이터가 없습니다.</p>
      }
    </div>
  )
}
