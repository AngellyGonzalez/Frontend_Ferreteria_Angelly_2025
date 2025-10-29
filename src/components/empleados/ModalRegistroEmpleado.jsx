import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
}) => {
  return (
    <Modal backdrop="static" show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3" controlId="Primernombre">
            <Form.Label>Primer nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoEmpleado.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Angy"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="SegundoNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoEmpleado.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Sofia"
              maxLength={20}
            />
          </Form.Group>

<Form.Group className="mb-3" controlId="Primerapellido">
            <Form.Label>Primer apellidp</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoEmpleado.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Gonzalez"
              maxLength={20}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="Segundoapellido">
            <Form.Label>Segundo apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoEmpleado.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Pineda"
              maxLength={20}
            />
          </Form.Group>

                <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoEmpleado.celular}
              onChange={manejarCambioInput}
              placeholder="Ej: 82249647"
              maxLength={20}
            />
          </Form.Group>

                    <Form.Group className="mb-3" controlId="cargo">
            <Form.Label>cargo</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={nuevoEmpleado.cargo}
              onChange={manejarCambioInput}
              placeholder="Ej: Admin"
              maxLength={20}
            />
          </Form.Group>


                    <Form.Group className="mb-3" controlId="fecha_contratacion">
            <Form.Label>Fecha_contratacion</Form.Label>
            <Form.Control
              type="Date"
              name="cargo"
              value={nuevoEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
              placeholder="Ej: 25/10/25"
              maxLength={20}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarEmpleado}
          disabled={!nuevoEmpleado.empleado.trim()}
        >
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;