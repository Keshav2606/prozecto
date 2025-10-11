import { motion } from "framer-motion";
import companyImg from "../assets/company.jpeg";
import company2Img from "../assets/company2.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white font-montserrat">
      {/* Hero Section with Overlayed Text */}
      <div className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
        <img
          src={companyImg}
          alt="Company"
          className="w-full h-full object-cover brightness-50"
        />
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="absolute text-5xl md:text-9xl font-bold text-white text-center"
        >
          About{" "}
          <span className="text-blue-500 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">
            Prozecto
          </span>
        </motion.h1>
        <motion.section
        custom={0.1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute max-w-4xl mx-auto py-16 px-[6vw] -bottom-[5%] sm:bottom-[10%]"
      >
        <p className="text-sm md:text-xl leading-relaxed text-center text-white dark:text-gray-300">
          Welcome to Prozecto
          , where innovation meets precision. We craft scalable, future-ready
          digital solutions — from software and websites to creative design and
          automation — helping businesses thrive in today’s digital era.
        </p>
      </motion.section>
      </div>

      {/* Intro Section */}
      

      {/* Mission */}
      <motion.section
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="sm:flex gap-20 items-center mt-20 sm:mt-20 mb-20 px-[6vw]"
      >
        <h2 className="text-3xl sm:w-[50%] md:text-7xl mb-20 sm:mb-0 font-semibold border-l-4 border-blue-600 pl-4">
          Our Mission
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
          Our mission is to deliver high-quality, custom-built digital solutions
          that merge creativity with technology. At Prozecto, we empower our
          clients to reach their potential through innovation, efficiency, and
          trust.
        </p>
      </motion.section>

      {/* What We Do */}
      <motion.section
        custom={0.3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-[1.618fr_1fr] items-center gap-10 mb-20 px-[6vw]"
      >
        <div>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-justify mb-6">
            We offer a comprehensive suite of services designed to meet every
            business need:
          </p>
          <ul className="space-y-2 text-lg list-disc list-inside">
            <li>Coding and Development</li>
            <li>Microsoft Excel Solutions</li>
            <li>Website Design and Development</li>
            <li>App Development</li>
            <li>Video Editing</li>
            <li>Software Development</li>
            <li>Graphic Design</li>
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block w-full h-80 bg-blue-100 dark:bg-blue-900/30 rounded-2xl shadow-inner overflow-hidden"
        ><img className="md:mt-12 md:scale-142 lg:mt-0 lg:scale-100" src={company2Img} alt="" /></motion.div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        custom={0.4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-20 px-[6vw]"
      >
        <h2 className="text-3xl md:text-7xl font-semibold mb-20 border-l-4 border-blue-600 pl-4">
          Why Choose Prozecto?
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <ul className="space-y-3 text-lg list-disc list-inside">
            <li>Experienced professionals across multiple domains</li>
            <li>Client-first approach with transparent communication</li>
          </ul>
          <ul className="space-y-3 text-lg list-disc list-inside">
            <li>Modern technologies with agile workflows</li>
            <li>On-time delivery and dedicated support</li>
          </ul>
        </div>
      </motion.section>

      {/* Closing */}
      <motion.section
        custom={0.5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl mx-auto px-[6vw] pb-20"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mt-20 mb-4">
          Let’s Build Together
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Whether you’re a startup, entrepreneur, or enterprise,{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Prozecto
          </span>{" "}
          is your trusted partner for innovation. Together, let’s build
          solutions that inspire growth and lasting success.
        </p>
      </motion.section>
    </div>
  );
};

export default AboutUs;
