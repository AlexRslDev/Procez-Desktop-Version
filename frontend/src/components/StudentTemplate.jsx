import { obj } from "../Data/estudiantes_obj";

const StudentTemplate = ({ student, grades, sections }) => {

  const handle = (value, option) => {
    let newObj;

    if (option === 1) {
      newObj = grades.find((item) => item.id === value)
    } else if (option === 2) {
      newObj = sections.find((item) => item.id === value)
    }

    return newObj.nombre;
  }

  return (
    <div>
      <section className='w-auto h-auto flex flex-wrap gap-8 my-8'>
        {obj.map((item, index) => (
          <div key={`${item.name}-${index}`} className='flex flex-col gap-3'>
            <span>{item.name}</span>
            <div
              className='w-auto h-9 px-4 flex items-center border border-black/15 rounded-md bg-teal-100 text-gray-600'
            >
              {item.value === 'grado_id' ? handle(student[item.value], 1) : item.value === 'seccion_id' ? handle(student[item.value], 2) : student[item.value]}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default StudentTemplate
