export default function Alert(props: any) {
  return (
    <div className={` absolute top-0 right-10  transform  transition duration-500 translate-y-0 ease-in-out ${props.alert.visible ? "translate-y-8 visible" : "translate-y-0 invisible"}`}>
      <div className={`grid grid-cols-1  border px-4 py-3 rounded-xl relative ${props.alert.type === "Error" && "bg-red-100 border-red-400 text-red-700"} ${props.alert.type === "Success" && "bg-green-100 border-green-400 text-green-700" }`} role="alert">
        <strong className="font-bold">{props.alert.type}</strong>
        <span className="block sm:inline">{props.alert.url}</span>
      </div>
    </div>
  )
}