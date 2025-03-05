import { useState } from 'react';

const Add = () => {
  const [id, setId] = useState(1);
  const [images, setImages] = useState([]);
  const [searchIndex, setSearchIndex] = useState('');
  const [searchedImage, setSearchedImage] = useState(null);

  const fetchImages = () => {
    const imageUrl = `https://picsum.photos/200/300?random=${id}`;
    setImages((prevImages) => [...prevImages, imageUrl]);
  };

  const nextImage = () => {
    setId((prevId) => prevId + 1);
    fetchImages();
  };

  const searchImage = () => {
    const index = parseInt(searchIndex, 10) - 1;
    if (index >= 0 && index < images.length) {
      setSearchedImage(images[index]);
    } else {
      setSearchedImage(null);
    }
  };

  return (
    <div>
      <button onClick={nextImage}>Add</button>
      <hr />
      <div>
        <input 
          type="text" 
          placeholder="Buscar por imgen" 
          value={searchIndex} 
          onChange={(e) => setSearchIndex(e.target.value)} 
        />
        <button onClick={searchImage}>Search</button>
      </div>

      {searchedImage && (
        <div>
          <h3>Imagen buscada:</h3>
          <img src={searchedImage} alt="Searched" />
        </div>
      )}

      {images.map((image, index) => (
        <div key={index}>
          <h3>Imagen {index + 1}</h3>
          <img src={image} alt={`Random ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Add;
