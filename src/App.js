import React, { useState, useEffect } from "react"
import './App.css'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  const fetchPhotos = async(pageNumber) =>{
    const AccessKey = '5chf1NaB5VKEB_qPBJiaqO3MIz6M-AeMpWh9bhofjL4'
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=${AccessKey}&page=${pageNumber}&per_page=10`)
    const data = await res.json();
    console.log(data)
    setPhotos(p => [...p, ...data])
  }

  useEffect(() => {
   fetchPhotos(pageNumber)
  }, [pageNumber])

  const loadMore = () =>{
    setPageNumber(pageNumber + 1)
  }
  window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight) {
      loadMore();
    }
  })

  return (
    <div className="App">
      <h1>Infinite Scrolling</h1>
      {
        photos.map((photo , i) => (
          <div className="photos" key={i}> 
            <img src={photo.urls.small} alt="pictures" />
            <p> Bio:{photo.user.bio}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;
