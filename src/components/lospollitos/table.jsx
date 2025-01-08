import React, { useState, useEffect } from "react";
import "../../css/lospollitos/css/productos.css";
import Tabla from "./table.jsx";
import { Mensaje } from "./mensaje.jsx";

const Productos = () => {
  const [categorias, setCategorias] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRegistro, setEditingRegistro] = useState(null);
  const [modalData, setModalData] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    estado: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar productos desde un archivo local
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("/productos.txt"); // Archivo local en carpeta public
        const data = await response.text();

        const productos = data
          .split("\n")
          .map((line) => {
            const [id, nombre, precio, categoria, estado] = line.split("\t");
            if (id && nombre && precio && categoria && estado) {
              return {
                id,
                nombre,
                precio: parseFloat(precio),
                categoria,
                estado,
              };
            }
            return null;
          })
          .filter(Boolean);

        setRegistros(productos);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  // Cargar categorías desde un archivo local
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/categorias.txt"); // Archivo local en carpeta public
        const data = await response.text();

        const categorias = data
          .split("\n")
          .map((line) => {
            const [id, nombre, estado] = line.split("\t");
            if (id && nombre && estado) {
              return { id, nombre, estado };
            }
            return null;
          })
          .filter(Boolean);

        setCategorias(categorias);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Abrir el modal para añadir o editar
  const handleOpenModal = (registro = null) => {
    if (registro) {
      setEditingRegistro(registro.id);
      setModalData({
        nombre: registro.nombre,
        precio: registro.precio,
        categoria: registro.categoria,
        estado: registro.estado,
      });
    } else {
      setEditingRegistro(null);
      setModalData({ nombre: "", precio: "", categoria: "", estado: "" });
    }
    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar los datos (añadir o editar)
  const handleSave = () => {
    if (editingRegistro) {
      setRegistros((prev) =>
        prev.map((registro) =>
          registro.id === editingRegistro
            ? { ...registro, ...modalData }
            : registro
        )
      );
    } else {
      const newRegistro = {
        id: Date.now().toString(),
        ...modalData,
        precio: parseFloat(modalData.precio),
      };
      setRegistros((prev) => [...prev, newRegistro]);
    }
    handleCloseModal();
    Mensaje("success", "Guardado", "Producto guardado exitosamente.");
  };

  const columnas = [
    { titulo: "Nombre", acceso: "nombre" },
    { titulo: "Precio", acceso: "precio" },
    { titulo: "Categoría", acceso: "categoria" },
    {
      titulo: "Estado",
      acceso: "estado",
      render: (valor) => (
        <span style={{ color: valor === "Activo" ? "green" : "red" }}>
          {valor}
        </span>
      ),
    },
    {
      titulo: "Acciones",
      acceso: "acciones",
      render: (_, registro) => (
        <div>
          <button
            className="edit-button"
            onClick={() => {
              handleOpenModal(registro);
            }}
          >
            Editar
          </button>
        </div>
      ),
    },
  ];

  const filteredProducts = (products) => {
    return products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.precio.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoria.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="app">
      <h1>Mantenimiento Productos</h1>
      <div className="group">
        <input
          type="text"
          className="input"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button className="add-button" onClick={() => handleOpenModal()}>
        Agregar Producto
      </button>
      <Tabla columnas={columnas} registros={filteredProducts(registros)} />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingRegistro ? "Editar Producto" : "Agregar Producto"}</h2>
            <form>
              <div className="input_label">
                <input
                  type="text"
                  name="nombre"
                  value={modalData.nombre}
                  onChange={handleChange}
                  className="input"
                  placeholder="Nombre"
                />
              </div>
              <div className="input_label">
                <input
                  type="number"
                  name="precio"
                  value={modalData.precio}
                  onChange={handleChange}
                  className="input"
                  placeholder="Precio"
                />
              </div>
              <div className="input_label">
                <select
                  name="categoria"
                  value={modalData.categoria}
                  onChange={handleChange}
                  className="input"
                >
                  <option>Seleccione la categoría</option>
                  {categorias.length > 0
                    ? categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombre}>
                          {categoria.nombre}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="input_label">
                <select
                  name="estado"
                  value={modalData.estado}
                  onChange={handleChange}
                  className="input"
                >
                  <option>Seleccione el estado</option>
                  <option value={"Activo"}>Activo</option>
                  <option value={"Inactivo"}>Inactivo</option>
                </select>
              </div>
            </form>
            <div className="modal-actions">
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCloseModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
