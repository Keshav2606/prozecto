import loaderVideo from '../assets/LoaderBright.mp4';

const Loader = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <video
        autoPlay
        muted
        onEnded={onComplete}
        className="w-96 h-64 sm:w-80 sm:h-80 md:w-full md:h-full object-contain"
      >
        <source src={loaderVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loader;