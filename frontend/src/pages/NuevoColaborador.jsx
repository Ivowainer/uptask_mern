import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormularioColaborar from "../components/FormularioColaborar"
import useProyectos from '../hooks/useProyectos'

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargando, colaborador } = useProyectos()

  const params = useParams()

  useEffect(() => { 
    obtenerProyecto(params.id)
  }, [])

  console.log(colaborador)
  
  return (
    <>
      <h1 className="text-3xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborar />
      </div>

      {cargando ? <p className="text-center">Cargando...</p> : colaborador?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 text-1xl font-bold">Resultado:</h2>

            <div className="flex justify-between items-center">
              <p>{colaborador?.nombre}</p>

              <button type='button' className='bg-slate-500 px-5 py-2 rounded-lg uppercase font-bold text-sm text-white'>Agregar al proyecto</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NuevoColaborador