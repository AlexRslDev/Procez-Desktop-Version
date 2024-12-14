import { useState } from "react";
import { motion } from 'motion/react';

function ImportExportDatabase() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectMessage, setSelectMessage] = useState('');
  
  const handleExport = () => {
    window.location.href = 'http://localhost:5000/api/export-db';
  };

  const handleFileChange = (event) => {
    const fileReq = event.target.files[0];
    setFile(fileReq);
    setFileName(fileReq.name);
  };

  const handleDivClick = () => {
    document.getElementById('custom-file-input').click();
  };

  const handleImport = async () => {
    if (!file) {setSelectMessage('Selecciona un Archivo.'); return;};
    
    const formData = new FormData();
    formData.append('general_database', file);

    try {
      const response = await fetch('http://localhost:5000/api/import-db', {
        method: 'POST',
        body: formData,
      });

      setSelectMessage('');
      setFile(null);
      window.location.reload();
    } catch (error) {
      console.error('Error al importar la base de datos:', error);
      alert('Error al importar la base de datos');
    }
  };

  return (
    <motion.div 
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ duration:0.8 }}
    className="w-[90%] h-auto mt-[50px]">
      <h1 className="font-semibold text-xl">Importar o Exportar Base de Datos</h1>
      <div className="flex gap-14 mt-8">
        <div className="flex flex-col gap-4">
          <h3>Importar Base de Datos</h3>
          <div>
            <input type="file" id="custom-file-input" accept=".db" onChange={handleFileChange} className="hidden" />
            <div 
              className="w-80 h-[50px] flex items-center pl-3 gap-4 bg-[#683EC0] rounded-lg text-white cursor-pointer"
              onClick={handleDivClick}
            >
              <div className="w-auto h-[25px] px-2 flex items-center bg-white rounded-lg text-sm text-black">
                {fileName ? 'Seleccionado' : 'Seleccionar'}
              </div>
              <span className="text-sm">{fileName ? fileName : 'Click para selecionar'}</span>
            </div>
            <span className="flex w-auto h-6">{selectMessage && <p className="text-red-700">{selectMessage}</p>}</span>
          </div>
          <div>
            <button onClick={handleImport} className="w-auto h-[50px] bg-transparent border border-black px-8 rounded-lg transition-all hover:bg-slate-100">Importar</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3>Exportar Base de Datos</h3>
          <div>
           <button onClick={handleExport} className="w-auto h-[50px] bg-[#683EC0] font-semibold text-white px-8 rounded-lg">Exportar</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ImportExportDatabase