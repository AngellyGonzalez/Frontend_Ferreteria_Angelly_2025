import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import TablaEmpleados from '../components/empleados/TablaEmpleados';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';



const Empleado = () => {

  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [empleadosFiltradas, setEmpleadosFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/empleado') // Devuelve todas las empleados
      if (!respuesta.ok) {
        throw new Error('Error al obtener las empleados');
      }

      const datos = await respuesta.json();
      setEmpleados(datos);
      setEmpleadosFiltradas(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };


  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = empleados.filter(
      (empleado) =>
        empleado.primer_nombre.toLowerCase().includes(texto) ||
        empleado.segundo_nombre.toLowerCase().includes(texto) ||
        empleado.primer_apellido.toLowerCase().includes(texto) ||
        empleado.segundo_apellido.toLowerCase().includes(texto) ||
        empleado.celular.toLowerCase().includes(texto) ||
        empleado.cargo.toLowerCase().includes(texto) ||
        empleado.fecha_contratacion.toLowerCase().includes(texto)
    );
    setEmpleadosFiltradas(filtradas);
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);


  return (
    <>
      <Container className="mt-4">
        <h4>Empleados</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <TablaEmpleados
          empleados={empleadosFiltradas}
          cargando={cargando}
        />
      </Container>
    </>
  );
}
export default Empleado;