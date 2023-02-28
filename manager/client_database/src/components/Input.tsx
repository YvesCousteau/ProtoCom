export default function Input(props: any) {
    return (
        <div className="relative rounded-md shadow-sm h-11">
            <input 
                type={props.type ?(props.type):("text")} 
                name="price" 
                id="price"
                className="w-full rounded-md shadow-md font-medium pl-2 pr-2 focus:  sm:text-lg h-full"
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}
                value={props.value}
            />
        </div>
    );
}