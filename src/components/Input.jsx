export default function Input({label, type, value, onChange, error}){
    return (
        <label className="label-input">
            <span>
                {label}
                {error && (<span className="error-input">&#9888;{error}</span>)}
            </span>
            <input type={type} value={value} onChange={onChange} style={error && {borderColor: 'red'}}/>
        </label>
    )
}