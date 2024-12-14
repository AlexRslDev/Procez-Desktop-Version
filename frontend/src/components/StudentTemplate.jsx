import SectionChild from './SectionChild'

const StudentTemplate = ({ student, grades, sections }) => {

  const handleGradeSection = (elements, item) => {
    return elements.filter(element => element.id === item).map(element => element.nombre).join(', ');
  }

  return (
    <div>
      <section className='w-auto h-auto flex flex-wrap gap-8 mt-8'>
        <SectionChild label='Grado' value={handleGradeSection(grades, student.grado_id)}/>
        <SectionChild label='Seccion' value={handleGradeSection(sections, student.seccion_id)}/>
        <SectionChild label='CI o CE' value={student.ce_ci}/>
        <SectionChild label='Nombre Completo' value={student.nombre_completo_estudiante}/>
        <SectionChild label='Dia' value={student.d}/>
        <SectionChild label='Mes' value={student.m}/>
        <SectionChild label='Año' value={student.a}/>
        <SectionChild label='Edad' value={student.edad}/>
        <SectionChild label='Lugar de nacimiento' value={student.lugar_de_nacimiento}/>
        <SectionChild label='Con quien vive' value={student.con_quien_vive}/>
        <SectionChild label='Quien lo retira' value={student.quien_lo_retira}/>
        <SectionChild label='Alergico' value={student.alergico}/>
        <SectionChild label='Medicamento' value={student.medicamento}/>
        <SectionChild label='Informe Medico' value={student.informe_medico}/>
        <SectionChild label='Vacunas' value={`Dosis - 1: ${student.primera_dosis}.  Dosis - 2: ${student.segunda_dosis}.  Dosis - 3: ${student.tercera_dosis}.`}/>
        <SectionChild label='P.kg' value={student.p_kg}/>
        <SectionChild label='Tc' value={student.tc}/>
        <SectionChild label='P' value={student.p}/>
        <SectionChild label='C' value={student.c}/>
        <SectionChild label='Z' value={student.z}/>
        <SectionChild label='Obsevacion' value={student.observacion}/>
        <SectionChild label='Nombre Completo del Representante' value={student.nombre_completo_representante}/>
        <SectionChild label='CI del Representante' value={student.ci_representante}/>
        <SectionChild label='Parentesco' value={student.parentesco}/>
        <SectionChild label='Telefono' value={student.telefono}/>
        <SectionChild label='Direccion' value={student.direccion}/>
        <SectionChild label='Ocupacion' value={student.ocupacion}/>
        <SectionChild label='Correo' value={student.correo}/>
        <SectionChild label='Religion' value={student.religion}/>
        <SectionChild label='Codigo' value={student.codigo_patria}/>
        <SectionChild label='Serial' value={student.serial_patria}/>
        <SectionChild label='Comites de la 058' value={student.comites_058}/>
        <SectionChild label='Movimiento Bolivariano de Familia' value={student.movimiento_de_familia}/>
      </section>
    </div>
  )
}

export default StudentTemplate