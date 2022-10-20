import {useEffect, useState} from 'react';
import {IRates, IServerData} from "../models";
import axios, {AxiosError} from "axios";

export function useServerData(){

    const [serverData, setServerData] = useState<IServerData[]>([]);

    async function getData() {
        try{
            const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            setServerData(response.data)
        }catch (e: unknown){
            console.log("Error fetching currency rate: ", e as AxiosError)
            alert('Something went wrong...')
        }
    }

    function getRates():IRates{
        let dataFiltered = {'USD': 0, 'EUR': 0, 'UAH': 1};
        dataFiltered.USD =  serverData.find(item => item.cc === 'USD')?.rate || dataFiltered.USD;
        dataFiltered.EUR =  serverData.find(item => item.cc === 'EUR')?.rate || dataFiltered.EUR;
        return dataFiltered
    }

    useEffect(() =>{
        getData()
    },[])


    return {serverData, getRates}
}

