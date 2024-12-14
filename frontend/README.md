## Start Backend
npx nodemon

## Start Frontend
To Run Fronted: npm run dev

## About restart DB
### Reiniciar el contador de AUTOINCREMENT:

##### Elimina los registros de la tabla (si no los necesitas):
DELETE FROM estudiantes;

##### Restablecer el contador de IDs:
DELETE FROM sqlite_sequence WHERE name='estudiantes';