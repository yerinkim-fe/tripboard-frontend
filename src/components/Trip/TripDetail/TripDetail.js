import React, { useState, useEffect, useLayoutEffect } from 'react';
import Error from '../../Error/Error';
import Header from '../../App/Header';
import Modal from '../Modal/Modal';
import getDateFormat from '../../../utils/getDateFormat';
import './TripDetail.scss';

export default function TripDetail(props) {
  const { errorMessage, history, match, onTripDetailLoad, tripDetail } = props;
  const [ isModalShow, setIsModalShow ] = useState(false);
  const [ size, setSize ] = useState([0, 0]);
  const [ slideWidth, setSlideWidth ] = useState('');
  const [ slideTrans, setSlidTrans ] = useState('');
  const [ slideIndex, setSlidIndex ] = useState(0);
  const [ slideLeft, setSlideLeft ] = useState(false);
  const [ slideRight, setSlideRight ] = useState(false);
  const [ error, setError ] = useState('');

  useEffect(() => {
    onTripDetailLoad(match.params.trip_id);
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([ window.innerWidth, window.innerHeight ]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    const trans = `translate3d(-${size[0] * (slideIndex)}px, 0px, 0px)`;
    setSlidTrans(trans);

    return () => window.removeEventListener('resize', updateSize);
  }, [size[0]]);

  useEffect(() => {
    if (tripDetail) {
      const listWidth = tripDetail.pictures.length * size[0];
      setSlideWidth(listWidth);
    }
  }, [tripDetail]);

  useEffect(() => {
    if (tripDetail) {
      const listWidth = tripDetail.pictures.length * size[0];
      setSlideWidth(listWidth);
    }
  }, [size[0]]);

  useEffect(() => {
    setError(errorMessage);
    setTimeout(() => setError(''), 3000);
  }, [errorMessage]);

  useEffect(() => {
    setError(error);
    setTimeout(() => setError(''), 3000);
  }, [error]);

  const checkSlideIndex = slideIndex => {
    if (tripDetail.pictures.length > 1) {
      setSlideRight(true);
      setSlideLeft(true);

      if (slideIndex === 0) {
        setSlideLeft(false);
      } else if (slideIndex === tripDetail.pictures.length - 1) {
        setSlideRight(false);
      }
    } else {
      setSlideLeft(false);
      setSlideRight(false);
    }
  }

  const handleShowModalClick = slideIndex => {
    checkSlideIndex(slideIndex);

    setIsModalShow(true);
    setSlidIndex(slideIndex);
    const trans = `translate3d(-${size[0] * (slideIndex)}px, 0px, 0px)`;
    setSlidTrans(trans);
  };

  const handleHideModalClick = () => {
    setIsModalShow(false);
  };

  const handleSlidePrevClick = () => {
    if (slideIndex > 0) {
      const trans = `translate3d(-${size[0] * (slideIndex - 1)}px, 0px, 0px)`;
      setSlidTrans(trans);
      setSlidIndex(slideIndex - 1);
    }

    checkSlideIndex(slideIndex - 1);
  };

  const handleSlideNextClick = () => {
    if (slideIndex < tripDetail.pictures.length - 1) {
      const trans = `translate3d(-${size[0] * (slideIndex + 1)}px, 0px, 0px)`;
      setSlidTrans(trans);
      setSlidIndex(slideIndex + 1);
      setSlideRight(true);
    }

    checkSlideIndex(slideIndex + 1);
  };

  const copyToClipboard = () => {
    const dummy = document.createElement('input');
    const url = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    setError('Copied!');
  };

  let pictureList;
  let partOfPicture;

  const LIMIT_PIC = 3;

  if (tripDetail) {
    partOfPicture = tripDetail.pictures.slice(0, LIMIT_PIC).map((picture, index) => {
      if (tripDetail.pictures.length > LIMIT_PIC && index === LIMIT_PIC - 1) {
        return <li key={index} onClick={() => {handleShowModalClick(index)}} style={{ backgroundImage: `url(${picture.url})` }}><div className='last-picture'>+{tripDetail.pictures.length - LIMIT_PIC}</div></li>
      } else {
        return <li key={index} onClick={() => {handleShowModalClick(index)}} style={{ backgroundImage: `url(${picture.url})` }}></li>
      }
    });

    pictureList = tripDetail.pictures.map((picture, index) => (
      <li key={index} style={{ width: size[0] }}><img src={picture.url} /></li>
    ));
  }

  return (
    <div className='container'>
      <Header
        title='상세보기'
        history={history}
      />

      <button type='button' className='button-share' onClick={copyToClipboard}></button>

      {
        tripDetail ? (
          <>
            <div className='detail-img' style={{ backgroundImage: `url(${tripDetail.pictures[0].url})` }}></div>

            <div className='trip-detail'>
              <div className='item'>
                <h3>여행기간</h3>
                <p>{getDateFormat(tripDetail.sdate)} - {getDateFormat(tripDetail.edate)}</p>
              </div>
              <div className='item'>
                <h3>제목</h3>
                <p>{tripDetail.title}</p>
              </div>
              <div className='item'>
                <h3>여행지</h3>
                <p>
                  {tripDetail.address.country && tripDetail.address.country}
                  {tripDetail.address.city && ` ${tripDetail.address.city}`}
                </p>
              </div>
              {
                tripDetail.description &&
                <div className='item'>
                  <h3>설명</h3>
                  <p>{tripDetail.description}</p>
                </div>
              }

              <div className='item'>
                <ul className='thumbnails'>
                  {
                    partOfPicture
                  }
                </ul>
              </div>
            </div>
          </>
        ) :
        null
      }

      {
        isModalShow &&
        <Modal onHideModalClick={handleHideModalClick}>
          <div className='wrap'>
            <div className='slide-box'>
              <ul className='picture-list' style={{ width: slideWidth, transform: slideTrans }}>
                {
                  pictureList
                }
              </ul>

              {
                slideLeft && <button type='button' className='button-left' onClick={handleSlidePrevClick}></button>
              }

              {
                slideRight && <button type='button' className='button-right' onClick={handleSlideNextClick}></button>
              }
            </div>
          </div>
        </Modal>
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
