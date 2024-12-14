import { motion } from 'motion/react';
import Inicio1 from '../../assets/navegaacion-procez/Inicio.png'
import Inicio2 from '../../assets/navegaacion-procez/inicio_2.png'
import Inicio3 from '../../assets/navegaacion-procez/inicio_3.png'
import CrearEstudiante from '../../assets/navegaacion-procez/Crear_estudiante.png'
import ModificarEstudiantes1 from '../../assets/navegaacion-procez/Modificar_estudiantes.png'
import ModificarEstudiantes2 from '../../assets/navegaacion-procez/modificar_estudaintes_2.png'
import ModificarEstudiantes3 from '../../assets/navegaacion-procez/modificar_estudaintes_3.png'
import ModificarEstudiantes4 from '../../assets/navegaacion-procez/modificar_estudiantes_4.png'
import GenerarSabana1 from '../../assets/navegaacion-procez/generar_sabana-1.png'
import GenerarSabana2 from '../../assets/navegaacion-procez/generar_sabana-2.png'
import ImportarExportar from '../../assets/navegaacion-procez/Importar-Exportar.png'


const UserManual = () => {
  return (
    <motion.div 
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.8 }}
    className="w-[90%] h-auto mt-[50px]">
      <h1 className="text-xl font-semibold">Manual de Usuario</h1>

      <main className="mt-8 flex flex-col gap-12">
        <section className='flex flex-col gap-4'>
          <h3 className="font-bold text-lg">¿Qué es Procez?</h3>
          <p>Procez fue desarrollado por tres estudiantes del PNF en Informática de la UPTT-MBI núcleo la Beatriz Trayecto 2: Alexandro Rosales, Kleyderman Caceres y Edixon Angel. Este sistema permitirá a los docentes administrativos crear sabanas estudiantiles con el fin de llevar un control más organizado y accesible de la información.</p>
          <p>Es una aplicación de escritorio desarrollada con el fin de automatizar la gestión de los registros de los estudiantes. Genera archivos PDF altamente personalizados que contienen información detallada de los estudiantes por grado y sección. La aplicación incluye funciones como búsqueda de estudiantes por ID, inicio de sesión seguro con cifrado de contraseña y operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los datos de los estudiantes. Procez, diseñada con énfasis en un diseño fácil de usar y un rendimiento perfecto, garantiza una experiencia intuitiva para los usuarios a la vez que optimiza el consumo de recursos.</p>
        </section>

        <section className='flex flex-col gap-4'>
          <h3 className="font-bold text-lg">Navegación Básica</h3>
          <span className="font-bold">1. Inicio</span>
          <img src={Inicio1} className='border border-black/20' />
          <span className='underline'>Componentes en Tiempo Real</span>
          <img src={Inicio2} className='w-[80%] h-auto my-4' />
          <span className='underline'>Información sobre la institución, creadores y el manual de usuario</span>
          <img src={Inicio3} className='w-[80%] h-auto my-4' />
          <p>📌 <strong>Nota:</strong> Al darle Clic al cualquiera de estos, se abre una ventana para ver la información completa.</p>
        </section>

        <section className='flex flex-col gap-4'>
          <span className="font-bold">2. Crear Estudiante</span>
          <img src={CrearEstudiante} className='border border-black/20 my-4' />
          <p>En este apartado se puede crear un nuevo estudiante, rellenando cada uno de los campos requeridos. Dicho apartado cuenta con un sistema de dos pasos para crear el estudiante.</p>
        </section>

        <section className='flex flex-col gap-4'>
          <span className="font-bold">3. Modificar Estudiantes</span>
          <img src={ModificarEstudiantes1} className='border border-black/20 my-4' />
          <span className='underline'>Barra de búsqueda en Tiempo Real</span>
          <img src={ModificarEstudiantes2} className='w-[60%] h-auto my-4' />
          <p>📌 <strong>Nota:</strong> Para buscar el estudiante debe ingresar la Cedula Estudiantil o la Cedula de Identidad del alumno.</p>
          <p>📌 <strong>Nota:</strong> Para ver toda la información debe darle Clic al estudiante.</p>
          <span className='underline mt-4'>Tabla de Estudiantes</span>
          <img src={ModificarEstudiantes3} className='border border-black/20 my-4' />
          <p>Se muestran los cinco datos más relevantes de cada estudiante, para ver toda la información de un estudiante deberá darle Clic al estudiante para abrir la ventana donde se encuentra la información completa.</p>
          <p>📌 <strong>Nota:</strong> Inicialmente se muestran solo diez estudiantes, para mostrar más estudiantes deberá darle Clic al botón “Cargar más”, el cual va cargando de diez en diez.</p>
          <span className='underline mt-4'>Acciones</span>
          <img src={ModificarEstudiantes4} className='w-[50%] h-auto my-4' />
        </section>

        <section className='flex flex-col gap-4 mb-14'>
          <span className="font-bold">4. Generar Sabana</span>
          <span className='underline'>Para generar una sábana estudiantil debe:</span>
          <p>1. Seleccionar el Grado y la Sección.</p>
          <p>2. Darle Clic al botón de “Generar’, para generar el archivo PDF.</p>
          <img src={GenerarSabana1} className='border border-black/20 my-4' />
          <p>3. Darle Clic al botón de “Descargar", para guardar el archivo PDF en la ruta de su preferencia.</p>
          <img src={GenerarSabana2} className='border border-black/20' />
          <span>5. Importar o Exportar Base de datos</span>
          <img src={ImportarExportar} className='border border-black/20 my-4' />
          <h3 className="font-bold">Para Importar:</h3>
          <ul className='list-disc ml-12'>
            <li>Seleccionar el archivo .db.</li>
            <li>Darle Clic al botón “Importar”.</li>
          </ul>
          <p>Luego de esto, se reiniciará la aplicación con la nueva base de datos ya cargada.</p>
          <h3 className="font-bold">Para Exportar:</h3>
          <ul className='list-disc ml-12'>
            <li>Darle Clic al botón “Exportar”.</li>
            <li>Seleccionar la ruta donde desea guardarla dentro del dispositivo.</li>
          </ul>

          <p className='mt-4'>⚠️ <strong>IMPORTANTE:</strong> Debe exportar la base de datos si desea utilizar la aplicación en otro dispositivo, caso contrario, podría perder la información registrada. Sin embargo, dentro del USB que contiene el instalador de la aplicación se encuentra un base de datos SIN DATOS REGISTRADOS, en caso que ocupe una base de datos limpia.</p>
        </section>
      </main>
    </motion.div>
  )
}

export default UserManual