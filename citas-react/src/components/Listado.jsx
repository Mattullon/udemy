import Paciente from "./Paciente"

const Listado = () => {
  return (
    <div className="md:w-1/2 lg:w-3/5">
        <h2 className="font-black text-center text-3xl mt-5">Listado Pacientes</h2> 
        <p className="text-xl mt-5 mb-10 text-center"> Administra tus{''} 
            <span className="text-indigo-600 font-bold">
                Pacientes y citas 
            </span>
        </p>
        <Paciente/>
        <Paciente/>
        <Paciente/>
    </div>
  )
}

export default Listado