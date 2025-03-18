import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import axios from 'axios';
import { useFormData } from '../FormDataContex';
import '../../styles/CreateStudent.css';

function CreateStudent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [ceCiList, setCeCiList] = useState([]);
  const [ homeValues, setHomeValues ] = useState([]);
  const [studentExist, setStudentExist] = useState('');
  const { formData, setFormData } = useFormData();
  const { selectedGrade, setSelectedGrade } = useFormData();
  const { selectedSection, setSelectedSection } = useFormData();
  const { addToSelectedGrade } = useFormData();
  const { addToSelectedSection } = useFormData();
  const { resetFormData } = useFormData();
  const { isNew, setIsNew } = useFormData(); // new = new student(false)
  const [missingFields, setMissingFields] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      const response = await axios.get('http://localhost:5000/api/grades');
      setGrades(response.data);
    };

    const fetchHomeValues = async () => {
      const response = await axios.get('http://localhost:5000/api/home-data');
      setHomeValues(response.data);
    }

    const fetchCeCiValues = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students/ce_ci');
        if (!response.ok) {
          throw new Error('Error fetching ce_ci values');
          return;
        }
        const data = await response.json();
        setCeCiList(data.map(item => item.ce_ci)); // Assuming your response is an array of objects
      } catch (error) {
        console.error('Error fetching ci values:', error);
      }
    };

    fetchGrades();
    fetchHomeValues();
    fetchCeCiValues();
  }, []);

  useEffect(() => {
    // Obtener secciones cuando se selecciona un grado
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

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updateState = (maxLength) => {
      // Permitir que el input esté vacío
      if (value === "") {
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
        return;
      }
  
      // Validar longitud
      if (value.length >= maxLength) {
        return;
      }
  
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    };

    switch (name) {
      case 'ce_ci':
        updateState(12);
        break;

      case 'serial_patria':
      case 'codigo_patria':
        updateState(11);
        break;

      case 'ci_representante':
        updateState(9);
        break;

      case 'fecha_nacimiento':
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));

        setFormData(prev => ({
          ...prev,
          ['edad']: calcularEdad(value),
        }));
        break;

      default:
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
        break;
    }  
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNew) {
      // Lista de campos obligatorios
      const requiredFields = [
        "ce_ci",
        "nombre_completo_estudiante",
        "fecha_nacimiento",
        "edad",
        "sexo",
        "nombre_completo_representante",
        "ci_representante",
        "telefono",
        "seccion_id",
        "grado_id"
      ];

      // Crea un nuevo objeto con seccion_id agregado

      const finalFormData = {
        ...formData,
        seccion_id: selectedSection.id,
        grado_id: selectedGrade.id,
      };

      // Check if ce_ci exists in the existing list
      if (ceCiList.includes(finalFormData.ce_ci)) {
        setStudentExist('El CE / CI ya existe en la base de datos.');
        return; // Do not submit if CI already exists
      }

      // Verificar que los campos obligatorios estén llenos
      const emptyFields = requiredFields.filter((field) => {
        const value = finalFormData[field];
        return typeof value === "string" && value.trim() === "";
      });

      // Mostrar mensaje de error si hay campos obligatorios vacíos
      if (emptyFields.length > 0) {
        setMissingFields('Faltan campos obligatorios por rellenar');
        return;
      }

      console.log('Formulario enviado:', finalFormData);

      // Hacer el POST al backend
      try {
        const response = await fetch('http://localhost:5000/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalFormData),
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        // Restablecer los datos a su punto inicial en Global Data Context
        resetFormData();
        nextStep();
        //alert('Estudiante Agregado Exitosamente');
        //const othersValue = homeValues[1].value;
        handleChangeHome(getCurrentData(), 2);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
      }  
    } else {
      const finalFormData = {
        ...formData,
        seccion_id: selectedSection.id,
        grado_id: selectedGrade.id,
      };
      console.log(finalFormData)
      try {
        const response = await fetch(`http://localhost:5000/api/student_modify/${finalFormData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalFormData), // Send the entire formData object
        });
    
        if (response.ok) {
          const data = await response.json();
          //alert(data.message);
          nextStep();
        } else {
          const errorData = await response.json();
          alert(errorData.error || 'Update failed');
        }
      } catch (error) {
        console.error('Error to send modify student data:', error);
      }
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
  };

  const getCurrentData = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1; // Los meses comienzan desde 0
    let year = date.getFullYear();

    // Agregar ceros iniciales si es necesario
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Formatear el año a 4 dígitos (añadir ceros si es necesario)
    year = year.toString().padStart(4, '0');

    return `${day}/${month}/${year}`;
  };

  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
  
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    if (edad < 10) {
      edad = '0' + edad;
    }

    return edad;
  }

  return (
      <motion.div 
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      transition={{ duration:0.8 }}
      className="Create-Student-Container">
        <h2 className='mrg-btm-50 text-2xl font-semibold'>{isNew ? 'Crear Estudiante' : 'Modificar Estudiante'}</h2>
        <form onSubmit={handleSubmit} className='form-create-student'>

          {currentStep === 1 && (
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.8 }}
            >
              <h2 className='font-medium text-lg underline underline-offset-4'>Estudiante</h2>

              <section className='sections-create-student'>
                <div>
                  <p>Grado *</p>
                  <select
                    value={ selectedGrade.id }
                    onChange={(e) => addToSelectedGrade(e.target.value, grades.map((grade) => grade.id === e.target.value && grade.nombre))}
                    className='select-create-student'
                  >
                    <option value="">Selecciona un grado</option>
                    {grades.map((grade) => (
                      <option key={grade.id} value={grade.id}>{grade.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Sección *</p>
                  <select
                    value={ selectedSection.id }
                    onChange={(e) => {addToSelectedSection(e.target.value, sections.map((section) => section.id === e.target.value && section.nombre))}}
                    className='select-create-student'
                  >
                    <option value="">Selecciona una sección</option>
                    {sections.map((section) => (
                      <option key={section.id} value={section.id}>{section.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Sexo *</p>
                  <select
                    value={formData.sexo}
                    name='sexo'
                    onChange={handleChange}
                    className='select-create-student'
                  >
                    <option value="">Seleccionar</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </section>

              <section className='sections-create-student'>
                <div>
                  <p>C.I  o  C.E *</p>
                  <input 
                    type="number"
                    name='ce_ci'
                    value={formData.ce_ci}
                    autoComplete='off'
                    placeholder='11689503...'
                    className='medium-input'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Apellidos y Nombres del Estudiante *</p>
                  <input
                    type="text"
                    name='nombre_completo_estudiante'
                    value={formData.nombre_completo_estudiante}
                    autoComplete='off'
                    placeholder='Garcia ... Angel ...'
                    className='full-input' 
                    onChange={handleChange}
                  />
                </div>
                <div className="small-gap">
                  <div className='alg-center'>
                    <p>Fecha de nacimiento *</p>
                    <input 
                      type="date"
                      name='fecha_nacimiento'
                      value={formData.fecha_nacimiento}
                      className='medium-input'
                      onChange={handleChange}
                    />
                  </div>

                  <div className='alg-center'>
                    <p>Edad *</p>
                    <input
                      type="number"
                      name='edad'
                      value={formData.edad}
                      autoComplete='off'
                      disabled
                      className='super-small-input' 
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <p>Lugar de nacimiento</p>
                  <input
                    type="text"
                    name='lugar_de_nacimiento'
                    value={formData.lugar_de_nacimiento}
                    autoComplete='off'
                    placeholder='Valera...'
                    className='medium-input' 
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Con quién vive</p>
                  <input
                    type="text"
                    name='con_quien_vive'
                    value={formData.con_quien_vive}
                    autoComplete='off'
                    placeholder='Mama, abuela...'
                    className='medium-input' 
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Quién lo retira</p>
                  <input
                    type="text"
                    name='quien_lo_retira'
                    value={formData.quien_lo_retira}
                    autoComplete='off'
                    placeholder='Tía, papá'
                    className='medium-input' 
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p>Parentesco</p>
                  <select
                    value={formData.parentesco}
                    name='parentesco'
                    onChange={handleChange}
                    className='select-create-student'
                  >
                    <option value="">Seleccionar</option>
                    <option value="Madre">Madre</option>
                    <option value="Padre">Padre</option>
                    <option value="Abuelo">Abuelo</option>
                    <option value="Abuela">Abuela</option>
                    <option value="Tío">Tío</option>
                    <option value="Tía">Tía</option>
                    <option value="Hermano">Hermano</option>
                    <option value="Hermana">Hermana</option>
                    <option value="Primo">Primo</option>
                    <option value="Prima">Prima</option>
                  </select>
                  {/* input 
                    type="text"
                    name='parentesco'
                    value={formData.parentesco}
                    autoComplete='off'
                    placeholder='Madre...'
                    className='small-input'
                    onChange={handleChange}
                  /> */}
                </div>

                <div>
                  <div className='mx-6'>
                    <p>Repitiente</p>

                    <div className="!flex-row mt-2">
                      <input
                        type="radio"
                        id="repitiente_si"
                        name="repitiente"
                        value="Si"
                        checked={formData.repitiente === "Si"}
                        onChange={handleChange}
                      />
                      <label htmlFor="repitiente_si">Sí</label>
                      <input
                        type="radio"
                        id="repitiente_no"
                        name="repitiente"
                        value="No"
                        checked={formData.repitiente === "No"}
                        onChange={handleChange}
                      />
                      <label htmlFor="repitiente_no">No</label>
                    </div>
                  </div>

                </div>
              </section>

              <h3>Salud del Estudiante</h3>
              <section className='sections-create-student'>
                <div>
                  <p>Alérgico</p>
                  <input
                    type="text"
                    name='alergico'
                    value={formData.alergico}
                    autoComplete='off'
                    placeholder='Es alergico a...'
                    className='medium-input' 
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Medicamento</p>
                  <input
                    type="text"
                    name='medicamento'
                    value={formData.medicamento}
                    autoComplete='off'
                    placeholder='Acetaminophen...'
                    className='medium-input' 
                    onChange={handleChange}
                  />
                </div>
                <div className='mx-6'>
                  <p>Informe Médico</p>

                  <div className="!flex-row mt-2">
                    <input
                      type="radio"
                      id="informe_medico_si"
                      name="informe_medico"
                      value="Si"
                      checked={formData.informe_medico === "Si"}
                      onChange={handleChange}
                    />
                    <label htmlFor="informe_medico_si">Sí</label>
                    <input
                      type="radio"
                      id="informe_medico_no"
                      name="informe_medico"
                      value="No"
                      checked={formData.informe_medico === "No"}
                      onChange={handleChange}
                    />
                    <label htmlFor="informe_medico_no">No</label>
                  </div>
                </div>
              </section>

              <h3>Tallas del Estudiante</h3>
              <section className='sections-create-student'>
                <div className="small-gap">
                  <div className='alg-center'>
                    <p>Peso (kg)</p>
                    <input 
                      type="text"
                      name='p_kg'
                      value={formData.p_kg}
                      autoComplete='off'
                      placeholder='19.5'
                      className='super-small-input'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='alg-center'>
                    <p>Talla Cuello</p>
                    <input 
                      type="text"
                      name='tc'
                      value={formData.tc}
                      autoComplete='off'
                      placeholder='1.25'
                      className='super-small-input'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='alg-center'>
                    <p>Pantalón</p>
                    <input 
                      type="text"
                      name='p'
                      value={formData.p}
                      autoComplete='off'
                      placeholder='10'
                      className='super-small-input'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='alg-center'>
                    <p>Camisa</p>
                    <input 
                      type="text"
                      name='c'
                      value={formData.c}
                      autoComplete='off'
                      placeholder='08'
                      className='super-small-input'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='alg-center'>
                    <p>Zapato</p>
                    <input 
                      type="text"
                      name='z'
                      value={formData.z}
                      autoComplete='off'
                      placeholder='32'
                      className='super-small-input'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </section>

              <h3>Observación</h3>
              <section className='sections-create-student'>
                <input 
                    type="text"
                    name='observacion'
                    value={formData.observacion}
                    autoComplete='off'
                    placeholder='Nuevo ingreso...'
                    className='full-input'
                    onChange={handleChange}
                  />
              </section>

              <div className="container-steps-create-student">
                <div className="process-create-student-state-line">
                  <div className="left-line bg-2-process"></div>
                  <div className="ball-line bg-2-process"></div>
                  <div className="right-line bg-1-process"></div>
                  <div className="ball-line bg-1-process"></div>
                </div>

                <button onClick={nextStep} className='next-btn-create-student'>Siguente</button>
              </div>

            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div 
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.8 }}
            >
              <h2 className='font-medium text-lg underline underline-offset-4'>Representante</h2>

              <section className='sections-create-student'>
                <div>
                  <p>Nombre Completo del Representante *</p>
                  <input 
                    type="text"
                    name='nombre_completo_representante'
                    value={formData.nombre_completo_representante}
                    autoComplete='off'
                    placeholder='Pacheco Blanco...'
                    className='full-input'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Cédula de Identidad *</p>
                  <input 
                    type="number"
                    name='ci_representante'
                    value={formData.ci_representante}
                    autoComplete='off'
                    placeholder='23838...'
                    className='medium-input'
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <p>Teléfono *</p>
                  <input 
                    type="text"
                    name='telefono'
                    value={formData.telefono}
                    autoComplete='off'
                    placeholder='0424...'
                    className='medium-input'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Dirección</p>
                  <input 
                    type="text"
                    name='direccion'
                    value={formData.direccion}
                    autoComplete='off'
                    placeholder='B.M Pasaje#...'
                    className='medium-input'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Ocupación</p>
                  <input 
                    type="text"
                    name='ocupacion'
                    value={formData.ocupacion}
                    autoComplete='off'
                    placeholder='Comerciante...'
                    className='medium-input'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Correo</p>
                  <input 
                    type="text"
                    name='correo'
                    value={formData.correo}
                    autoComplete='off'
                    placeholder='correo@gmail.com...'
                    className='full-input'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Religión</p>
                  <select
                    value={formData.religion}
                    name='religion'
                    onChange={handleChange}
                    className='select-create-student'
                  >
                    <option value="">Seleccionar</option>
                    <option value="Cristiano">Cristiano</option>
                    <option value="Católico">Católico</option>
                    <option value="Evangélico">Evangélico</option>
                    <option value="Budista">Budista</option>
                    <option value="Islamista">Islamista</option>
                    <option value="No creyente">No creyente</option>
                    <option value="Otro">Otro</option>
                  </select>

                  {/* <input 
                    type="text"
                    name='religion'
                    value={formData.religion}
                    autoComplete='off'
                    placeholder='Cristiano...'
                    className='small-input'
                    onChange={handleChange}
                  /> */}
                </div>

                <div>
                  <p>Numero de Cuenta</p>
                  <input 
                    type="text"
                    name='cuenta_banco'
                    value={formData.cuenta_banco}
                    autoComplete='off'
                    placeholder='0102...'
                    className='full-input'
                    onChange={handleChange}
                  />
                </div>
              </section>
              <h3>Carnet de la Patria</h3>
              <section className='sections-create-student'>
                <div>
                  <p>Código</p>
                  <input 
                    type="number"
                    name='codigo_patria'
                    value={formData.codigo_patria}
                    autoComplete='off'
                    placeholder='00025...'
                    className='medium-input'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Serial</p>
                  <input 
                    type="number"
                    name='serial_patria'
                    value={formData.serial_patria}
                    autoComplete='off'
                    placeholder='0000458...'
                    className='medium-input'
                    onChange={handleChange}
                  />
                </div>
              </section>
              
              <section className='sections-create-student'>
                <div>
                  <p>Comités de la 058</p>
                  <input 
                    type="text"
                    name='comites_058'
                    value={formData.comites_058}
                    autoComplete='off'
                    placeholder='Contraloría...'
                    className='medium-input'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p>Movimiento Bolivariano de Familia</p>
                  <div className='!flex-row mt-2'>
                    <div className='!flex-row'>
                      <input
                        type="radio"
                        id="movimiento_si"
                        name="movimiento_de_familia"
                        value="Si"
                        checked={formData.movimiento_de_familia === "Si"}
                        onChange={handleChange}
                      />
                      <label htmlFor="movimiento_si">Sí</label>
                    </div>
                    <div className='!flex-row'>
                      <input
                        type="radio"
                        id="movimiento_no"
                        name="movimiento_de_familia"
                        value="No"
                        checked={formData.movimiento_de_familia === "No"}
                        onChange={handleChange}
                      />
                      <label htmlFor="movimiento_no">No</label>
                    </div>
                  </div>
                </div>
              </section>

              {missingFields && <p style={{ color: 'red', marginTop: '16px' }}>{missingFields}</p>}
              {studentExist && <p style={{ color: 'red', marginTop: '16px' }}>{studentExist}</p>}

              <div className="container-steps-create-student">
                <button onClick={prevStep} className='back-btn-create-student'>Atras</button>

                <div className="process-create-student-state-line">
                  <div className="left-line bg-2-process"></div>
                  <div className="ball-line bg-2-process"></div>
                  <div className="right-line bg-2-process"></div>
                  <div className="ball-line bg-2-process"></div>
                </div>

                <button type='submit' className='next-btn-create-student'>Guardar</button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div 
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.8 }}
            className="success-std-created">
              <img src="./src/assets/success.jpg" />
              <button onClick={() => {resetFormData(); setCurrentStep(1);}}>Finalizar</button>
            </motion.div>
          )}

        </form>
      </motion.div>
    
  )
}

export default CreateStudent