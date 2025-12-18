import Swal from "sweetalert2";

export function ErrorAlert(data: string) {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: data,
    toast: true,
    showConfirmButton: false,
    timer: 3500,
  });
}

export function SuccessAlert(data: string) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: data,
    toast: true,
    showConfirmButton: false,
    timer: 3500,
  });
}
