import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import Header from '../../App/Header';
import './TripChart.scss';


export default function TripChart(props) {
  const { history, trip, user, onTripLoad } = props;
  const [ dataLine, setDataLine ] = useState();
  const [ dataDoughnut, setDataDoughnut ] = useState();
  const [ dataBar, setDataBar ] = useState();


// address: {country: "조선민주주의인민공화국", city: "평양"}
// created_by: "5db9b960e5565e30b96ca966"
// description: ""
// edate: "2019-11-06T07:59:19.334Z"
// location: {coordinates: Array(2), type: "Point"}
// pictures: [{…}]
// sdate: "2019-11-06T07:59:19.334Z"
// title: "평양"
// __v: 0
// _id: "5dc27dadb8e5c5644201297a"
  useEffect(() => {
    if (!trip.length && user) {
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


      console.log('month', month);
      console.log('year', year);
      console.log('place', place);

      const yearData = {
        labels: Object.keys(year),
        datasets: [
          {
            label: '연도별 여행일수',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: Object.values(year)
          }
        ]
      };
      setDataBar(yearData);

      const monthData = {
        labels: Object.keys(month),
        datasets: [{
          data: Object.values(month),
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ]
        }],
      };
      setDataDoughnut(monthData);

      const placeData = {
        labels: Object.keys(place),
        datasets: [
          {
            label: '여행지별 방문횟수',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(place),
          }
        ]
      };
      setDataLine(placeData);
    }
  }, [trip]);

  console.log(trip);


  return (
    <div className='container'>
      <Header
        title='chart'
        history={history}
      />

      {
        dataBar &&

        <div>
          <Bar
            data={dataBar}
            // width={100}
            // height={50}
            // options={{
            //   maintainAspectRatio: false
            // }}
          />


          <Doughnut
            data={dataDoughnut}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />


          <Line
            data={dataLine}
            // options={{
            //   title: {
            //     display: true,
            //     text:'Average per month',
            //     fontSize:20
            //   },
            //   legend: {
            //     display: true,
            //     position:'right'
            //   },
            //   tooltip: true,
            //   responsive: true,
            //   // maintainAspectRatio: false
            // }}
          />
        </div>
      }
    </div>
  )
}
