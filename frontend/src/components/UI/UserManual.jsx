import { motion } from 'motion/react';
import Inicio1 from '/Procez_Manual/inicio.webp'
import Inicio2 from '/Procez_Manual/inicio_componentes.webp'
import Inicio3 from '/Procez_Manual/inicio_informacion.webp'
import CrearEstudiante from '/Procez_Manual/crear_estudiante.webp'
import CrearEstudiante2 from '/Procez_Manual/crear_estudiante_pasos.webp'
import CrearEstudiante3 from '/Procez_Manual/crear_estudiante_representante.webp'
import ModificarEstudiantes1 from '/Procez_Manual/modificar_estudiante.webp'
import ModificarEstudiantes2 from '/Procez_Manual/modificar_estudiante_barra.webp'
import ModificarEstudiantes3 from '/Procez_Manual/modificar_estudiante_tabla.webp'
import ModificarEstudiantes4 from '/Procez_Manual/modificar_estudiante_botones.webp'
import GenerarSabana1 from '/Procez_Manual/generar_sabana_1.webp'
import GenerarSabana2 from '/Procez_Manual/generar_sabana_2.webp'
import ImportarExportar from '/Procez_Manual/importar_exportar.webp'


const UserManual = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-[90%] h-auto mt-[50px]"
    >
      <h1 className="text-xl font-semibold">Manual de Usuario</h1>

      <section className="mt-8 mb-20 flex flex-col gap-8">
        <h3 className="font-bold text-lg">Tabla de contenidos</h3>

        <div className='grid grid-cols-3 grid-rows-2 gap-x-4 gap-y-8'>
          <a href='#que-es-procez' className='bg-[#f9f9f9] flex items-center py-4 border-b-4 border-indigo-300 hover:border-indigo-600 transition-all rounded-md cursor-pointer'>
            <span className='mx-4 font-bold text-3xl'>01</span>
            ¿Qué es Procez?
          </a>

          <a href='#inicio' className='bg-[#f9f9f9] flex items-center py-4 border-b-4 border-indigo-300 hover:border-indigo-600 transition-all rounded-md cursor-pointer'>
            <span className='mx-4 font-bold text-3xl'>02</span>
            Inicio
          </a>

          <a href='#crear_estudiante' className='bg-[#f9f9f9] flex items-center py-4 border-b-4 border-indigo-300 hover:border-indigo-600 transition-all rounded-md cursor-pointer'>
            <span className='mx-4 font-bold text-3xl'>03</span>
            Crear Estudiante
          </a>

          <a href='#modificar_estudiante' className='bg-[#f9f9f9] flex items-center py-4 border-b-4 border-indigo-300 hover:border-indigo-600 transition-all rounded-md cursor-pointer'>
            <span className='mx-4 font-bold text-3xl'>04</span>
            Modificar Estudiante
          </a>

          <a href='#generar_sabana' className='bg-[#f9f9f9] flex items-center py-4 border-b-4 border-indigo-300 hover:border-indigo-600 transition-all rounded-md cursor-pointer'>
            <span className='mx-4 font-bold text-3xl'>05</span>
            Generar Sábana
          </a>

          <a href='#importar_exportar' className='bg-[#f9f9f9] flex items-center py-4 border-b-4 border-indigo-300 hover:border-indigo-600 transition-all rounded-md cursor-pointer'>
            <span className='mx-4 font-bold text-3xl'>06</span>
            Importar o Exportar Base de Datos
          </a>
        </div>
      </section>

      <main className="mt-8 flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <h3 className="font-bold text-lg" id='que-es-procez'>¿Qué es Procez?</h3>
          <p>
            Procez es una aplicación de escritorio desarrollada por tres estudiantes del PNF en Informática de la UPTTMBI núcleo La Beatriz: Alexandro Rosales, Kleyderman Caceres y Edixon Angel. Su objetivo es automatizar la gestión de registros estudiantiles, permitiendo al personal administrativo generar archivos PDF personalizados con información detallada de los estudiantes por grado y sección, conocidos como "Sábanas Estudiantiles".
          </p>
          <p>
            La aplicación ofrece una interfaz intuitiva y un rendimiento eficiente, facilitando al personal administrativo un control más organizado, estandarizado y accesible de la información estudiantil.
          </p>
        </section>

        <h2 className='font-bold text-lg'>Navegación Básica</h2>

        <section className="flex flex-col gap-4">
          <h3 className="font-bold text-lg" id='inicio'>Inicio</h3>
          <p>
            En esta sección puede consultar datos en tiempo real, información sobre los creadores del sistema, acceder directamente al manual de usuario y ver detalles sobre la institución.
          </p>
          <img src={Inicio1} className="border border-black/20" />
          <span className="underline">Componentes en Tiempo Real</span>
          <ol className="list-decimal ml-4">
            <li>
              <span className="font-bold">Estudiantes Registrados:</span> Muestra la cantidad total de alumnos registrados.
            </li>
            <li>
              <span className="font-bold">Sábanas Generadas:</span> Indica el número de sábanas generadas desde la instalación de la base de datos actual.
            </li>
            <li>
              <span className="font-bold">Alumnos con Enfermedades:</span> Cantidad de alumnos que presentan alguna condición médica registrada en la casilla "Medicamento".
            </li>
            <li>
              <span className="font-bold">Alumnos:</span> Total de alumnos masculinos registrados.
            </li>
            <li>
              <span className="font-bold">Alumnas:</span> Total de alumnas femeninas registradas.
            </li>
            <li>
              <span className="font-bold">Último Alumno Registrado:</span> Muestra el último alumno añadido al sistema.
            </li>
          </ol>
          <img src={Inicio2} className="w-[80%] h-auto my-4" />
          <span className="underline">
            Información sobre la institución, creadores y el manual de usuario
          </span>
          <ol className="list-decimal ml-4">
            <li>
              <span className="font-bold">Creadores:</span> Presenta información sobre los desarrolladores de Procez.
            </li>
            <li>
              <span className="font-bold">Manual de usuario:</span> Acceso directo a esta sección del manual.
            </li>
            <li>
              <span className="font-bold">Escuela Ciudad Valera:</span> Información detallada sobre la institución, incluyendo imágenes.
            </li>
          </ol>
          <img src={Inicio3} className="w-[80%] h-auto my-4" />
          <p>
            📌 <strong>Nota:</strong> Al hacer clic en cualquiera de estos apartados, se abrirá una ventana con la información completa.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-bold text-lg" id='crear_estudiante'>Crear Estudiante</h3>
          <p>
            En esta sección puede registrar un nuevo estudiante completando los campos requeridos con los datos tanto del alumno como de su representante.
          </p>
          <span className="underline">1. Estudiante</span>
          <p>En este apartado se ingresan los datos específicos del estudiante.</p>
          <img src={CrearEstudiante} className="border border-black/20 my-4" />
          <img src={CrearEstudiante2} className="border border-black/20 my-4" />
          <span className="underline">2. Representante</span>
          <p>En este apartado se ingresan únicamente los datos del representante.</p>
          <img src={CrearEstudiante3} className="border border-black/20 my-4" />
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-bold text-lg" id='modificar_estudiante'>Modificar Estudiante</h3>
          <p>
            En esta sección puede buscar estudiantes mediante la barra de búsqueda por CE o CI, así como por filtros de sección y grado. También puede consultar la información completa de cada estudiante y editar o eliminar registros fácilmente.
          </p>
          <img src={ModificarEstudiantes1} className="border border-black/20 my-4" />
          <span className="underline">Barra de búsqueda en tiempo real</span>
          <img src={ModificarEstudiantes2} className="w-[60%] h-auto my-4" />
          <p>
            📌 <strong>Nota:</strong> Para buscar un estudiante, ingrese la Cédula Estudiantil o la Cédula de Identidad del alumno.
          </p>
          <p>
            📌 <strong>Nota:</strong> Para ver toda la información, haga clic sobre el estudiante.
          </p>
          <span className="underline mt-4">Tabla de Estudiantes</span>
          <img src={ModificarEstudiantes3} className="border border-black/20 my-4" />
          <p>
            Se muestran los cinco datos más relevantes de cada estudiante. Para ver la información completa, haga clic sobre el estudiante para abrir la ventana de información detallada.
          </p>
          <p>
            📌 <strong>Nota:</strong> Inicialmente se muestran solo diez estudiantes. Para ver más, haga clic en el botón “Cargar más”, que irá mostrando estudiantes de diez en diez para no saturar el sistema.
          </p>
          <span className="underline mt-4">Acciones</span>
          <img src={ModificarEstudiantes4} className="w-[50%] h-auto my-4" />
        </section>

        <section className="flex flex-col gap-4 mb-4">
          <h3 className="font-bold text-lg" id='generar_sabana'>Generar Sábana</h3>
          <span className="underline">Para generar una sábana estudiantil:</span>
          <p>1. Seleccione el grado y la sección.</p>
          <p>2. Haga clic en el botón “Generar” para crear el archivo PDF.</p>
          <img src={GenerarSabana1} className="border border-black/20 my-4" />
          <p>3. Haga clic en el botón “Descargar” para guardar el archivo PDF en la ubicación que prefiera con el nombre que desee.</p>
          <img src={GenerarSabana2} className="border border-black/20" />
        </section>

        <section className="flex flex-col gap-4 mb-14">
          <h3 className="font-bold text-lg" id='importar_exportar'>Importar o Exportar Base de Datos</h3>
          <img src={ImportarExportar} className="border border-black/20 my-4" />
          <h3 className="font-bold">Para importar:</h3>
          <ol className="list-decimal ml-12">
            <li>Seleccione el archivo <strong>general_database.db</strong>.</li>
            <li>Haga clic en el botón “Importar”.</li>
          </ol>
          <p>
            Después de esto, la aplicación se reiniciará con la nueva base de datos cargada.
          </p>

          <p className="mt-4">
            ⚠️ <strong>IMPORTANTE:</strong> Al importar una base datos es de <strong>SUMA IMPORTANCIA</strong> que el nombre de la misma sea "general_database", caso contrario podría generar algún error.
          </p>

          <h3 className="font-bold">Para exportar:</h3>
          <ol className="list-decimal ml-12">
            <li>Haga clic en el botón “Exportar”.</li>
            <li>Elija la ubicación donde desea guardar la base de datos en su dispositivo.</li>
          </ol>

          <p className="mt-4">
            ⚠️ <strong>IMPORTANTE:</strong> Exporte la base de datos si desea utilizar la aplicación en otro dispositivo. De lo contrario, podría perder la información registrada. Recuerde que en el USB que contiene el instalador de la aplicación se incluye una base de datos vacía, en caso de que necesite comenzar con datos limpios.
          </p>

          <p className="mt-4">
            🔔 <strong>Recomendación:</strong> Le recomendamos que tenga un respaldo de la base de datos en el USB de instalación de Procez.
          </p>
        </section>
      </main>
    </motion.div>
  )
}

export default UserManual
