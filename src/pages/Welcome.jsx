import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/Union.png';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/signup');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="max-w-[1640px] mx-auto md:max-w-full md:mx-auto bg-primary">
      <div className="flex flex-col items-center justify-center h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <motion.img
            src={logo}
            alt=""
            className="w-[70%] md:w-full mx-auto"
            draggable="false"
            style={{ touchAction: 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="mt-4 text-white font-light text-4xl md:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Wallet
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Welcome;
