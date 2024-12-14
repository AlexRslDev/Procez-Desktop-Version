const SectionChild = ({ enableInputs=false, label, value }) => {

  const handleInputWidth = (name) => {
    switch (name) {
      case 'Sección':
      case 'Día':
      case 'Mes':
      case 'Año':
      case 'Edad':
      case 'Alérgico':
      case 'Medicamento':
      case 'Informe Médico':
      case 'Peso (kg)':
      case 'Talla Cuello':
      case 'Pantalón':
      case 'Camisa':
      case 'Zapato':
      
        return 'w-small-input';
      
      case 'Nombre Completo del Estudiante':
      case 'Observación':
      case 'Nombre Completo del Representante':
      case 'Dirección':
      case 'Correo':
      case 'Teléfono':

        return 'w-full-input';
      
      case 'CI o CE':
      case 'Con quién vive':
      case 'Quién lo retira':
      case 'CI del Representante':
      case 'Ocupación':
      case 'Código':
      case 'Serial':
      case 'Movimiento Bolivariano de Familia':
      case 'Comités de la 058':

        return 'w-medium-input'
      
      case 'Grado':
      case 'Lugar de nacimiento':
      case 'Parentesco':
      case 'Religion':

        return 'w-semi-medium-input'
        
      case 'Vacunas':

        return 'w-max-full-input'

      default:
        break;
    }
  }
  
  return (
    <div className='w-auto flex flex-col items-center justify-center gap-4'>
      <label>{label}</label>
  
      <input 
      disabled={!enableInputs} type="text" 
      value={value} 
      className={!enableInputs ? `${handleInputWidth(label)} h-10 px-3 py-0 flex items-center justify-center bg-[#F4F3FF] text-black-50 border rounded-lg` : `${handleInputWidth(label)} h-10 px-3 py-0 flex items-center justify-center bg-[#F4F3FF] text-black border rounded-lg`} 
      />
    </div>
  )
}

export default SectionChild