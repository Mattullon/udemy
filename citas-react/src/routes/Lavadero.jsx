import { useEffect, useState } from "react";
import SearchAppBar from "../components/Appbar";
import { enviarMensaje } from "../service/WhatsappApi";

const randomServices = [
  { name: "Lavado Completo", price: 70000 },
  { name: "Solo Ducha", price: 40000 },
  { name: "Ducha y Aspirado", price:60000 },
 
];
const opcionesLlevar = ["Si","No"];

const Lavadero = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedOpcion, setSelectedOpcion] = useState("");
  const [description, setDescription] = useState("");

  const [yourName, setYourName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [carInfo, setCarInfo] = useState({ brand: "", licensePlate: "" });
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [isReserved, setIsReserved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleReservation = () => {
    if (
      selectedService &&
      yourName &&
      phoneNumber &&
      selectedDate &&
      selectedTime &&
      carInfo.brand &&
      carInfo.licensePlate
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

Te informamos que tu reserva en VIP PCC Car Wash para el ${selectedDate} a las ${selectedTime} hs ha sido exitosamente agendada.
        
Vehículo: ${carInfo.brand}
Chapa: ${carInfo.licensePlate}
Tipo de lavado: ${selectedService}
Monto a abonar: ${selectedPrice}
        
En caso de que necesite que pasemos a buscar, favor nos facilita su ubicación y reconfirmamos.
        
¡Saludos!`
      );
    }
  }, [messageSent]);

  const getSelectedServicePrice = () => {
    const service = randomServices.find(
      (service) => service.name === selectedService
    );
    return service ? service.price : 0;
  };

  useEffect(() => {
    setSelectedPrice(getSelectedServicePrice());
  }, [selectedService]);

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
            Reserva en Lavadero de Autos
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
              id="phoneNumber"
              placeholder="(0993)xxx-xxx"
              className="w-full border rounded-md p-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="carInfo" className="block font-medium mb-1">
              Datos del Vehiculo:
            </label>
            <div className="flex">
              <input
                type="text"
                id="carInfo"
                className="w-1/2 mr-2 border rounded-md p-2"
                placeholder="Marca"
                value={carInfo.brand}
                onChange={(e) =>
                  setCarInfo({ ...carInfo, brand: e.target.value })
                }
              />
              <input
                type="text"
                id="carInfo"
                className="w-1/2 border rounded-md p-2"
                placeholder="Chapa"
                value={carInfo.licensePlate}
                onChange={(e) =>
                  setCarInfo({ ...carInfo, licensePlate: e.target.value })
                }
              />
            </div>
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
            <label htmlFor="service" className="block font-medium mb-1">
              Tipo de Lavado:
            </label>
            <select
              id="service"
              className="w-full border rounded-md p-2"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Selecciona un servicio</option>
              {randomServices.map((service, index) => (
                <option key={index} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
  <label className="block font-medium mb-1">
    Precio:
  </label>
  <input
    className="w-full border rounded-md p-2"
    value={`${selectedPrice.toLocaleString()} Gs.`}
    disabled
  />
</div>

          <div className="mb-4">
            <label htmlFor="doctor" className="block font-medium mb-1">
            ¿Pasamos a buscar su vehiculo? 
            </label>
            <select
              id="doctor"
              className="w-full border rounded-md p-2"
              value={selectedOpcion}
              onChange={(e) => setSelectedOpcion(e.target.value)}
            >
              <option value="">Selecciona </option>
              {opcionesLlevar.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
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
          <br/>
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

export default Lavadero;
