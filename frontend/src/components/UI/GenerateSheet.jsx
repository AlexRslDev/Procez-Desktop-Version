import { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from 'motion/react';
import { useFormData } from '../FormDataContex';
import Spinner from '../Spinner';

function GenerateSheet() {
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [ homeValues, setHomeValues ] = useState([]);
  const { selectedGrade, setSelectedGrade } = useFormData();
  const { selectedSection, setSelectedSection } = useFormData();
  const { addToSelectedGrade } = useFormData();
  const { addToSelectedSection } = useFormData();
  const { resetFormData } = useFormData();
  const [isSent, setIsSent] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isSpinner, setIsSpinner] = useState(false);  // Spinner state

  useEffect(() => {
    // Fetch grades on component load
    const fetchGrades = async () => {
      const response = await axios.get('http://localhost:5000/api/grades');
      setGrades(response.data);
    };

    const fetchOthers = async () => {
      const response = await axios.get('http://localhost:5000/api/others');
      setHomeValues(response.data);
    }

    fetchGrades();
    fetchOthers();
  }, []);

  useEffect(() => {
    // Fetch sections when a grade is selected
    const fetchSections = async () => {
      if (selectedGrade.id) {
        const response = await axios.get(`http://localhost:5000/api/sections?grade_id=${selectedGrade.id}`);
        setSections(response.data);
      } else {
        setSections([]);
      }
    };

    fetchSections();
  }, [selectedGrade.id]);

  // Handle the PDF generation and download link
  const handleSubmit = async (section_id, grade, section) => {
    try {
      // Set the spinner to true to show loading
      setIsSpinner(true);
      
      // Fetch the PDF from the backend (using GET)
      const response = await fetch(`http://localhost:5000/api/generate-pdf/${section_id}/${grade}/${section}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching PDF');
      }

      // Convert the response to a blob and create a download link
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);  // Store the PDF URL in state
      setIsSent(true);     // Indicate that the PDF is ready
      const othersValue = homeValues[0].value;
      handleChangeHome(othersValue && Number(othersValue) + 1, 1);
      resetFormData();
    } catch (error) {
      console.error('Error fetching PDF:', error);
    } finally {
      // Hide the spinner after the PDF is generated (whether success or error)
      setIsSpinner(false);
    }
  };

  // Handle the download click event
  const handleDownload = () => {
    if (pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'sabana.pdf';  // Set the default filename
      a.click();
      setIsSent(false);
    }
  };

  async function handleChangeHome(valor, id) {
    try {
      const response = await axios.post('http://localhost:5000/api/intercambiar', {
        valor: valor,
        id: id
      });
  
      console.log('Valor actualizado correctamente', response.status);
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
      } else if (error.request) {
        console.error('Error de la solicitud:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  }

  return (
    <motion.div 
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.8 }}
    className="w-[90%] h-auto mt-[50px]">
      <section>
        <h1 className="text-xl font-semibold">Generar Sabana</h1>
        <div className="mt-10 flex gap-12">
          <div>
            <p className="mb-6">Seleccione el grado</p>
            <select
              value={selectedGrade.id}
              onChange={(e) => addToSelectedGrade(e.target.value, grades.find((grade) => grade.id == e.target.value && grade.nombre))}
              className="w-60 p-3 text-white bg-blue-800 rounded-lg cursor-pointer"
            >
              <option value="">Selecciona un grado</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>{grade.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-6">Seleccione la sección</p>
            <select
              value={selectedSection.id}
              disabled={!selectedGrade.id}
              onChange={(e) => { addToSelectedSection(e.target.value, sections.find((section) => section.id == e.target.value && section.nombre)) }}
              className="w-60 p-3 text-white bg-blue-800 rounded-lg cursor-pointer disabled:bg-blue-400"
            >
              <option value="">Selecciona una sección</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>{section.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={() => { selectedSection.id && selectedGrade.id && handleSubmit(selectedSection.id, selectedGrade.nombre.nombre, selectedSection.nombre.nombre) }} className="px-5 mt-8 py-[10px] flex gap-4 border-[1.5px] border-gray-800 rounded-lg text-black transition-all hover:bg-gray-100">
          <p>Generar</p>
          <img className="w-auto h-6" src='./src/assets/file-pdf-regular.svg' />
        </button>
      </section>

      {isSpinner && (
        <div className="flex justify-center items-center mt-8">
          <Spinner />
        </div>
      )}

      {isSent && !isSpinner && (
        <section>
          <div className="w-[480px] h-24 mt-16 flex items-center justify-center gap-12 rounded-lg bg-blue-50">
            <img src='./src/assets/face-smile-beam-regular.svg' className="w-auto h-14" />
            <p className="text-xl select-none">Sabana generada con éxito!</p>
          </div>
          <button onClick={handleDownload} className="px-5 mt-4 py-[10px] flex gap-4 rounded-lg text-white bg-blue-800 transition-all hover:bg-blue-700">
            <p className="font-bold">Descargar</p>
            <img className="w-auto h-6" src='./src/assets/download-solid.svg' />
          </button>
        </section>
      )}
    </motion.div>
  );
}

export default GenerateSheet;
