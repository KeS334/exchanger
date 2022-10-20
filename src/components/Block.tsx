import React from 'react';

interface BlockProps {
    value: number,
    currency: string
    onInputValue: (value: number) => void
    onChangeCurrency: (value: string) => void
}

const Block = ({value, currency, onChangeCurrency, onInputValue}:BlockProps) => {

    const possibleCurrencies: string[] = ['UAH', 'USD', 'EUR']

    return (
        <div className="converter__currency currency-box">
            <input
                type="number"
                value={value}
                onInput={(e:React.ChangeEvent<HTMLInputElement>) => (onInputValue(parseInt(e.target.value)))}
            />
            <select
                name="currency"
                value={currency}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeCurrency(e.target.value)}
            >
                {
                    possibleCurrencies.map((item, index) =>
                        <option value={item} key={index}>{item}</option>
                    )
                }
            </select>
        </div>
    );
};

export default Block;
