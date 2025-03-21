import React, { createContext, useContext, useState } from 'react';

const FormDataContext = createContext();

const initialFormData = {
  ce_ci: '',
  nombre_completo_estudiante: '',
  fecha_nacimiento: '',
  edad: '',
  lugar_de_nacimiento: '',
  nombre_completo_representante: '',
  ci_representante: '',
  direccion: '',
  telefono: '',
  ocupacion: '',
  p_kg: '',
  tc: '',
  p: '',
  c: '',
  z: '',
  alergico: '',
  medicamento: '',
  informe_medico: '',
  con_quien_vive: '',
  quien_lo_retira: '',
  codigo_patria: '',
  serial_patria: '',
  correo: '',
  observacion: '',
  comites_058: '',
  movimiento_de_familia: '',
  repitiente: '',
  cuenta_banco: '',
  sexo: '',
  parentesco: '',
  religion: '',
  seccion_id: '',
  grado_id: ''
};

const initialGradeSelected = {id: '', nombre: '',};
const initialSectionSelected = {id: '', nombre: '',};
const initialNewStudent = true;

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [selectedGrade, setSelectedGrade] = useState(initialGradeSelected);
  const [selectedSection, setSelectedSection] = useState(initialSectionSelected);
  const [ isNew, setIsNew ] = useState(initialNewStudent);

  const addToSelectedGrade = (id, nombre) => {
    setSelectedGrade({
      id: id,
      nombre: nombre, 
    });
  }

  const addToSelectedSection = (id, nombre) => {
    setSelectedSection({
      id: id,
      nombre: nombre, 
    });
  }

  const resetFormData = () => {
    setFormData(initialFormData);
    setSelectedGrade(initialGradeSelected);
    setSelectedSection(initialSectionSelected);
    setIsNew(initialNewStudent);
  };

  return (
    <FormDataContext.Provider value={{ formData, setFormData, resetFormData, selectedGrade, setSelectedGrade, addToSelectedGrade, selectedSection ,setSelectedSection, addToSelectedSection, isNew, setIsNew }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  return useContext(FormDataContext);
};