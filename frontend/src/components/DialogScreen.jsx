import { useState } from 'react';
import { motion } from 'motion/react';
import StudentTemplate from "./StudentTemplate"

const DialogScreen = ({ isOpen, onClose, student, grades, sections, hadleData, handleDelete }) => {
  if (!isOpen) return null;
  const [animateClose, setAnimateClose] = useState(false);
  
  const animateProps = { opacity: 1, scale: animateClose ? 0 : 1 };

  const handleClose = () => {
    setAnimateClose(true); 
    setTimeout(onClose, 250);
  };

  return (
    <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <motion.div 
      initial={{ opacity:0, scale: 0 }}
      animate={animateProps}
      transition={{ duration:0.25}}
      className="w-3/5 h-4/5 bg-white p-7 rounded-lg shadow overflow-y-auto overflow-x-hidden">
        <h2 className="font-semibold">Información del Estudiante</h2>
        {student && (
          <StudentTemplate student={student} grades={grades} sections={sections} />
        )}
        <div className="w-[calc(100%-50px)] h-auto flex justify-end gap-3">
          <button className="py-2 px-8 bg-blue-800 border-none rounded-full transition-all mt-7 hover:bg-blue-600" onClick={(event) => {event.stopPropagation();hadleData(student);}}><img src={`./src/assets/pen-to-square-regular.svg`} alt="Modificar" className="w-auto h-6" /></button>

          <button onClick={(event) => {event.stopPropagation(); handleDelete(student)}} className="py-2 px-8 bg-blue-800 border-none rounded-full text-white transition-all mt-7 hover:bg-blue-600"><img src={`./src/assets/trash-can-regular.svg`} alt="Modificar" className="w-auto h-6" /></button>

          <button onClick={handleClose} className="py-2 px-8 bg-blue-800 border-none rounded-full text-white transition-all mt-7 hover:bg-blue-600">Close</button>
        </div>
      </motion.div>
    </div>
  );
};

export default DialogScreen;