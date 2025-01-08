import React, { useState, useEffect } from "react";
import "../../css/lospollitos/css/ventas.css"; 
import { Mensaje } from "./mensaje";
import { jsPDF } from "jspdf";
import imagen from '../../img/fondo2.png';

const Ventas = () => {
  const [productos, setProductos] = useState({});
  const [categories, setCategories] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuerySelect,setSearchQuerySelect]=useState("Todos");
  const [bandejacompra, setbandejacompra] = useState(false);

  // Obtener datos desde Firestore y agrupar productos por categoría
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("txt/productos.txt");
        const data = await response.text();
        const groupedProductos = {};

        data.split("\n").forEach((line) => {
          const [id, categoria, estado, nombre, precio] = line.split("\t");
          if (estado === "Activo") {
            if (!groupedProductos[categoria]) {
              groupedProductos[categoria] = [];
            }
            groupedProductos[categoria].push({
              id,
              nombre,
              precio: parseFloat(precio),
              categoria,
              estado,
            });
          }
        });

        setProductos(groupedProductos);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    };

    fetchProductos();
  }, []);



  // Obtener categorías desde Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/txt/categorias.txt"); // Ruta al archivo de categorías
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo categorias.txt");
        }
        const data = await response.text();
        const fetchedCategories = data.split("\n").map((line) => {
          const [id, estado, nombre] = line.split("\t").map((item) => item?.trim() || "");
          if (!id || !nombre || !estado) {
            console.warn(`Línea inválida en categorias.txt: ${line}`);
            return null; // Ignorar líneas inválidas
          }
          return { id, nombre, estado };
        }).filter((cat) => cat && cat.estado === "Activo");
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  useEffect(() => {
    const storedCart = localStorage.getItem("carrito");
    const storedTotal = localStorage.getItem("total");
    const storedbandeja = localStorage.getItem("bandeja");
    if (storedCart) {
      setCarrito(JSON.parse(storedCart));
    }
    if (storedTotal) {
      setTotal(parseFloat(storedTotal));
    }
    if (storedbandeja) {
      setbandejacompra(JSON.parse(storedbandeja));
    }
  }, []);

  // Función para agregar o quitar productos del carrito
  const handleAddToCart = (product, quantityChange) => {
    setCarrito((prevCarrito) => {
      const existingProduct = prevCarrito.find((item) => item.id === product.id);

      if (existingProduct) {
        if (!prevCarrito || typeof prevCarrito !== "object") {
          return [];
        }
        const updatedCart = Object.values(prevCarrito)
          .map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                cantidad: Math.max(0, item.cantidad + quantityChange),
              };
            }
            return item;
          })
          .filter((item) => item.cantidad > 0);

        const newTotal = updatedCart.reduce(
          (sum, item) => sum + item.precio * item.cantidad,
          0
        );
        setTotal(newTotal);
        localStorage.setItem("carrito", JSON.stringify(updatedCart));
        localStorage.setItem("total", newTotal.toString());
        return updatedCart;
      } else {
            const newCartItem = { ...product, cantidad: Math.max(0, quantityChange) };
            const updatedCart = [...prevCarrito, newCartItem];
            const newTotal = updatedCart.reduce(
              (sum, item) => sum + item.precio * item.cantidad,
              0
            );
            setTotal(newTotal);
            localStorage.setItem("carrito", JSON.stringify(updatedCart));
            localStorage.setItem("total", newTotal.toString());
            return updatedCart;
      
        
      }
    });
  };

  // Función para eliminar productos del carrito
  const handleDeleteFromCart = (productId) => {
    setCarrito((prevCarrito) => {
      if (!prevCarrito || typeof prevCarrito !== "object") {
        return [];
      }

      const updatedCart = Object.values(prevCarrito).filter((item) => item.id !== productId);
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
      );
      setTotal(newTotal);
      localStorage.setItem("carrito", JSON.stringify(updatedCart));
      localStorage.setItem("total", newTotal.toString());
      return updatedCart;
    });
  };

  // Filtro de búsqueda
  const filteredProducts = (products) => {
    
    if (!products || typeof products !== "object") {
      return [];
    }
  
    return Object.values(products).filter((product) => {
      const matchesTextQuery =
        product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.precio.toString().toLowerCase().includes(searchQuery.toLowerCase())||
        product.categoria.toString().toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        searchQuerySelect === "Todos" ||
        product.categoria.toLowerCase() === searchQuerySelect.toLowerCase();

      return matchesTextQuery && matchesCategory;
    });
  };

  

  // Manejo de la bandeja de compra
  const Encender = () => {
    setbandejacompra(!bandejacompra);
    localStorage.setItem("bandeja", JSON.stringify(!bandejacompra));
  };

  // Función para guardar el carrito en Firestore
