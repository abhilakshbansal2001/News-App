// https://newsapi.org/v2/top-headlines/sources?country=in&apiKey=API_KEY
import api from './axios.config'

export async function Sources(country="in" , size=5){
    try{
        const { data} = await api.get('/source' , {
            params : {
                country , size
            }
        })
        // console.log(data)
        return data;

    }catch(error){
        return error;
    }
    
}