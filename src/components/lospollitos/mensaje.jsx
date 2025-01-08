import Swal from "sweetalert2"; 
import '../../css/lospollitos/css/mensaje.css'
export function Mensaje(icono,titulo,texto){
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      color: "white",
      background: "#333",
      confirmButtonColor: "#007BFF",
      customClass: {
      popup: 'custom-swal-popup',
    },
    });
  }