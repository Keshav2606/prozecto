import { motion } from "framer-motion";

const ServiceCard = ({ name, index, image }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center cursor-pointer"
      whileHover={{
        scale: 1.08,
        transition: { type: "spring", stiffness: 200 },
      }}
    >
      {/* Image Placeholder */}
      <div className="w-full h-32 rounded-xl flex items-center justify-center mb-6 bg-gray-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain scale-150"
          />
        ) : (
          <span className="text-gray-400 text-sm">[Image]</span>
        )}
      </div>

      {/* Service Name */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        {name}
      </h2>
    </motion.div>
  );
};

export default ServiceCard;
