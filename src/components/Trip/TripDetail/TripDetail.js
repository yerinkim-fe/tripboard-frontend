import React, { useState, useEffect, useLayoutEffect } from 'react';
import Error from '../../Error/Error'
import Header from '../../App/Header'
import Modal from '../Modal/Modal';
import { getTripDetail } from '../../../api';
import './TripDetail.scss';

export default function TripDetail(props) {
  const { errorMessage, history, match } = props;
  const [ shareButton, setShareButton ] = useState('share-button');
  const [ tripDetail, setTripDetail ] = useState('');
  const [ isModalShow, setIsModalShow ] = useState(false);
  const [ size, setSize ] = useState([0, 0]);
  const [ slideWidth, setSlideWidth ] = useState('');
  const [ slideTrans, setSlidTrans ] = useState('');
  const [ slideIndex, setSlidIndex ] = useState(0);
  const [ error, setError ] = useState('');

  const getTrip = async () => {
    const res = await getTripDetail(match.params.trip_id);
    setTripDetail(res.data.trip);
  };

  useEffect(() => {
    getTrip();
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
    console.log(tripDetail);
    if (tripDetail) {
      const listWidth = tripDetail.pictures.length * size[0];
      setSlideWidth(listWidth);
    }
  }, [tripDetail]);

  useEffect(() => {
    console.log(tripDetail);
    if (tripDetail) {
      const listWidth = tripDetail.pictures.length * size[0];
      setSlideWidth(listWidth);
    }
  }, [size[0]]);

  useEffect(() => {
    setError(error);
  }, [errorMessage]);

  const handleShowModalClick = index => {
    setIsModalShow(true);
    setSlidIndex(index);
    const trans = `translate3d(-${size[0] * (index)}px, 0px, 0px)`;
    setSlidTrans(trans);
  };

  const handleHideModalClick = () => {
    setIsModalShow(false);
  };

  const handleSlidePrevClick = () => {
    console.log('prev', slideIndex);
    if (slideIndex > 0) {
      const trans = `translate3d(-${size[0] * (slideIndex - 1)}px, 0px, 0px)`;
      setSlidTrans(trans);
      setSlidIndex(slideIndex - 1);
    }
  };

  const handleSlideNextClick = () => {
    console.log('next', slideIndex);

    if (slideIndex < tripDetail.pictures.length - 1) {
      const trans = `translate3d(-${size[0] * (slideIndex + 1)}px, 0px, 0px)`;
      setSlidTrans(trans);
      setSlidIndex(slideIndex + 1);
    }
  };

  const copyToClipboard = () => {
    const dummy = document.createElement('input');
    const url = window.location.href;

    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    setShareButton('share-button-active');
  };

  const restoreShare = () => {
    setShareButton('share-button');
  };



  let pictureList;
  let partOfPicture;

  const LIMIT_PIC = 6;

  if (tripDetail) {
    partOfPicture = tripDetail.pictures.slice(0, LIMIT_PIC).map((picture, index) => {
      if (tripDetail.pictures.length > LIMIT_PIC && index === LIMIT_PIC - 1) {
        return <li key={index} onClick={() => {handleShowModalClick(index)}}><div className='last-picture'>+{tripDetail.pictures.length - LIMIT_PIC}</div><img src={picture.url} /></li>
      } else {
        return <li key={index} onClick={() => {handleShowModalClick(index)}}><img src={picture.url} /></li>
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

      <div>
        <button type='button' className={shareButton} onClick={copyToClipboard} onMouseOut={restoreShare}>share</button>
        {/* {
          copySuccess ?
          <div style={{"color": "green"}}>
            Copied!
          </div> : null
        } */}
      </div>


      {
        tripDetail ? (
          <div className='contents'>
            <div className='item'>
              <h3>여행기간</h3>
              <p>{tripDetail.sdate} - {tripDetail.edate}</p>
            </div>
            <div className='item'>
              <h3>제목</h3>
              <p>{tripDetail.title}</p>
            </div>
            <div className='item'>
              <h3>여행지</h3>
              <p>{tripDetail.address.city}, {tripDetail.address.country}</p>
            </div>
            <div className='item'>
              <ul className='thumbnails'>
                {
                  partOfPicture
                }
              </ul>
            </div>
            <div className='item'>
              <p>{tripDetail.description}</p>
            </div>
          </div>
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
            </div>

            {
              tripDetail.pictures.length > 1 ?
              <div>
                <button type='button' onClick={handleSlidePrevClick}>←</button>
                <button type='button' onClick={handleSlideNextClick}>→</button>
              </div> :
              null
            }

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
