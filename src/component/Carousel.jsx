import React from "react";
import "../css/Carousel.css";
import heroDog from "../images/hero-dog.jpg";
import dogs from "../images/dogs.jpg";
import pupies1 from "../images/pupies1.jpg";

const CarouselComponent = () => {
  return (
    <div
        id="dogCarousel"
        className="carousel slide carousel-dark"
        data-bs-ride="carousel"
        data-bs-interval="5000"
        style={{ maxWidth: "900px", margin: "50px auto", zIndex: 2, position: "relative" }}
        >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#dogCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#dogCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#dogCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src= {heroDog} 
            className="d-block w-100"
            alt="Happy Puppy"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <div className="carousel-caption">
            <h5>Find Your Perfect Companion</h5>
            <p>Adopt a loving puppy and give them a forever home.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={dogs}
            className="d-block w-100"
            alt="Friendly Dogs"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <div className="carousel-caption">
            <h5>Variety of Breeds</h5>
            <p>Choose from Golden Retrievers, Labradors, Huskies and more.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={pupies1}
            className="d-block w-100"
            alt="Cute Puppies"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <div className="carousel-caption">
            <h5>Healthy & Happy Puppies</h5>
            <p>All our puppies are vaccinated and well cared for.</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#dogCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#dogCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