const handleSavePurchase = async () => {
  if (carrito.length > 0) {
    try {
      const purchaseData = {
        items: carrito,
        timestamp: new Date(),
        total: total,
      };
      console.log("Compra realizada:", purchaseData);
      generarPDF(carrito, "Capellades,Cartago", "ID-GENERADO");
      setCarrito([]);
      setTotal(0);
      localStorage.removeItem("carrito");
      localStorage.removeItem("total");
      Mensaje("success", "Exito", "Compra exitosa.");
    } catch (error) {
      console.error("Error al guardar la compra:", error);
      Mensaje("error", "Error", "Hubo un error al realizar la compra.");
    }
  } else {
    Mensaje("error", "Error", "El carrito está vacío.");
  }
};



  /*const connectToPrinter = async (dataToPrint) => {
    try {
      // Solicitar conexión con un dispositivo Bluetooth
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true, // Permitir todos los dispositivos
        optionalServices: ['00001101-0000-1000-8000-00805f9b34fb'], // Cambiar al UUID de tu impresora si es necesario
      });
  
      console.log(`Conectado al dispositivo: ${device.name}`);
  
      const server = await device.gatt.connect();
      console.log("Conexión GATT establecida");
  
      // Aquí seleccionas el servicio correspondiente a tu impresora
      const service = await server.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');
  
      // Seleccionar la característica para escribir datos
      const characteristic = await service.getCharacteristic('00001801-0000-1000-8000-00805f9b34fb');
  
      // Convertir los datos a imprimir a un formato binario (ArrayBuffer)
      const encoder = new TextEncoder();
      const data = encoder.encode(dataToPrint);
  
      // Enviar los datos a la impresora
      await characteristic.writeValue(data);
      console.log("Datos enviados a la impresora");
    } catch (error) {
      console.error("Error conectando con la impresora Bluetooth:", error);
      
    }
  };*/

  const generarPDF = (carrito, caracteristicas, facturaId) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth(); // Ancho de la página
    const maxWidth = pageWidth - 20; // Ancho máximo para el texto (10 de margen a cada lado)
  
    // Agregar la imagen con el tamaño y la posición especificados
    doc.addImage(imagen, "PNG", 80, 5, 70, 70);
  
    // Información de la pollería
    doc.setFontSize(33);
    const infoPolleria = doc.splitTextToSize("Tel: 6328 8338", maxWidth);
    infoPolleria.forEach((linea, index) => {
      doc.text(linea, 70, 90 + index * 10);
    });
    const caracteristicasDivididas = doc.splitTextToSize(caracteristicas, maxWidth);
    caracteristicasDivididas.forEach((linea, index) => {
      doc.text(linea, 60, 105 + index * 10);
    });
    doc.text("100m este de la entrada", 45, 120);
    doc.text("principal de la iglesia", 55, 135);
  
    // Agregar ID de la factura
    doc.setFontSize(37);
    const facturaDividida = doc.splitTextToSize(`ID: ${facturaId}`, maxWidth);
    facturaDividida.forEach((linea, index) => {
      doc.text(linea, 10, 150 + index * 10);
    });
  
    const fechaHoy = new Date();
    const fechaFormateada = `${fechaHoy.getDate()}/${fechaHoy.getMonth() + 1}/${fechaHoy.getFullYear()}`;
    const horaFormateada = `${fechaHoy.getHours()}:${fechaHoy.getMinutes().toString().padStart(2, "0")}`;
    const fechaHoraDividida = doc.splitTextToSize(
      `Fecha: ${fechaFormateada} Hora:${horaFormateada}`,
      maxWidth
    );
    fechaHoraDividida.forEach((linea, index) => {
      doc.text(linea, 20, 170 + index * 10);
    });
  
    // Agregar los productos del carrito
    let y = 190; // Coordenada Y inicial para los productos
    doc.setFontSize(38);
    carrito.forEach((producto) => {
      const cantidad = `${producto.cantidad}`; // Solo la cantidad en negrita
      const textoRestante = `-${producto.nombre}=${producto.precio * producto.cantidad}`; // Resto del texto
  
      const textoCompleto = `${cantidad}${textoRestante}`;
      const textoDividido = doc.splitTextToSize(textoCompleto, maxWidth);
  
      textoDividido.forEach((linea) => {
          let x = 10; // Margen izquierdo
  
          // Detectar si la cantidad está al inicio de la línea
          if (linea.startsWith(cantidad)) {
              // Escribir la cantidad en negrita
              doc.setFont("helvetica", "bold");
              const anchoCantidad = doc.getTextWidth(cantidad);
              doc.text(cantidad, x, y);
  
              // Escribir el resto de la línea en estilo normal
              doc.setFont("helvetica", "normal");
              doc.text(linea.slice(cantidad.length), x + anchoCantidad, y);
          } else {
              // Si la cantidad no está al inicio, escribe toda la línea en normal
              doc.setFont("helvetica", "normal");
              doc.text(linea, x, y);
          }
  
          y += 20; // Incrementar la posición Y
      });
  });
  
  
    // Agregar el total
    y += 10; // Espacio después de la lista de productos
    doc.setFontSize(35);
    const totalDividido = doc.splitTextToSize(`Total: ${total}`, maxWidth);
    totalDividido.forEach((linea) => {
      doc.text(linea, 15, y);
      y += 10;
    });
  
    // Agregar el mensaje de agradecimiento
    y += 10; // Espacio después del total
    const agradecimientoDividido = doc.splitTextToSize("Gracias por su compra", maxWidth);
    agradecimientoDividido.forEach((linea) => {
      doc.text(linea, 15, y);
      y += 10;
    });
  
    // Guardar el archivo PDF
    doc.save(`factura_${facturaId}.pdf`);

    const pdfBlob = doc.output("blob");

    // Crear un enlace para abrir el PDF
    const pdfURL = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfURL);
    printWindow.onload = () => {
      printWindow.print(); // Imprimir el PDF cuando cargue
    };
  };
  
  


  return (
    <>
      <h1>Centro de Ventas</h1>
      <div style={{display:'flex', gap:'4px',margin:'auto', maxWidth:'400px' }}>

        <input
          type="text"
          className="input"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          type="text"
          className="input"
          placeholder="Buscar..."
          value={searchQuerySelect}
          onChange={(e) => setSearchQuerySelect(e.target.value)}
          style={{cursor:'pointer'}}
        ><option value="Todos">Todos</option>{categories.map((category) => (<option key={category.id} value={category.nombre}>{category.nombre}</option>))}
        </select>
      </div>
      <div className="content-categorias">
      {categories.map((category) => {
    // Filtrar los productos de la categoría actual
    const filteredCategoryProducts = filteredProducts(productos[category.nombre] || []);
    
    // Condición para mostrar la categoría
    const shouldRenderCategory =
      (searchQuerySelect === "Todos" || searchQuerySelect === category.nombre) &&
      category.estado === "Activo" &&
      filteredCategoryProducts.length > 0;

    return shouldRenderCategory ? (
            <div key={category.id}>
              <h2 className="categoria">{category.nombre}</h2>
              <div className="productos">
                {filteredProducts(productos[category.nombre]).map((product) => (
                  <div className="card" key={product.id}>
                    <div className="card-body">
                      <h2 className="card-title">{product.nombre}</h2>
                      <p className="card-price">₡{product.precio}</p>
                      <div className="cantidad">
                        <button
                          className="menos"
                          onClick={() => handleAddToCart(product, -1)}
                          disabled={
                            (carrito.find((item) => item.id === product.id)?.cantidad || 0) <= 0
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={
                            carrito.find((item) => item.id === product.id)?.cantidad || 0
                          }
                          readOnly
                        />
                        <button
                          className="mas"
                          onClick={() => handleAddToCart(product, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
          ): null
        
        })}
      </div>
      <div className="carritocompras">
        <div className="compras" onClick={() => Encender()}></div>
      </div>
      {bandejacompra && (
        <div className="carrito">
          <h3>Carrito de Compras</h3>
          {carrito.length > 0 ? (
            <div>
              {carrito.map((item) => (
                <div key={item.id} className="producto">
                  <span className="producto">
                    {item.cantidad} x {item.nombre}
                  </span>
                  <span className="precio">₡{item.precio * item.cantidad}</span>
                  <button
                    className="close"
                    onClick={() => handleDeleteFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
              ))}
              <div className="total">Total: ₡{total}</div>
              <button className="add-button" style={{margin:'auto'}} onClick={() => {
                handleSavePurchase();
              }}>
                Finalizar Compra
              </button>
            </div>
          ) : (
            <p>El carrito está vacío.</p>
          )}
        </div>
      )}
    </>
  );
};

export default Ventas;
