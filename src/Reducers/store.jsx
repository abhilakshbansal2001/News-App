import { configureStore } from '@reduxjs/toolkit'
import todayReducer from './Home/today'
import yesterdayReducer from './Home/yesterday'
import parsoReducer from './Home/parso'
import discoverReducer from './Discover/discover'
import sourceReducer from './Discover/source'
import CountryNewsReducer from './Discover/countryNews'
import DrawerReducer from './Drawer'
import ArticleReducer from './Article'
import AlanReducer from './Alan'
export default configureStore({
    reducer:{
        today : todayReducer,
        yesterday : yesterdayReducer,
        parso : parsoReducer,
        discover : discoverReducer , 
        sources : sourceReducer , 
        countryNews : CountryNewsReducer , 
        drawer : DrawerReducer,
        article : ArticleReducer,
        alan : AlanReducer,
    }
})