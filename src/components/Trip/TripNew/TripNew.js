import React, { useState, useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import Error from '../../Error/Error';
import Header from '../../App/Header';
import TripMap from '../TripMap/TripMap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uploadFile, createTrip } from '../../../api';
import './TripNew.scss';

export default function TripNew(props) {
  const { user, errorMessage, history } = props;
  const [ error, setError ] = useState('');
  const [ sdate, setSdate ] = useState(new Date());
  const [ edate, setEdate ] = useState(new Date());
  const [ url, setUrl ] = useState([]);
  const [ location, setLocation ] = useState({});
  const [ isMap, setIsMap ] = useState(false);
  const [ createSuccess, setCreateSuccess ] = useState(false);

  useEffect(() => {
    setError(error);
    setTimeout(() => setError(''), 3000);
  }, [errorMessage]);

  useEffect(() => {
    setError(error);
    setTimeout(() => setError(''), 3000);
  }, [error]);

  const [userInput, setUserInput] = useReducer((state, newState) => ({...state, ...newState}), {
    title: '',
    location: '',
    file: [],
    description: ''
  });

  const handleChange = e => {
    const name = e.target.name;
    const newValue = e.target.value;

    if (name === 'file') {
      setUserInput({ [name]: e.target.files });
    } else {
      setUserInput({ [name]: newValue });
    }
  }

  const handleShowMapClick = () => {
    setIsMap(true);
  }

  const handleHideMapClick = () => {
    setIsMap(false);
  }

  const handleChangePlace = location => {
    const { city, country, lat, lng } = location;
    setLocation(location);
    setUserInput({ location: `${city}, ${country}, ${lat}, ${lng}` });
  };

  const handleFilePost = async e => {
    const formData = new FormData();

    if (userInput.file.length > 10) {
      setError('사진은 10개까지 등록가능합니다');
      return false;
    } else {
      for (let i = 0; i < userInput.file.length ; i++) {
        formData.append('photos', userInput.file[i]);
      }

      const res = await uploadFile(formData);

      if (res.status === 200) {
        const photoUrl = [];

        for (let i = 0; i < res.data.photos.length; i++) {
          photoUrl.push({ url: res.data.photos[i] })
        }

        setUrl(photoUrl);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!userInput.title) {
      setError('제목을 입력해주세요.');
      return false;
    }

    if (!userInput.location) {
      setError('여행지를 입력해주세요.');
      return false;
    }

    if (url.length === 0) {
      setError('사진을 등록해주세요.');
      return false;
    }

    const trip = {
      title: userInput.title,
      location: {
        type: 'Point',
        coordinates: [location.lng, location.lat]
      },
      address: {
        country: location.country,
        city: location.city
      },
      sdate: sdate.toISOString(),
      edate: edate.toISOString(),
      pictures: url,
      description: userInput.description
    };

    const res = await createTrip(trip, user.user_id);

    if (res.status === 201) {
      setCreateSuccess(true);
    } else {
      setError(res.data.message);
    }
  }

  const photoList = url.map((file, index) => {
    return (
      <li key={index}>
        {file.url}
      </li>
    );
  });

  if (createSuccess) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <div className='container'>
      <Header
        title='여행지 등록'
        history={history}
      />

      <div className='add-place'>

        <form onSubmit={handleSubmit}>
          <label>
            <span>제목</span>
            <input
              type='text'
              name='title'
              value={userInput.title}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>여행기간</span>
            <DatePicker
              name='sdate'
              selected={sdate}
              onChange={date => setSdate(date)}
              selectsStart
              sdate={sdate}
              edate={edate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormatCalendar={"MMM yyyy"}
            />
            <span className='date-text'>-</span>
            <DatePicker
              name='edate'
              selected={edate}
              onChange={date => setEdate(date)}
              selectsEnd
              edate={edate}
              minDate={sdate}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormatCalendar={"MMM yyyy"}
            />
          </label>
          <label>
            <span>여행지</span>
            <input
              type='text'
              name='location'
              value={userInput.location}
              onChange={handleChange}
              readOnly
            />
            <button type='button' className='button-place-search' onClick={handleShowMapClick}></button>
          </label>
          <label>
            <span>사진 <span className='info-text'>(한번에 최대 10개 파일까지 등록 가능합니다)</span></span>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              multiple
            />
            <button type="button" className='button-upload' onClick={handleFilePost}></button>


          </label>
          {
            photoList.length > 0 ?
            <ul className='file-list'>{photoList}</ul> :
            null
          }
          <label>
            <span>설명</span>
            <textarea
              name='description'
              value={userInput.description}
              onChange={handleChange}
            />
          </label>

          <input type='submit' value='등록' />
        </form>
      </div>

      {
        isMap &&
        <TripMap
          onChangePlace={handleChangePlace}
          onHideMapClick={handleHideMapClick}
        />
      }

      {
        error &&
        <Error
          message={error}
        />
      }

    </div>
  );
}
