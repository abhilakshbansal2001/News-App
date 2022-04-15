import React,{createContext,useState} from 'react'
export const ArticleContext = createContext();

const ArticleContextApi = (props) => {
    const [article, setArticle] = useState();
    const [today, setToday] = useState();
    const [yesterday, setYesterday] = useState();
    const [parso, setParso] = useState();
    const [discover, setDiscover] = useState();
    const [sources, setSources] = useState();
    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    const [anchor, setAnchor] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
  
        setAnchor(open);
        // console.log(anchor)
      };
    return (
        <ArticleContext.Provider value={[article,setArticle,today, setToday,yesterday, setYesterday,parso, setParso,discover, setDiscover,sources, setSources,newsArticles, setNewsArticles,activeArticle, setActiveArticle ,anchor ,toggleDrawer]}>
            {props.children}
        </ArticleContext.Provider>
    )
}

export default ArticleContextApi
