import { toast as toastify, ToastOptions, Slide } from 'react-toastify';

const options: ToastOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  transition: Slide,
  // prevent showing the toast twice
  toastId: 1,
};

const toast = {
  dismiss: () => toastify.dismiss(),
  info: (text: string) => toastify.info(text, options),
  error: (text: string) => toastify.error(text, options),
  warning: (text: string) => toastify.warning(text, options),
  success: (text: string) => toastify.success(text, options),
};

export default toast;
