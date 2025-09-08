import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import software from "../assets/software.svg"
import coding from "../assets/coding.svg"
import mobile from "../assets/mobile.svg"
import video from "../assets/video.svg"
import web from "../assets/web.svg"
import graphic from "../assets/graphic.svg"
import excel from "../assets/excel.svg"

const services = [
  { name: "Coding and Development", image:coding },
  { name: "Microsoft Excel", image:excel  },
  { name: "Website Design and Development", image:web},
  { name: "App Development", image:mobile  },
  { name: "Video Editing", image:video  },
  { name: "Software Development", image:software},
  { name: "Graphic Design", image:graphic},
];

const ServicesPage = () => {
  return (
    <section className="font-montserrat">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-left lg:px-40 sm:px-8 px-8 py-16"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-800">
          Our Services
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We provide a wide range of professional services to bring your ideas to life.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-40 sm:px-8 px-8 pb-20">
        {services.map((service, index) => (
          <ServiceCard key={index} name={service.name} image={service.image} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesPage;
