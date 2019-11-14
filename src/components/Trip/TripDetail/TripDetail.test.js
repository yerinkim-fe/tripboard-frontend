import React from 'react';
import { shallow } from 'enzyme';
import TripDetail from './TripDetail';

describe('<TripDetail />', () => {
  const tripDetail = {
    title: "제주도 먹방여행",
    address: {
      city: "제주시",
      country: "대한민국"
    },
    created_by: "5db9b960e5565e30b96ca966",
    description: "",
    sdate: "2019-03-20T15:00:00.000Z",
    edate: "2019-03-31T15:00:00.000Z",
    location: {
      coordinates: [126.53118840000002, 33.4996213],
      type: "Point"
    },
    pictures: [{
      id: "5dcbcc2c64b59a83dd96546a",
      url: "https://trip-board.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2019-11-13-17-24-38-1.jpeg"
    }]
  };

  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<TripDetail
      tripDetail={tripDetail}
    />);
  });

  it('renders trip details', () => {
    expect(wrapper.contains(<p>2019.03.21 - 2019.04.01</p>)).toBe(true);
    expect(wrapper.contains(<p>제주도 먹방여행</p>)).toBe(true);
    expect(wrapper.contains(<p>대한민국 제주시</p>)).toBe(true);
  });
});
