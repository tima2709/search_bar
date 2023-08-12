import React, {useState} from "react";

const InputAuto = ({
                       label,
                       pholder,
                       data,
                       onSelected,
                       onChange,
                       setSelectedVal,
                       selectedVal,
                       name,
                       blurHandler,
                   }) => {
    const [suggestions, setSugesstions] = useState([]);
    const [isHideSuggs, setIsHideSuggs] = useState(false);


    const handler = e => {
        setSugesstions(data.filter(i => i.capital?.join('').toLowerCase().startsWith(e.target.value)));
    };

    // console.log(suggestions, 'sug')

    const handleChange = e => {
        const input = e.target.value;
        setIsHideSuggs(false);
        setSelectedVal(input);
        onChange(input);
    };

    const hideSuggs = value => {
        onSelected(value);
        setSelectedVal(value);
        setIsHideSuggs(true);
    };

    return (
        <div className="sugesstion-auto">
            <div className="form-control-auto">
                <label htmlFor="tag-input">{label}</label>
                <input
                    placeholder={pholder}
                    onBlur={e => blurHandler(e)}
                    type="search"
                    value={selectedVal}
                    onChange={handleChange}
                    onKeyUp={handler}
                    name={name}
                />
            </div>

            <div
                className="suggestions"
                style={{display: isHideSuggs ? "none" : "block"}}
            >
                {suggestions.map((item, idx) => (
                    <div
                        key={item.id}
                        onClick={() => {
                            hideSuggs(item.capital);
                        }}
                    >
                        {item.capital}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InputAuto;