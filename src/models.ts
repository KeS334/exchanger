export interface IServerData{
    r030: number,
    txt: string,
    rate: number,
    cc: string,
    exchangedate: string
}

export interface IRates{
    USD: number,
    EUR: number,
    UAH: number
    [index: string]:number
}


