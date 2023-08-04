import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../Gallery/Gallery.css';
 import imageData from '../data/GalleryImage';

export default function WovenImageList() {
  
  return (
    <ImageList className="imageList" sx={{ width: '95%', height: '100%' }} variant="woven" cols={3} gap={1}>
      {imageData.map((item) => (
        <ImageListItem className="imgContent" key={item.ServiceID} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={require(`../../Images/${item.serviceImage}`)} srcSet={`${item.img}?w=100&fit=crop&auto=format&dpr=2 2x`} alt='' />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
