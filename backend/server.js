const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();
let server;

const app = express();

const db = new sqlite3.Database('./db/general_database.db');
const DB_PATH = './db/general_database.db';
const HOME_DATA_DB = process.env.HOME_DB_NAME;

app.use(cors());
app.use(express.json());

// Ruta para manejar el inicio de sesión
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica si el usuario existe en la base de datos
  db.get('SELECT username, password FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Si el usuario no existe, devuelve un error
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Compara la contraseña ingresada con el hash almacenado en la base de datos
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al verificar la contraseña' });
      }

      // Si las contraseñas coinciden
      if (result) {
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    });
  });
});

// Ruta para obtener todos los usuarios (con fines de prueba)
app.get('/api/users', (req, res) => {
  db.all('SELECT username, password FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para obtener grados
app.get('/api/grades', (req, res) => {
  db.all('SELECT * FROM grados', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para obtener secciones
app.get('/api/all_sections', (req, res) => {
  db.all('SELECT * FROM secciones', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para obtener secciones según el grado
app.get('/api/sections', (req, res) => {
  const gradeId = req.query.grade_id;
  db.all('SELECT * FROM secciones WHERE grado_id = ?', [gradeId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para obtener todos los estudiantes
app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM estudiantes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para obtener todos los estudiantes por grados
//http://localhost:5000/api/students?grado_id=2
app.get('/api/students_by_grades', (req, res) => {
  const gradoId = req.query.grado_id; // Obtenemos el parámetro desde la query string

  if (!gradoId) {
    return res.status(400).json({ error: 'El parámetro grado_id es requerido' });
  }

  db.all('SELECT * FROM estudiantes WHERE grado_id = ?', [gradoId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Ruta para obtener todos los estudiantes por secciones
app.get('/api/students_by_sections', (req, res) => {
  const sectionId = req.query.section_id;

  if (!sectionId) {
    return res.status(400).json({ error: 'El parámetro section_id es requerido' });
  }

  db.all('SELECT * FROM estudiantes WHERE seccion_id = ?', [sectionId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Ruta para guardar estudiantes
app.post('/api/students', (req, res) => {
  const { 
    ce_ci, nombre_completo_estudiante, fecha_nacimiento, edad, lugar_de_nacimiento, nombre_completo_representante, ci_representante, direccion, telefono, ocupacion, p_kg, tc, p, c, z, alergico, medicamento, informe_medico, con_quien_vive, quien_lo_retira, codigo_patria, serial_patria, correo, observacion, comites_058, movimiento_de_familia, repitiente, cuenta_banco, sexo, parentesco, religion, seccion_id, grado_id
  } = req.body;

  console.log(req.body)

  db.run('INSERT INTO estudiantes (ce_ci, nombre_completo_estudiante, fecha_nacimiento, edad, lugar_de_nacimiento, nombre_completo_representante, ci_representante, direccion, telefono, ocupacion, p_kg, tc, p, c, z, alergico, medicamento, informe_medico, con_quien_vive, quien_lo_retira, codigo_patria, serial_patria, correo, observacion, comites_058, movimiento_de_familia, repitiente, cuenta_banco, sexo, parentesco, religion, seccion_id, grado_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [ce_ci, nombre_completo_estudiante, fecha_nacimiento, edad, lugar_de_nacimiento, nombre_completo_representante, ci_representante, direccion, telefono, ocupacion, p_kg, tc, p, c, z, alergico, medicamento, informe_medico, con_quien_vive, quien_lo_retira, codigo_patria, serial_patria, correo, observacion, comites_058, movimiento_de_familia, repitiente, cuenta_banco, sexo, parentesco, religion, seccion_id, grado_id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
  
});

// Ruta para obtener todas las ce_ci's
app.get('/api/students/ce_ci', (req, res) => {
  db.all('SELECT ce_ci FROM estudiantes', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para modificar un estudiante
app.put('/api/student_modify/:id', (req, res) => {
  const studentId = req.params.id; // Get the student ID from the URL
  const updates = req.body; // Get the entire body as an object

  // Check if the object has keys
  if (!updates || Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  // Prepare dynamic SQL update statement
  const fields = Object.keys(updates);
  const placeholders = fields.map(field => `${field} = ?`).join(', ');
  const sql = `UPDATE estudiantes SET ${placeholders} WHERE id = ?`;
  const params = [...Object.values(updates), studentId]; // Add the studentId as the last parameter

  // Execute the update
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message }); // Handle error
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Student not found' }); // No rows updated
    }

    res.json({ message: 'Student updated successfully' }); // Success response
  });
  
});

// Ruta para el buscador
// http://localhost:5000/api/search?ce_ci=30737939   FOR EXAMPLE -- Return the object of student.
app.get('/api/search', (req, res) => {
  const { query } = req;
  const ce_ci = query.ce_ci; // Get ce_ci from query parameters

  if (!ce_ci) {
    return res.status(400).json({ error: 'Missing ce_ci parameter' });
  }

  // Add wildcards for LIKE
  const sql = 'SELECT * FROM estudiantes WHERE ce_ci LIKE ?';
  const wildcardCeCi = `%${ce_ci}%`; // Add wildcards for the LIKE query

  db.all(sql, [wildcardCeCi], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Send all matching records or an empty array if none found
  });
});

// Ruta para eliminar estudiante por ce_ci
app.delete('/api/students_delete/:ce_ci', (req, res) => {
  const ce_ci = req.params.ce_ci;

  const sql = 'DELETE FROM estudiantes WHERE ce_ci = ?';
  db.run(sql, [ce_ci], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  });
});


// Ruta para generar sabana por seccion  --> http://localhost:5000/api/generate-pdf/[number]
app.get('/api/generate-pdf/:seccion_id/:grade_name/:section_name', async (req, res) => {
  const { seccion_id, grade_name, section_name } = req.params;

  // Query data from the database filtered by seccion_id
  db.all('SELECT * FROM estudiantes WHERE seccion_id = ? ORDER BY SUBSTR(nombre_completo_estudiante, 1, 1) ASC', [seccion_id], async (err, rows) => {
    if (err) {
      res.status(500).send('Error querying database');
      return;
    }

    // Generate the dynamic HTML template
    const htmlTemplate = generateHtmlTemplate(rows, grade_name, section_name);

    // Use Puppeteer to create a PDF from the HTML
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(htmlTemplate);

      // Generate PDF from the content, setting page orientation to landscape
      const pdfBuffer = await page.pdf({
        width: '1000mm',  // Custom width
        height: '250mm', // Custom height
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm',
        },
      });

      // Close the browser
      await browser.close();

      // Send the generated PDF as a response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=table.pdf');
      res.end(pdfBuffer); // Send the PDF data to the client
    } catch (error) {
      res.status(500).send('Error generating PDF');
    }
  });
});

// Function to generate the dynamic HTML template
const generateHtmlTemplate = (rows, grade, section) => {
  // Mapping de los campos de la base de datos a los nombres para mostrar
  const headerMapping = {
    'numero': 'Nº',
    'ce_ci': 'C.E o C.I',
    'nombre_completo_estudiante': 'Apellidos y Nombres del Estudiante',
    'fecha_nacimiento': 'Fecha de nacimiento',
    'edad': 'Edad',
    'sexo': 'Sexo',
    'lugar_de_nacimiento': 'Lugar de Nacimiento',
    'alergico': 'Alérgico',
    'medicamento': 'Medicamento',
    'informe_medico': 'Informe Médico',
    'con_quien_vive': 'Con Quién Vive',
    'quien_lo_retira': 'Quién lo Retira',
    'parentesco': 'Parentesco',
    'p_kg': 'P.Kg',
    'tc': 'Tc',
    'p': 'P',
    'c': 'C',
    'z': 'Z',
    'repitiente': 'Repitiente',
    'observacion': 'Observación',
    'nombre_completo_representante': 'Apellidos y Nombres del Representante',
    'ci_representante': 'C.I Representante',
    'direccion': 'Dirección',
    'telefono': 'Teléfono',
    'correo': 'Correo',
    'ocupacion': 'Ocupación',
    'codigo_patria': 'Código Patria',
    'serial_patria': 'Serial Patria',
    'cuenta_banco': 'Cuenta Bancaria',
    'comites_058': 'Comités de la 058',
    'movimiento_de_familia': 'Movimiento de Familia',
    'religion': 'Religión'
  };

  // Calcular el ancho de las columnas dinámicamente (esto es opcional si quieres que sea proporcional)
  const totalWidth = 2700; // Ancho en mm (A4 landscape)
  const columnWidth = totalWidth / Object.keys(headerMapping).length; // Dividir el ancho total por el número de columnas

  // Construir las filas de la tabla
  const tableRows = rows.map((row, index) => {
    return `
      <tr>
        <td style="width: auto; text-align: center; white-space: nowrap;">${index + 1}</td> <!-- Contador -->
        ${Object.keys(headerMapping).slice(1).map(dbField => {  // Excluir la columna 'numero'
          const displayName = headerMapping[dbField];
          const cellContent = row[dbField] ? row[dbField] : '';
          return `<td style="width: auto; text-align: center; white-space: nowrap;">${cellContent}</td>`;
        }).join('')}
      </tr>
    `;
  }).join('');

  // Construir el template HTML con los encabezados y las filas dinámicas
  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          table, th, td {
            border: 1px solid #d4d4d4;
          }
          th, td {
            padding: 8px 12px;
            text-align: center;
            font-size: 10px; /* Ajustar el tamaño de la fuente */
            white-space: nowrap; /* Evitar que el texto se ajuste */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          th {
            background-color: #654C4F; /* Color de fondo para los encabezados */
            color: #fff;
          }
          .ctn {
            position: relative;
            display: flex;
          }
          @media print {
            tr { page-break-inside: avoid; }
            table { page-break-after: always; }
          }
        </style>
      </head>
      <body>
        <div style="display: flex; gap: 50px; margin-left: 30px">
          <div class="ctn">
            <p style="width: auto; height: 40px" position: absolute; bottom: 0;>Grado:</p>
            <div style="width: 200px; height: 40px; border: none; border-bottom-width: 1px; margin-left: 8px; border-bottom-style: solid; border-bottom-color: #d4d4d4;"><p style="padding-bottom: -10px; margin-left: 8px; color: #646464;">${grade}</p></div>
          </div>
          
          <div class="ctn">
            <p style="width: auto; height: 40px" position: absolute; bottom: 0;>Sección:</p>
            <div style="width: 200px; height: 40px; border: none; border-bottom-width: 1px; margin-left: 8px; border-bottom-style: solid; border-bottom-color: #d4d4d4;"><p style="padding-bottom: -10px; margin-left: 8px; color: #646464;">${section}</p></div>
          </div>
          
          <div class="ctn">
            <p style="width: auto; height: 40px" position: absolute; bottom: 0;>Periodo Escolar:</p>
            <div style="width: 200px; height: 40px; border: none; border-bottom-width: 1px; margin-left: 8px; border-bottom-style: solid; border-bottom-color: #d4d4d4;"><p style="padding-bottom: -10px; margin-left: 8px; color: #646464;">${`${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`}</p></div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width: auto;">Nº</th>
              ${Object.values(headerMapping).slice(1).map(displayName => `<th style="width: auto;">${displayName}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
    </html>
  `;
};

// Ruta para Exportar base de datos
app.get('/api/export-db', (req, res) => {
  res.download(DB_PATH, 'general_database.db', (err) => {
    if (err) {
      console.error('Error al exportar la base de datos:', err);
      res.status(500).send('Error al exportar la base de datos');
    }
  });
});

// Ruta para Importar base de datos

const upload = multer({ dest: 'uploads/' });

app.post('/api/import-db', upload.single('general_database'), (req, res) => {
  const uploadedFile = req.file;
  const newDbPath = path.join(__dirname, 'db', 'general_database.db');
  const triggerFilePath = path.join(__dirname, 'reload.trigger'); // Archivo ficticio

  if (!uploadedFile) {
    return res.status(400).send('No se subió ningún archivo.');
  }

  fs.copyFile(uploadedFile.path, newDbPath, (err) => {
    if (err) {
      console.error('Error al importar la base de datos:', err);
      return res.status(500).send('Error al importar la base de datos');
    }

    fs.unlink(uploadedFile.path, (unlinkErr) => {
      if (unlinkErr) console.error('Error al eliminar archivo temporal:', unlinkErr);
    });

    console.log('Base de datos importada exitosamente. Reiniciando la aplicación...');

    // Crear o actualizar un archivo ficticio para disparar reinicio en nodemon
    fs.writeFileSync(triggerFilePath, `${Date.now()}`, 'utf8');

    res.send('Base de datos importada exitosamente. Reiniciando el servidor...');
    process.exit(0); // Termina el proceso
  });
});

// Ruta para pedir la cantidad de alumnos enfermos
app.get('/api/alumnos-enfermos', (req, res) => {
  db.get('SELECT COUNT(*) AS count FROM estudiantes WHERE LOWER(medicamento) != "no" AND LOWER(medicamento) != ""', [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ count: row.count });
  });
});

// Ruta para pedir la cantidad de alumnos por sexo
app.get('/api/sexo', (req, res) => {
  db.get('SELECT COUNT(*) AS Masculino FROM estudiantes WHERE LOWER(sexo) = "m"', [], (errM, rowM) => {
    if (errM) {
      return res.status(500).json({ error: errM.message });
    }

    db.get('SELECT COUNT(*) AS Femenino FROM estudiantes WHERE LOWER(sexo) = "f"', [], (errF, rowF) => {
      if (errF) {
        return res.status(500).json({ error: errF.message });
      }

      const result = {
        Masculino: rowM?.Masculino?.toString() || "0",
        Femenino: rowF?.Femenino?.toString() || "0",
      };

      res.json(result);
    });
  });
});



// Ruta para obtener datos de home_data
app.get('/api/home-data', (req, res) => {
  db.all(`SELECT * FROM ${HOME_DATA_DB}`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Ruta para cambiar datos de home_data
/* 

ID: 1 = cantidad de sabanas generadas
ID: 2 = valor ultimo registro de estudiante 
Ejemplo de request: 
/api/intercambiar
Method: POST
{
  valor: "12",
  id: "1"
}

*/
app.post('/api/intercambiar', (req, res) => {
  const { valor, id } = req.body;

  if (!valor || !id) {
    return res.status(400).json({ error: 'Se requieren "valor" e "id"' });
  }

  db.run(`UPDATE ${HOME_DATA_DB} SET value = ? WHERE id = ?`, [valor, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).end();
  });
});


const PORT = process.env.PORT || 5000;
server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
