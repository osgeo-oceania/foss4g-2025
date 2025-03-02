
export const MailingList = () => {
  return (
    <>
      <div className=" bg-blue-950">
      <section
        style={{
          backgroundImage: "url('/imgs/sunset.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
        className="relative flex items-center justify-center h-64 bg-gray-100 bg-no-repeat bg-cover bg-center"
      ></section>
      </div>
      <div className="p-6">
        <iframe
          title="mailjet-form"
          data-w-type="embedded"
          src="https://064rp.mjt.lu/wgt/064rp/xlvi/form?c=7f052458"
          style={{ height: "700px", width: "100%", border: "0" }}
        ></iframe>

        <script
          type="text/javascript"
          src="https://app.mailjet.com/pas-nc-embedded-v1.js"
        ></script>
      </div>
    </>
  );
};
