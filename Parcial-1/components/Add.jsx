import { useState } from 'react';


const Add = () => {
  const [id, setId] = useState(1);
  const [images, setImages] = useState([]);

  const fetchImages = () => {
    const imageUrl = `https://picsum.photos/200/300?random=${id}`;
    setImages((prevImages) => [...prevImages, imageUrl]);
  };

  const nextImage = () => {
    setId((prevId) => prevId + 1);
    fetchImages();
  };

 
  

  return (
    <div>
      <button onClick={nextImage}>Add</button>
      <hr/>
      <div>
        <input 
          type="text" 
          placeholder="Search by ID" 
        />
        <button >Search</button>
      </div>
      {images.map((image, index) => (
        <div key={index}>
          <h3>Imagen {index+1}</h3>
          <img src={image} alt={`Random ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Add;
