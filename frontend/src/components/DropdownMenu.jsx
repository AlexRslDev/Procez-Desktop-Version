import { useState } from "react";
import { motion } from "motion/react";

function DropdownMenu({ fetchStudents, grades, sections }) {
  const [menuState, setMenuState] = useState({
    isOpen: false,
    isGradesOpen: false,
    isSectionsOpen: false,
    isDirectGradesOpen: false,
  });
  const [selectedSectionGrade, setSelectedSectionGrade] = useState(null);

  const toggleDropdown = () => {
    setMenuState({
      isOpen: !menuState.isOpen,
      isGradesOpen: false,
      isSectionsOpen: false,
      isDirectGradesOpen: false,
    });
  };

  const closeAllMenus = (order, value = false) => {
    if (order === 'Grades') {
      fetchStudents('Grades', value && value);
    } else if (order === 'Sections') {
      fetchStudents('Sections', value && value);
    } else if (order === 'Initial') {
      fetchStudents('Initial');
    }

    setMenuState({
      isOpen: false,
      isGradesOpen: false,
      isSectionsOpen: false,
      isDirectGradesOpen: false,
    });
  };

  const openGradesMenu = () => {
    setMenuState({
      ...menuState,
      isGradesOpen: true,
      isSectionsOpen: false,
      isDirectGradesOpen: false,
    });
  };

  const openSectionsMenu = (value) => {
    setSelectedSectionGrade(value);
    setMenuState({
      ...menuState,
      isGradesOpen: false,
      isSectionsOpen: true,
      isDirectGradesOpen: false,
    });
  };

  const openDirectGradesMenu = () => {
    setMenuState({
      ...menuState,
      isGradesOpen: false,
      isSectionsOpen: false,
      isDirectGradesOpen: true,
    });
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-500"
      >
        Filtrar
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.586l3.71-4.357a.75.75 0 111.14.976l-4 4.5a.75.75 0 01-1.08 0l-4-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {menuState.isOpen && (
        <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration:0.2 }}
        className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-blue-600 text-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-2">
            {/* Opción para seleccionar el estado inicial */}
            <div
              className="block px-4 py-2 text-sm text-white cursor-pointer transition-all hover:bg-blue-500"
              onClick={() => closeAllMenus('Initial')}
            >
              Estado Inicial
            </div>
            
            {/* Opción para seleccionar grados directamente */}
            <div
              className="block px-4 py-2 text-sm text-white cursor-pointer transition-all hover:bg-blue-500"
              onClick={openDirectGradesMenu}
            >
              Grados
            </div>

            {/* Opción Sección */}
            <div
              className="block px-4 py-2 text-sm text-white cursor-pointer transition-all hover:bg-blue-500"
              onClick={openGradesMenu}
            >
              Sección
            </div>

            {/* Submenú para seleccionar grados directamente */}
            {menuState.isDirectGradesOpen && (
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 my-2 px-4">
                <span className="font-semibold">Seleccione el grado</span>
                <ul>
                  { grades && grades.map((grade, index) => (
                    <motion.li
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.15 }}
                      className="cursor-pointer py-1 hover:text-blue-300"
                      onClick={() => closeAllMenus('Grades', grade.id)}
                      key={index}
                    >
                      {grade.nombre}
                    </motion.li>
                  )) }

                </ul>
              </motion.div>
            )}

            {/* Submenú de Grados dentro de Sección */}
            {menuState.isGradesOpen && (
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 my-2 px-4">
                <span className="font-semibold">Seleccione el grado</span>
                <ul>
                  { grades && grades.map((grade, index) => (
                    <motion.li
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.15 }}
                      className="cursor-pointer py-1 hover:text-blue-300"
                      onClick={() => openSectionsMenu(grade.id)}
                      key={index}
                    >
                      {grade.nombre}
                    </motion.li>
                  )) }
                </ul>
              </motion.div>
            )}

            {/* Submenú de Secciones */}
            {menuState.isSectionsOpen && (
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 my-2 px-4">
                <span className="font-semibold">Seleccione la sección</span>
                <ul>
                  { selectedSectionGrade && sections.filter(item => item.grado_id === selectedSectionGrade).map((section, index) => (
                    <motion.li
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.15 }}
                    className="cursor-pointer py-1 hover:text-blue-300"
                    onClick={() => closeAllMenus('Sections', section.id)}
                    key={index}
                    >
                      {section.nombre}
                    </motion.li>
                  )) }
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default DropdownMenu;




/*
  <button className='hidden w-24 h-10 items-center justify-center gap-2 border-none rounded-lg  text-white cursor-pointer transition-all'>
    <img src="./src/assets/filter-solid.svg" className='w-auto h-4' />
    Filtrar
  </button>
*/