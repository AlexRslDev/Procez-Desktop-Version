import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import GridHome from '../GridHome';
import Folder from '/folder-closed-solid.svg';
import PdfIcon from '/file-pdf-solid.svg';
import Health from '/hospital-user-solid.svg';
import Calendar from '/calendar-check-solid.svg';

/*
-- Guardar cantidad de sabanas generadas cuando: se genere una nueva.
-- Guardar cantidad de ultimo alumno registrado: se cree un nuevo estudiante.
*/

function Home() {
  const [registered, setRegistered] = useState(null);
  const [sick, setSick] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [ mf, setMf ] = useState(null);

  useEffect(() => {fetchStudents(); fetchSick(); fetchHomeData(); fetchCountMF()}, [])

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setRegistered(response.data.length);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchSick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/alumnos-enfermos');
      setSick(response.data.count);
    } catch (error) {
      console.error('Error fetching sick:', error);
    }
  };

  const fetchCountMF = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sexo');
      setMf(response.data);
    } catch (error) {
      console.error('Error fetching seyxo:', error);
    }
  };

  const fetchHomeData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/home-data');
      setHomeData(response.data);
    } catch (error) {
      console.error('Error fetching Home Data:', error);
    }
  };

  return (
    <motion.div 
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.8 }}
    className="w-[90%] mt-[50px] flex flex-col gap-10">
      <h1 className="font-semibold text-2xl">Inicio</h1>

      <div className="flex flex-wrap gap-6">
        <div className="w-auto h-24 flex flex-col justify-center gap-3 px-6 rounded-lg bg-[#F6F6F6]">
          <span className="text-black/80 text-sm">Estudiantes Registrados</span>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <img src={Folder} className="w-auto h-5" />
            </div>
            <span className="font-semibold text-xl">{registered && registered}</span>
          </div>
        </div>

        <div className="w-auto h-24 flex flex-col justify-center gap-3 px-6 rounded-lg bg-[#F6F6F6]">
          <span className="text-black/80 text-sm">Sabanas Generadas</span>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <img src={PdfIcon} className="w-auto h-5" />
            </div>
            <span className="font-semibold text-xl">{homeData && homeData[0].value}</span>
          </div>
        </div>

        <div className="w-auto h-24 flex flex-col justify-center gap-3 px-6 rounded-lg bg-[#F6F6F6]">
          <span className="text-black/80 text-sm">Alumnos con Enfermedades</span>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <img src={Health} className="w-auto h-5" />
            </div>
            <span className="font-semibold text-xl">{sick && sick}</span>
          </div>
        </div>

        <div className="w-auto h-24 flex flex-col justify-center gap-3 px-6 rounded-lg bg-[#F6F6F6]">
          <span className="text-black/80 text-sm">Alumnos</span>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <img src={Health} className="w-auto h-5" />
            </div>
            <span className="font-semibold text-xl">{mf && mf.Masculino}</span>
          </div>
        </div>

        <div className="w-auto h-24 flex flex-col justify-center gap-3 px-6 rounded-lg bg-[#F6F6F6]">
          <span className="text-black/80 text-sm">Alumnas</span>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <img src={Health} className="w-auto h-5" />
            </div>
            <span className="font-semibold text-xl">{mf && mf.Femenino}</span>
          </div>
        </div>

        <div className="w-auto h-24 flex flex-col justify-center gap-3 px-6 rounded-lg bg-[#F6F6F6]">
          <span className="text-black/80 text-sm">Último Alumno Registrado</span>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <img src={Calendar} className="w-auto h-5" />
            </div>
            <span className="font-semibold text-xl">{homeData && homeData[1].value}</span>
          </div>
        </div>
      </div>

      <div className='w-auto flex'>
        <GridHome />
      </div>
    </motion.div>
  )
}

export default Home;