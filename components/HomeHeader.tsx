export const HomeHeader = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/imgs/2025/auckland.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        marginLeft: "calc((-100vw + 100%) / 2)",
      }}
      className="relative -mt-4 w-screen mb-8"
    >
      <div className="bg-primary-base opacity-20 absolute w-full h-full"></div>
      <div className="container mx-auto px-4 flex justify-between items-center md:py-16 z-10 relative">
        <div className="flex flex-col px-4">
          <img
            src="/imgs/2025/foss4g_2025_logo_interim.png"
            alt="FOSS4G SotM Oceania 2024"
            className="md:m-0 w-auto h-36 md:h-64 lg:h-96 object-contain object-left"
          />
        </div>
        <div
          className="hidden md:block text-center md:text-right lg:pr-12 lg:text-2xl xl:text-2xl font-display font-['Roboto Serif'] text-slate-50"
          style={{ lineHeight: "6rem" }}
        >
          Join us for{" "}
          <span className="text-2xl lg:text-4xl text-secondary-400 font-medium">
            FOSS4G SotM
          </span>{" "}
          in{" "}
          <span className="text-2xl lg:text-3xl block">
            <i>Tāmaki Makaurau</i>{" "}
            <span className="text-secondary-400 font-medium">Auckland</span>
          </span>
          <span className="text-2xl lg:text-3xl block">
            <i>Aotearoa</i>{" "}
            <span className="text-secondary-400 font-medium">New Zealand</span>
          </span>
          from{" "}
          <span className="text-2xl lg:text-4xl text-secondary-400 font-medium">
            17 – 23 November 2025
          </span>
        </div>
        <div className="md:hidden text-center font-display text-2xl font-medium text-slate-50">
          17 – 23 November 2025
        </div>
      </div>
    </div>
  );
};
