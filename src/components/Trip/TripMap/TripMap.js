import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import Error from '../../Error/Error';
import './TripMap.scss';
import marker from '../../../images/marker.png';

Geocode.setApiKey(process.env.NETLIFY_GOOGLEMAP_APIKEY);
Geocode.setLanguage('ko');
Geocode.enableDebug();

export default function TripMap(props) {
  let lat = 37.566682;
  let lng = 126.978382;

  const center = { lat, lng };
  const zoom = 10;

  const [ error, setError ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ city, setCity ] = useState('');
  const [ country, setCountry ] = useState('');
  const [ mapPosition, setMapPosition ] = useState({
    lat: center.lat,
    lng: center.lng
  });
  const [ markerPosition, setMarkerPosition ] = useState({
    lat: center.lat,
    lng: center.lng
  });

  useEffect(() => {
    Geocode.fromLatLng( mapPosition.lat , mapPosition.lng ).then(
      response => {
        const address = response.results[0].formatted_address
        const addressArray =  response.results[0].address_components;
        const city = getCity(addressArray);
        const country = getCountry(addressArray);

        (address) ? setAddress(address) : setAddress('');
        (city) ? setCity(city) : setCity('');
        (country) ? setCountry(country) : setCountry('');
      },
      error => {
       console.error(error);
      }
     );
  }, []);

  const getCountry = addressArray => {
    let country = '';

    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
        country = addressArray[i].long_name;
        return country;
      }
    }
  };

  const getCity = addressArray => {
    let city = '';

    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && ('locality' === addressArray[i].types[0] || 'administrative_area_level_1' === addressArray[i].types[0])) {
          city = addressArray[i].long_name;
          return city;
        }
      }
    }
  };

  const onMarkerDragEnd = e => {
    let newLat = e.latLng.lat();
    let newLng = e.latLng.lng();

    Geocode.fromLatLng( newLat , newLng ).then(
      response => {
        const address = response.results[0].formatted_address;
        const addressArray =  response.results[0].address_components;
        const city = getCity(addressArray);
        const country = getCountry(addressArray);

        (address) ? setAddress(address) : setAddress('');
        (city) ? setCity(city) : setCity('');
        (country) ? setCountry(country) : setCountry('');

        setMarkerPosition({
          lat: newLat,
          lng: newLng
        });

        setMapPosition({
          lat: newLat,
          lng: newLng
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  const onPlaceSelected = place => {
    if (place.formatted_address) {
      const address = place.formatted_address;
      const addressArray =  place.address_components;
      const city = getCity(addressArray);
      const country = getCountry(addressArray);

      const latValue = place.geometry.location.lat();
      const lngValue = place.geometry.location.lng();

      (address) ? setAddress(address) : setAddress('');
      (city) ? setCity(city) : setCity('');
      (country) ? setCountry(country) : setCountry('');

      setMarkerPosition({
        lat: latValue,
        lng: lngValue
      });

      setMapPosition({
        lat: latValue,
        lng: lngValue
      });
    } else {
      setError('검색결과에서 선택하거나 마커를 이동하여 선택해주세요.');
    }
  };

  const onSavePlaceClick = () => {
    props.onChangePlace({ country, city, lat: markerPosition.lat, lng: markerPosition.lng });
    props.onHideMapClick();
  };

  const AsyncMap = withGoogleMap(props => (
    <GoogleMap
      defaultZoom={zoom}
      defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
    >
      <Marker
        draggable={true}
        onDragEnd={ onMarkerDragEnd }
        position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
        icon={marker}
      />
    </GoogleMap>
  ));

  let map;

  if (center.lat !== undefined) {
    map = <div className='trip-map'>
      <AsyncMap
        containerElement={<div style={{ height: '100vh' }} />}
        mapElement={<div style={{ height: `100vh` }} />}
      />
    </div>
  } else {
    map = <div style={{ height: '100vh' }} />
  }

  return (
    <div className='wrap-map'>
      {map}

      <Autocomplete
        className='auto-complete'
        onPlaceSelected={ onPlaceSelected }
        types={['(regions)']}
        placeholder={address}
      />

      <button type='button' className='button-close' onClick={props.onHideMapClick}></button>

      <button type='button' className='button-map-save' onClick={onSavePlaceClick}>선택완료</button>

      {
        error &&
        <Error
          message={error}
        />
      }
    </div>

  );
}
