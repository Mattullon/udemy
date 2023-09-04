import { useEffect, useState } from "react";
import SearchAppBar from "../components/Appbar"; // Asegúrate de tener la ruta correcta a tu componente
import { enviarMensaje } from "../service/WhatsappApi";

const randomDoctors = ["Dr. Elias Villalba", "Dra. Veronica Narvaez", "Dra. Barbara Villalba","Dra. Clara Villalba"];
const tipoConsulta = ["Extraccion","Ortodoncia","Odontopediatria(niños)"
,"Blanqueamiento Dental","Prótesis Dental",
"Carillas Dentales","Profilaxis (Limpieza Dental)","Tratamiento de Conducto (Endodoncia)"]
const Odonto = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedConsultor, setSelectedConsultor] = useState("");
  const [yourName, setYourName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [description, setDescription] = useState("");
  const [isReserved, setIsReserved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
 

  const handleReservation = () => {
    if (
      selectedDoctor &&
      yourName &&
      phoneNumber &&
      selectedDate &&
      selectedTime
    ) {
      setIsReserved(true);
      setMessageSent(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (messageSent) {
      enviarMensaje(
        `${phoneNumber}`,
`Hola ${yourName},

Te informamos que tu reserva con ${selectedDoctor} para el ${selectedDate} a las ${selectedTime} hs ha sido exitosamente agendada.
        
Te mantendremos al tanto de cualquier novedad a través de este canal.
        
¡Saludos!`
      );
    }
  }, [messageSent]);

  return (
    <div className={`h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <SearchAppBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="flex justify-center items-center mt-16">
        <div
          className={`bg-white p-8 pb-6 rounded-lg shadow-md w-96 ${
            isDarkMode ? "bg-gray-800 text-white" : ""
          }`}
        >
          <h2
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : ""
            }`}
          >
          Alteza Odontologia
          </h2>
         
          <div className="mb-4">
            <label htmlFor="yourName" className="block font-medium mb-1">
              Nombre y Apellido:
            </label>
            <input
              type="text"
              id="yourName"
              placeholder="Escribe aqui..."
              className="w-full border rounded-md p-2"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium mb-1">
              WhatsApp:
            </label>
            <input
              type="text"
              placeholder="(0983) xxx xxx"
              id="phoneNumber"
              className="w-full border rounded-md p-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="doctor" className="block font-medium mb-1">
              Selecciona un doctor:
            </label>
            <select
              id="doctor"
              className="w-full border rounded-md p-2"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Selecciona un doctor</option>
              {randomDoctors.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="doctor" className="block font-medium mb-1">
              Motivo de Consulta:
            </label>
            <select
              id="doctor"
              className="w-full border rounded-md p-2"
              value={selectedConsultor}
              onChange={(e) => setSelectedConsultor(e.target.value)}
            >
              <option value="">Selecciona consulta</option>
              {tipoConsulta.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 flex">
  <div className="mr-4">
    <label htmlFor="selectedDate" className="block font-medium mb-1">
      Fecha:
    </label>
    <input
      type="date"
      id="selectedDate"
      className="w-full border rounded-md p-2"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
  </div>
  
  <div>
    <label htmlFor="selectedTime" className="block font-medium mb-1">
      Hora:
    </label>
    <select
      id="selectedTime"
      className="w-full border rounded-md p-2"
      value={selectedTime}
      onChange={(e) => setSelectedTime(e.target.value)}
    >
      <option value="">Selecciona una hora</option>
      {Array.from({ length: 12 }, (_, index) => (
        <option key={index} value={`${index + 12}:00`}>
          {`${index + 12}:00`}
        </option>
      ))}
    </select>
  </div>
</div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">
              Descripción de la consulta (opcional):
            </label>
            <textarea
              id="description"
              className="w-full border rounded-md p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className={`w-full py-2 rounded-md ${
              isReserved ? "bg-green-500 text-white" : "bg-blue-500 text-white"
            }`}
            onClick={handleReservation}
          >
            {isReserved ? "Reservado" : "Reservar turno"}
          </button>
          {isModalOpen && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-md">
                <p className="text-red-500 mb-3">
                  Por favor, completa todos los campos obligatorios.
                </p>
                <button
                  className="bg-blue-500 text-white rounded-md px-4 py-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Odonto;
