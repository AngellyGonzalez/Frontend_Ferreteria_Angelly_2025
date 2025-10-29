import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaEmpleados from "../components/empleados/TablaEmpleados";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroEmpleado from "../components/empleados/ModalRegistroEmpleado";

const Empleados = () => {
  const [empleados, setempleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    celular: "",
    cargo: "",
    fecha_contratacion: ""
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prev) => ({ ...prev, [name]: value }));
  };

  const agregarEmpleado = async () => {
    // Validación: requerimos al menos el primer nombre
    if (!nuevoEmpleado.primer_nombre || !nuevoEmpleado.primer_nombre.trim()) return;
    try {
      const respuesta = await fetch(
        "http://localhost:3000/api/registrarempleado",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoEmpleado),
        }
      );
      if (!respuesta.ok) throw new Error("Error al guardar");
      // Limpiar y cerrar
      setNuevoEmpleado({
        primer_nombre: "", segundo_nombre: "", primer_apellido: "",
        segundo_apellido: "",
        celular: "",
        cargo: "",
        fecha_contratacion: "",
      });
      setMostrarModal(false);
      await obtenerEmpleados(); // Refresca la lista
    } catch (error) {
      console.error("Error al agregar empleado:", error);
      alert("No se pudo guardar el empleado. Revisa la consola.");
    }
  };

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/empleados");
      if (!respuesta.ok) {
        throw new Error("Error al obtener los empleados");
      }
      const datos = await respuesta.json();
      setempleados(datos);
      setEmpleadosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };
  const manejarCambioBusqueda = (e) => {
    const texto = (e.target.value || '').toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = empleados.filter((empleado) => {
      const primer = (empleado.primer_nombre || '').toLowerCase();
      const segundo = (empleado.segundo_nombre || '').toLowerCase();
      const pa = (empleado.primer_apellido || '').toLowerCase();
      const sa = (empleado.segundo_apellido || '').toLowerCase();
      const celular = (empleado.celular || '').toLowerCase();
      const cargo = (empleado.cargo || '').toLowerCase();
      const fecha = (empleado.fecha_contratacion || '').toLowerCase();
      return (
        primer.includes(texto) ||
        segundo.includes(texto) ||
        pa.includes(texto) ||
        sa.includes(texto) ||
        celular.includes(texto) ||
        cargo.includes(texto) ||
        fecha.includes(texto)
      );
    });
    setEmpleadosFiltrados(filtrados);
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
          <Col className="text-end">
            <Button
              className="color-boton-registro"
              onClick={() => setMostrarModal(true)}
            >
              + Nuevo Empleado
            </Button>
          </Col>
        </Row>

        <TablaEmpleados empleados={empleadosFiltrados} cargando={cargando} />
        <ModalRegistroEmpleado
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoEmpleado={nuevoEmpleado}
          manejarCambioInput={manejarCambioInput}
          agregarEmpleado={agregarEmpleado}
        />
      </Container>
    </>
  );
};
export default Empleados;