import { toast } from 'react-toastify';

export const notify = (props) => {
    const message = props?.message || false;
    const type = props?.type || "success";
    const onClick = props?.onClick || (() => {});
    const autoClose = props?.autoClose === undefined;

    if (!message) return;

    const toastProps = {
        onClick,
        autoClose,
    };

    switch (type) {
        case "success":
            Array.isArray(message) ? message.forEach((mes) => toast.success(mes, toastProps)) : toast.success(message, toastProps);
            break;
        case "info":
            Array.isArray(message) ? message.forEach((mes) => toast.info(mes, toastProps)) : toast.info(message, toastProps);
            break;
        case "warning":
            Array.isArray(message) ? message.forEach((mes) => toast.warning(mes, toastProps)) : toast.warning(message, toastProps);
            break;
        case "error":
            Array.isArray(message) ? message.forEach((mes) => toast.error(mes, toastProps)) : toast.error(message, toastProps);
            break;
        default:
            Array.isArray(message) ? message.forEach((mes) => toast.success(mes, toastProps)) : toast.success(message, toastProps);
    }
};
