import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'motion/react';
import DialogScreen from '../DialogScreen';
import DeleteStudentDialog from '../DeleteStudentDialog';
import { useFormData } from '../FormDataContex';
import SearchStudent from '../SearchStudent';
import DropdownMenu from '../DropdownMenu';
import '../../styles/ModifyStudent.css';

function ModifyStudent() {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState({});
  const { setFormData } = useFormData();
  const { addToSelectedGrade } = useFormData();
  const { addToSelectedSection } = useFormData();
  const { setIsNew } = useFormData();
  const navigate = useNavigate();

  const fetchStudents = async (order, value = false) => {
    if (order === "Initial") {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    } else if (order === 'Grades' && value) {
      try {
        const response = await axios.get('http://localhost:5000/api/students_by_grades', {
          params: {
            grado_id: value, // Parámetro enviado como query string
          },
        });
        setStudents(response.data); // Guardar estudiantes en el estado
      } catch (err) {
        console.error(err.response?.data?.error || 'Error al obtener los estudiantes');
      }
    } else if (order === 'Sections' && value) {
      try {
        const response = await axios.get('http://localhost:5000/api/students_by_sections', {
          params: {
            section_id: value,
          },
        });
        setStudents(response.data);
      } catch (err) {
        console.error(err.response?.data?.error || 'Error al obtener los estudiantes');
      }
    }
  };

  const fetchGrades = async () => {
    const response = await axios.get('http://localhost:5000/api/grades');
    setGrades(response.data);
  };

  const fetchSections = async () => {
    const response = await axios.get('http://localhost:5000/api/all_sections');
    setSections(response.data);
  };

  // Initial Fetch Data
  useEffect(() => {
    fetchStudents('Initial');
    fetchGrades();
    fetchSections();
  }, [])

  const hadleDataStudent = (student) => { 
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...student,
    }));
    console.log(student)
    addToSelectedGrade(student.grado_id, grades.map((grade) => grade.id === student.grado_id && grade.nombre));
    addToSelectedSection(student.seccion_id, sections.map((section) => section.id === student.seccion_id && section.nombre));
    setIsNew(false);
    navigate('/CreateStudent');
  }

  const handleDeleteStudent = (student_obj) => {
    setStudentToDelete(student_obj);
    setIsDeleteDialogOpen(true);
  }

  const handleCloseDeleteDialog = () => {setIsDeleteDialogOpen(false); setStudentToDelete({});}

  const handleRemoveStudent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students_delete/${studentToDelete.ce_ci}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // If the deletion was successful, you may want to update your UI here
        //alert("Student deleted successfully.");
        fetchStudents('Initial');
        setDialogOpen(false);
        setIsDeleteDialogOpen(false);
        setStudentToDelete({});
      } else {
        const errorData = await response.json();
        console.log(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }

  const openDialog = (student) => {
    setSelectedStudent(student); // Set the selected student
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    //setEnableInputs(false)
    setSelectedStudent(null); // Reset selected student when dialog closes
  };


  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <motion.div 
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.8 }}
    className="w-[90%] h-auto flex flex-col items-center mt-10">
      <div>
        <SearchStudent dialog={openDialog} />
      </div>

      <div className="w-full h-auto flex items-center justify-between mt-7">
        <h3 className='font-medium text-xl'>Estudiantes</h3>
        <DropdownMenu fetchStudents={fetchStudents} grades={grades} sections={sections} />
      </div>

      <div className="w-full h-auto mt-5 mb-[30px]">
        <table className='w-full border-collapse border-none'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>CE / CI</th>
              <th>Representante</th>
              <th>Grado</th>
              <th>Sección</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {students.slice(0, visibleCount).map((item, index) => (
              <tr key={index} onClick={() => openDialog(item)} className='trStd'>
                <td>{item.nombre_completo_estudiante}</td>
                <td>{item.ce_ci}</td>
                <td>{item.nombre_completo_representante}</td>
                <td>{grades.map((grade) => grade.id === item.grado_id && grade.nombre)}</td>
                <td>{sections.map((section) => section.id === item.seccion_id && section.nombre)}</td>
                <td>
                  <div className="flex gap-4">
                    <button onClick={(event) => {
                        event.stopPropagation();
                        hadleDataStudent(item);
                      }}
                      className='w-8 h-8  flex items-center justify-center border-none rounded-lg bg-[#683EC0] cursor-pointer transition-all hover:bg-[#8a2be2]'
                    >
                      <img src="./src/assets/pen-to-square-regular.svg" alt="Modificar" className='w-auto h-[16.5px]' />
                    </button>

                    <button onClick={(event) => {event.stopPropagation(); handleDeleteStudent(item);}}
                      className='w-8 h-8  flex items-center justify-center border-none rounded-lg bg-[#683EC0] cursor-pointer transition-all hover:bg-[#8a2be2]'
                    >
                      <img src="./src/assets/trash-can-regular.svg" alt="Eliminar" className='w-auto h-[16.5px]' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
      <button className='load-more-mod-std' onClick={loadMore}>Cargar Mas</button>
      
      <div className="min-w-[1px] min-h-10"></div>
      <DialogScreen 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
        student={selectedStudent}
        grades={grades}
        sections={sections}
        hadleData={hadleDataStudent}
        handleDelete={handleDeleteStudent}
      />

      {isDeleteDialogOpen && <DeleteStudentDialog student={studentToDelete} toClose={handleCloseDeleteDialog} toRemove={handleRemoveStudent} />}
    </motion.div>
  )
}

export default ModifyStudent