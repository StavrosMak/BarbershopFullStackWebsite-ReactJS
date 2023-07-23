import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../Gallery/Gallery.css';
import useFetchData from '../../CustomHooks/useFetchData';

export default function WovenImageList() {
  const [itemData, setItemData] = useState([]);
  const {data:cardsData} = useFetchData('cards');

  
  useEffect(() => {
    setItemData(cardsData);
  }, [cardsData]);

  return (
    <ImageList className="imageList" sx={{ width: '100%', height: '100%' }} variant="woven" cols={3} gap={1}>
      {itemData.map((item) => (
        <ImageListItem className="imgContent" key={item.ServiceID} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={require(`../../Images/${item.serviceImage}`)} srcSet={`${item.img}?w=100&fit=crop&auto=format&dpr=2 2x`} alt={item.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
