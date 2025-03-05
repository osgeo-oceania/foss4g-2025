import React from "react";

const NoPage = () => {
  return (
    <section>
      <div className="container px-6 py-16 mx-auto text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-[#343D33] md:text-4xl">
            Seems you've lost your way!
          </h1>

          <p className="mt-6 text-[#343D33]">
            We haven't created a page for this URL, please check out our other
            pages from the menu or contact us.
          </p>

          <div className="flex justify-center mt-6">
            <a
              href="mailto:chair@foss4g.org"
              className="px-4 py-2 text-slate-50 transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Send Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NoPage;
