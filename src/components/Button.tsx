interface IButton {
    title: string;
    action: () => void;
}
export default function Button({title, action}: IButton) {
  return (
    <button onClick={action}>{title}</button>
  )
}
