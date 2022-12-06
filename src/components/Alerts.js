
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const alertConfirm =async (title, text) =>{
    let confirm 
   await MySwal.fire({
        title: title,
        text: text,
        showCancelButton: true,
        confirmButtonColor: '#0E6251',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
            confirm = true
        }
        else confirm = false
      })
      return confirm
}


const alertPosiUp = (icon, title) =>{
  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', MySwal.stopTimer)
      toast.addEventListener('mouseleave', MySwal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: icon,
    title: title
  })
}


const alertUp = async (text, title) =>{
  let confirm 
  await MySwal.fire({
       title: title,
       text: text,
       showCancelButton: false,
       confirmButtonColor: '#0E6251',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Ok',
     }).then((result) => {
       if (result.isConfirmed) {
           confirm = true
       }
       else confirm = false
     })
     return confirm
}
export default {alertConfirm, alertPosiUp, alertUp}

/*
axios.get(`${baseURL}/asdf`).then((response) => {
      setPost(response.data);
    }).catch(error => {
      setError(error);
    });
    
*/