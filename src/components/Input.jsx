export default function Input({label, type, value, onChange, error}){
    return (
        <label className="label-input">
            <span>
                {label}
            </span>
            <input type={type} value={value} onChange={onChange} style={error ? {borderColor: 'red'} : {borderColor: '#2D336B'}}/>
            <span className="error-input"> {error ? '\u26A0 ' + error : '\u00A0'}</span>
        </label>
    )
}