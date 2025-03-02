import { useEffect, useState } from "react";
import { MapComponent } from "../components/Map";
import WorkshopsMD from "../content/workshops.md";

const SocialEvents = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: "url('/imgs/workshop_crop_01.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 0px",
        }}
        className="relative flex items-center justify-center h-64 bg-gray-100 bg-no-repeat bg-cover bg-center"
      ></section>
      <div className="container mx-auto p-6">
        <section className="mx-auto mt-8 prose-base max-w-none">
          <WorkshopsMD />
        </section>
        <div
          style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}
          className="-mb-6"
        >
          <MapComponent
            width={"100vw"}
            height={400}
            initialViewState={{
              longitude: 147.31853,
              latitude: -42.8965,
              zoom: 13.25,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SocialEvents;
