// import api from 'axios';
import api from './axios.config'

// url = "https://news.herokuapp.com"


// `https://newsapi.org/v2/everything?q=india&pageSize=10&from=${yestFrom}&to=${yestTo}&sortBy=popularity&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`
// 'https://newsapi.org/v2/top-headlines?country=in&pageSize=5&apiKey=3d9acd8ce84c433ab0fba12097fcadc6'

export async function topHeadline(){
    try{
        const {data} = await api.get('/topHeadlines')

        // console.log(data ,  'Tevhaj')
        localStorage.setItem("topHeadline" , JSON.stringify(data));
        // setMode(false)
        return data;

    }catch(error){
        // alert(error.message + "hbhf hj j jh j")
        
        return JSON.parse(localStorage.getItem("topHeadline")) || error;
    }
    
}
export async function pastHeadline(from , to ,size , countrName , name){
    try{
        const {data} = await api.get('/past', {
            params : {
                from , to , size , countrName
            }
        })
        localStorage.setItem(`${name}Headline` , JSON.stringify(data));
        return data;

    }catch(error){
        return JSON.parse(localStorage.getItem(`${name}Headline`)) || error;
    }
    
}
export async function countryNews(country="in"){
    try{
        const {data} = await api.get('/country', {
            params : {
                country
            }
        })
        localStorage.setItem("countryNews" , JSON.stringify(data));
        return data;

    }catch(error){
        return JSON.parse(localStorage.getItem("countryNews")) || error;
    }
    
}
// `https://newsapi.org/v2/top-headlines?country=in&${category && category[0] && `category=${category[0]}`}&pageSize=20&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`
// `https://newsapi.org/v2/top-headlines?country=in&category=business,science&pageSize=20&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`
// https://newsapi.org/v2/everything?=bitcoin&apiKey=3d9acd8ce84c433ab0fba12097fcadc6
// actual
// http://api.mediastack.com/v1/news?access_key=58c8ce96564a31ebb6e07ae5bb0f87fa&limit=20&countries=${code}&languages=${lang.join(",")}&categories=${category.join(",")}
export async function discoverNews(country="in" , lang="en", category){
    try{
        const {data} = await api.get('/discover', {
            params : {
                country , lang , category
            }
        })
        localStorage.setItem("discoverNews" , JSON.stringify(data));
        return data;

    }catch(error){
        return JSON.parse(localStorage.getItem("discoverNews")) || error;
    }
    
}
export async function querySearch(searchQuery , page ){
    console.log("Pages" , page)
    try{
        const {data} = await api.get('/query', {
            params : {
                searchQuery , page
            }
        })
        console.log(data , "Hello woerld")
        return data;

    }catch(error){
        return "error";
    }
    
}


