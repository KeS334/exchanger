import React, {useEffect, useState} from 'react';
import Block from "./Block";
import {useServerData} from "../hooks/serverData";

const Converter = () => {

    const [valueA, setValueA] = useState<number>(0)
    const [valueB, setValueB] = useState<number>(1)
    const [currencyA, setCurrencyA] = useState<string>('UAH')
    const [currencyB, setCurrencyB] = useState<string>('USD')

    const {serverData, getRates} = useServerData();
    const rates = getRates();

    const onInputValueA = (value: number) => {
        setValueA(value);
        const calcB = value * (rates[currencyA]/rates[currencyB]);
        setValueB(rounding(calcB));
    }
    const onInputValueB = (value: number) => {
        setValueB(value);
        const calcA = value * (rates[currencyB]/rates[currencyA]);
        setValueA(rounding(calcA));
    }

    function rounding(val:number, n:number = 4):number{
        return Math.round(val * 10**n) / 10**n;
    }

    const swapCurrencies = () => {
        setValueA(valueB);
        setValueB(valueA);
        setCurrencyA(currencyB);
        setCurrencyB(currencyA);
    }

    useEffect(() => { //calculating the init value for 1 USD in UAH
        onInputValueB(1)
    }, [serverData])

     React.useEffect(()=>{ //tracking the change of the first currency
        onInputValueA(valueA)
    }, [currencyA])

    React.useEffect(()=>{ //tracking the change of the second currency
        onInputValueB(valueB)
    }, [currencyB])

    return (
        <div className="converter">
            <div className="converter__container">
                <h1>Please enter the value for one of the currencies</h1>
                <Block
                    value={valueA}
                    currency={currencyA}
                    onInputValue={onInputValueA}
                    onChangeCurrency={setCurrencyA}
                />
                <svg viewBox="0 0 24 24" onClick={swapCurrencies}>
                    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
                </svg>
                <Block
                    value={valueB}
                    currency={currencyB}
                    onInputValue={onInputValueB}
                    onChangeCurrency={setCurrencyB}
                />
            </div>
        </div>
    );
};

export default Converter;
