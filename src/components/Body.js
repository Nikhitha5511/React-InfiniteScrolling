// src/components/ImageGallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Body= () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      const accessKey = 'bjlwDda3Em5DKL-F8KhFG_x_Qv4lmmc0kwj6XaJTnbs';
      const perPage = 10;

      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=${perPage}`
        );
        console.log(response);

        setImages((prevImages) => [...prevImages, ...response.data]);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [page]);

  const handleScroll = () => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100;
  
    if (isBottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
    <h1>Image Gallery</h1>
    <div className="image-gallery">
     {images.map((image) => (
        <div key={image.id} className="image-container">
          <div className="image-text">
            <p>Created at: {image.created_at}</p>
            <p>{image.slug}</p>
          </div>
          <img src={image.urls.regular} alt={image.alt_description} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Body;
