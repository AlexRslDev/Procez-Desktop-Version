import React, { useState, useEffect } from 'react';

const SearchStudent = ({dialog}) => {
  const [ceCi, setCeCi] = useState('');
  const [students, setStudents] = useState([]); // Change to array for multiple results
  const [error, setError] = useState('');

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Search function
  const handleSearch = async (value) => {
    if (value.trim() === '') {
      setStudents([]); // Reset students
      setError('');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/search?ce_ci=${value}`);
      const text = await response.text(); // Get raw response

      if (!response.ok) {
        throw new Error(text); // Use the raw response for error
      }

      const data = JSON.parse(text); // Parse only if we expect JSON
      setStudents(data); // Set students to the fetched data
      setError('');
    } catch (err) {
      console.error('Error fetching students:', err); // Log error for debugging
      setError(err.message);
      setStudents([]); // Reset students on error
    }
  };

  // Debounced search
  const debouncedSearch = debounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch(ceCi);
  }, [ceCi]);

  return (
    <div className="relative inline-block min-w-[470px] min-h-[50px]">
      <div>
        <input
          type="text"
          value={ceCi}
          onChange={(e) => setCeCi(e.target.value)}
          placeholder="Ingrese el CE o CI del estudiante"
          className='w-full h-12 border border-black border-opacity-30 rounded-full bg-transparent pl-[65px] pr-4 py-2'
        />
        <div
          className="absolute left-8 top-6 transform -translate-y-1/2 w-5 h-5 opacity-50"
          style={{
            backgroundImage: "url('./src/assets/magnifying-glass-solid.svg')",
            backgroundSize: '20px 20px',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
      {error && <p>{error}</p>}
      <div className='w-full absolute mt-1 bg-white rounded-lg shadow-active'>
        {students.length > 0 && ( // Check if there are students
          <>
            {students.slice(0, 5).map((student) => ( // Map through the students
              <div key={student.ce_ci} className='flex content-center gap-4 p-4 rounded-lg cursor-pointer transition-all hover:bg-gray-100' onClick={() => {dialog(student, 'info'), setCeCi('')}}>
                <p className='font-medium'>{student.nombre_completo_estudiante}</p>
                <p>CE-CI: {student.ce_ci}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchStudent;
