import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Frente from '/frente_institucion-01.jpg';
import Educacion from '/ninos_salon.jpg';
import Ninos from '/ninos_salida.jpg';
import ArrowDown from '/flecha-ampliar.webp';
import ArrowUp from '/flecha-contraer.webp';

const DialogHome = ({ item, close }) => {
  const [animateClose, setAnimateClose] = useState(false);
  const animateProps = { opacity: 1, scale: animateClose ? 0 : 1, x: "-50%", y: "-50%"};
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const scrollStyles = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 transparent',
  };

  const handleClose = () => {
    setAnimateClose(true); 
    setTimeout(close, 250);
  };

  return (
    <motion.div 
    initial={{ opacity:0, scale: 0, x: "-50%", y: "-50%" }}
    animate={animateProps}
    transition={{ duration:0.25}}
    className={`fixed w-[60%] h-[80%] z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 p-10 bg-[${item.color}] rounded-lg border border-black/25 overflow-x-hidden overflow-y-auto`}
    style={scrollStyles}>
      <h1 className="font-semibold text-2xl">{item.object.title}</h1>

      <div className="flex flex-col gap-5">
        {Array.isArray(item.object.description) ? item.object.description.map((element, index) => (<p key={index}>{element}</p>)) : <p>{item.object.description}</p>}
      </div>

      {item.object.institution_data && 
        <motion.div
          className='mb-8 border border-black/15 rounded-md text-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className='flex items-center justify-between py-5 px-5 font-semibold select-none cursor-pointer'
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            whileTap={{ scale: 0.95 }}
          >
            Detalles de la institucion
            <motion.img
              src={isDetailsOpen ? ArrowUp : ArrowDown}
              alt='Expandir'
              className='w-auto h-6'
              animate={{ rotate: isDetailsOpen ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <AnimatePresence>
            {isDetailsOpen && (
              <motion.ul
                className='flex flex-col gap-4 py-8 px-5 border-t border-t-black/15'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.object.institution_data &&
                  item.object.institution_data.map((data, index) => (
                    <motion.li
                      key={`Institucion-data-${index}`}
                      className='flex gap-2'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <span className='font-medium'>{data.name}</span>
                      <p className='text-black/90'>{data.content}</p>
                    </motion.li>
                  ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      }

      {Array.isArray(item.object.description) && (<div className='flex flex-col gap-4'>
        <img src={Frente} alt="Frente de la institucion" />
        <img src={Educacion} alt="Salon de clases" />
        <img src={Ninos} alt="Estudiantes" />
      </div>)}

      {item.object.img && (<><img src={item.object.img} /></>)}

      <div className='w-full h-auto flex justify-end'>
        <button onClick={handleClose} className="py-2 px-7 rounded-lg bg-black text-white transition-all hover:bg-white hover:text-black">Salir</button>
      </div>
    </motion.div>
  )
}

export default DialogHome