import {useEffect, useState} from "react";
import axios from "axios";
import InputAuto from "./AutoInput";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {isDisabled} from "@testing-library/user-event/dist/utils";


function App() {
    const [cities, setCities] = useState([])
    const [fromToDate, setFromToDate] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [toSelectedDate, setToSelectedDate] = useState(null)
    const [oneWay, setOneWay] = useState(false)
    const [selectedFrom, setSelectedFrom] = useState("");
    const [selectedTo, setSelectedTo] = useState("");
    const [selectedFromDirty, setSelectedFromDirty] = useState(false)
    const [selectedToDirty, setSelectedToDirty] = useState(false)
    const [selectedFromError, setSelectedFromError] = useState('Откуда не может быть пустым')
    const [selectedToError, setSelectedToError] = useState('Куда не может быть пустым')
    const [selectedDateDirty, setSelectedDateDirty] = useState(false)
    const [selectedDateToError, setSelectedDateToError] = useState('Укажите время')



    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all`)
            .then(({data}) => {
                setCities(data)
            })
    }, [])

    const getSelectedVal = value => {
        console.log(value)

    }

    const getChanges = value => {
        console.log(value, 'change')
    }

    const handleChange = (e) => {
        setOneWay(e.target.checked)
    }

    let a = (JSON.stringify(selectedDate))
    let b = (JSON.stringify(toSelectedDate))

    const handlerGo = () => {
        if(selectedFrom.length == 0){
            setSelectedFromDirty(true);
            return;
        }
        if(selectedTo.length == 0) {
            setSelectedToDirty(true);
            return;
        }
        if(selectedDate) {
            setSelectedDateDirty(true)
            return;
        }
        setFromToDate([...selectedFrom, ...selectedTo, a ,b]);
        setSelectedFromDirty(false);
        setSelectedToDirty(false);


    }
    console.log(fromToDate)



    const blurHandler = (e) => {
        // eslint-disable-next-line default-case
        /*switch (e.target.name) {
            case 'selectedFrom':
                setSelectedFromDirty(true)
                break
            case 'selectedTo':
                setSelectedToDirty(true)
                break
        }*/
    }





    return (
        <div className="App">

            <div className={'inputAuto'}>
                <div>
                    {(selectedFromDirty && selectedFromError) && <div style={{color: 'red'}}>{selectedFromError}</div>}
                    <InputAuto
                        name = 'selectedFrom'
                        label='Откуда'
                        placeholder={'City'}
                        data={cities}
                        onSelected={getSelectedVal}
                        onChange={getChanges}
                        selectedVal={selectedFrom}
                        setSelectedVal={setSelectedFrom}
                    />
                </div>
                <div>
                    {( selectedToDirty && selectedToError) && <div style={{color: 'red'}}>{selectedToError}</div>}
                    <InputAuto
                        name='selectedTo'
                        label='Куда'
                        placeholder={'City'}
                        data={cities}
                        onSelected={getSelectedVal}
                        onChange={getChanges}
                        selectedVal={selectedTo}
                        setSelectedVal={setSelectedTo}
                    />
                </div>
                <div className={'datePicker-items'}>
                    <input type="checkbox" onChange={(e) => handleChange(e)}/>
                    {( selectedDateDirty && selectedDateToError) && <div style={{color: 'red'}}>{selectedDateToError}</div>}
                    <DatePicker
                        className={'datePicker'}
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat='dd/MM/yyyy'
                        minDate={new Date()}
                        showYearDropdown
                        scrollableMonthYearDropdown
                    />
                    { !oneWay &&

                        <DatePicker
                            className={'datePicker'}
                            selected={toSelectedDate}
                            onChange={date => setToSelectedDate(date)}
                            dateFormat='dd/MM/yyyy'
                            minDate={selectedDate}
                            showYearDropdown
                            scrollableMonthYearDropdown
                        />
                    }
                </div>
                <button onClick={handlerGo}>Найти</button>
            </div>
<div>
    <h3>Найдено: </h3>
    {
        fromToDate.map(el => (
            <div>
                <p>{el}</p>

            </div>
        ))
    }
</div>

        </div>
    );
}

export default App;
