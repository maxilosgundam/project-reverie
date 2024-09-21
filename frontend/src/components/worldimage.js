import React from 'react';
import '../index.css';




const WorldImage = () => {
    return (
        <div className="world-image">
          <img src="https://image-placeholder.com/images/actual-size/1280x1024.png" alt="World"
          className="responsive-image" 
            style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }} />
        </div>
      );
    };

export default WorldImage;

