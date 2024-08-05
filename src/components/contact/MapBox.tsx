import React from "react";
import { mapAddress } from "../../config/ContactData";
import "./MapBox.css";

const MapBox = () => {
  return (
    <section className="mapbox" data-mapbox="true" data-testid="mapbox-section">
      <figure>
        <iframe
          title="map address"
          src={mapAddress}
          width="400"
          height="300"
          loading="lazy"
        ></iframe>
      </figure>
    </section>
  );
}

export default MapBox;
