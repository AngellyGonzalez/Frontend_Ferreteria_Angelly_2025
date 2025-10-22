import {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import TablaEmpleados from '../components/empleados/TablaEmpleados';



const Empleado = () => {

     const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerEmpleados = async () => {
    try {
        const respuesta = await fetch ('http://localhost:3000/api/empleado') // Devuelve todas las empleados
        if (!respuesta.ok) {
          throw new Error ('Error al obtener las empleados');
        }

        const datos = await respuesta.json();
        setEmpleados(datos);
        setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  
  useEffect (() => {
    obtenerEmpleados();
  }, []);


    return (
 <>
    <Container className = "mt-4">
      <h4>Empleados</h4>
      <TablaEmpleados
       empleados = {empleados}
       cargando = {cargando}
      />
    </Container>
</>
    );
}
export default Empleado;