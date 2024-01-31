import { toast } from "react-toastify";

export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function showSuccess(text: string) {
  const notify = () => toast.success(text);
  notify();
}

export function showError(text: string) {
  const notify = () => toast.error(text);
  notify();
}
