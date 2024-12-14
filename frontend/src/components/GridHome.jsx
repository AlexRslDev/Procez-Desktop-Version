import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { creadores, manualUsuario, institucion } from '../Data/dataHome.js';
import DialogHome from './DialogHome';
import ArrowUp from '../assets/square-up-right-solid.svg';
import CodeSolid from '../assets/code-solid.svg';
import Manual from '../assets/book-solid.svg';
import School from '../assets/school-solid.svg';
import Frente from '../assets/frente_institucion-01.jpg';
import Educacion from '../assets/ninos_salon.jpg';
import Ninos from '../assets/ninos_salida.jpg';

const GridHome = () => {
  const [item, setItem] = useState('');
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleOpenDialog = (name) => {
    if (name === 'creadores') {
      setItem({object: creadores, color: '#F4F3FF'});
    } else if (name === 'manual') {
      setItem({object: manualUsuario, color: '#5DFDCB'});
    } else if (name === 'institucion') {
      setItem({object: institucion, color: '#BADEFC'});
    };
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => setIsOpenDialog(false);

  return (
    <div className="grid grid-cols-1 grid-rows-3 gap-y-4 mid:grid-cols-2 mid:grid-rows-6 mb-14 mid:mb-6">
      <div 
      onClick={() => handleOpenDialog('creadores')}
      className="col-span-1 row-span-3 flex flex-col gap-4 w-[475px] h-44 px-7 pt-4 bg-[#F4F3FF] rounded-xl cursor-pointer transition-all hover:scale-105 mid:w-[380px]">
        <div className='flex justify-between'>
          <img src={CodeSolid} alt="Creadores" className='h-5' />
          <img src={ArrowUp} alt="Mas detalles" className='h-5' />
        </div>
        <div>
          <h3 className='font-semibold'>{creadores.title}</h3>
          <p className='text-black-80 line-clamp-3'>{creadores.description}</p>
        </div>
      </div>
      
      <div 
      onClick={() => handleOpenDialog('institucion')}
      className="col-span-1 row-span-6 flex flex-col gap-6 w-[475px] h-[350px]  px-7 pt-4 bg-[#BADEFC] rounded-xl z-10 mid:w-[410px] cursor-pointer transition-all hover:scale-105 mid:h-full">
        <div className='flex justify-between'>
          <img src={School} alt="Creadores" className='h-8' />
          <img src={ArrowUp} alt="Mas detalles" className='h-8' />
        </div>
        <div>
          <h3 className='font-semibold text-xl'>{institucion.title}</h3>
          <p className='text-black-80 mt-2 line-clamp-5'>{institucion.description[0]}</p>
        </div>
        <div className='flex gap-6'>
          <img src={Frente} alt="" className='w-[75px] h-[75px] object-cover rounded-full transition-all hover:scale-125' />
          <img src={Educacion} alt="" className='w-[75px] h-[75px] object-cover rounded-full transition-all hover:scale-125' />
          <img src={Ninos} alt="" className='w-[75px] h-[75px] object-cover rounded-full transition-all hover:scale-125' />
        </div>
      </div>

      <div 
      onClick={() =>  navigate('/UserManual')}
      className="col-span-1 row-span-3 flex flex-col gap-4 w-[475px] h-44 px-7 pt-4 bg-[#5DFDCB] rounded-xl cursor-pointer transition-all hover:scale-105 mid:w-[380px]">
        <div className='flex justify-between'>
          <img src={Manual} alt="Creadores" className='h-5' />
          <img src={ArrowUp} alt="Mas detalles" className='h-5' />
        </div>
        <div>
          <h3 className='font-semibold'>{manualUsuario.title}</h3>
          <p className='text-black-80 line-clamp-3'>{manualUsuario.description}</p>
        </div>
      </div>

      {isOpenDialog && <DialogHome item={item} close={handleCloseDialog} />}
    </div>
  )
}

export default GridHome