import { motion } from 'motion/react';
import { useState } from 'react';
import Frente from '../assets/frente_institucion-01.jpg';
import Educacion from '../assets/ninos_salon.jpg';
import Ninos from '../assets/ninos_salida.jpg';

const DialogHome = ({ item, close }) => {
  const [animateClose, setAnimateClose] = useState(false);
  const animateProps = { opacity: 1, scale: animateClose ? 0 : 1, x: "-50%", y: "-50%"};
  
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