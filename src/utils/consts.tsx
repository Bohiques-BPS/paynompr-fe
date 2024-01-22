import { toast } from "react-toastify";

export const data_company = [
  {
    id: 1,
    title: "Bohiques Business",
    contact: "Jose Ortiz",
  },
  {
    id: 2,
    title: "Ubiquo Tecnologías",
    contact: "Jose Ortiz",
  },
];

export function showSuccess(text: string) {
  const notify = () => toast.success(text);
  notify();
}
