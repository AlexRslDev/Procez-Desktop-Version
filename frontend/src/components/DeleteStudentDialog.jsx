import { useState } from 'react';
import { motion } from 'motion/react';

const DeleteStudentDialog = ({ student, toClose, toRemove }) => {
  const [animateClose, setAnimateClose] = useState(false);
  const animateProps = { opacity: 1, scale: animateClose ? 0 : 1, x: "-50%", y: "-50%"};

  const handleClose = () => {
    setAnimateClose(true); 
    setTimeout(toClose, 250);
  };
  
  return (
    <motion.div 
    initial={{ opacity:0, scale: 0, x: "-50%", y: "-50%" }}
    animate={animateProps}
    transition={{ duration:0.25}}
    className="absolute w-[530px] h-[280px] px-8 flex flex-col items-center justify-center bg-white border border-black/15 rounded-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-2xl">
      <h1 className="font-bold text-xl text-center">¿Esta Seguro que desea eliminar al estudiante: <br /> {student.nombre_completo_estudiante}?</h1>

      <p className="text-center px-10 my-4">El estudiante será removido permanentemente de la base de datos y no podrá ser recuperado.</p>

      <div className="w-full h-auto flex mt-6 justify-end">
        <button className="bg-black font-medium text-white px-6 py-3 rounded-xl mr-4 transition-all hover:shadow-butom" onClick={handleClose}>Cancelar</button>
        <button className="bg-black font-medium text-white px-6 py-3 rounded-xl transition-all hover:shadow-butom" onClick={toRemove}>Si</button>
      </div>
    </motion.div>
  )
}

export default DeleteStudentDialog