import Testimonial from "../components/Testimonial";

const TestimonialPage = () => {
  return (
    <div className="bg-white lg:px-40 px-8 md:px-20 md:py-30 py-10 font-montserrat">
      {/* Header */}
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900 mb-15 ">
        Testimonial
      </h1>

      {/* Testimonial Component */}
      <Testimonial />
    </div>
  );
};

export default TestimonialPage;
