import React,{useEffect} from 'react'
import alanBtn from "@alan-ai/alan-sdk-web";


const Alan = () => {
    
    
    
    // useEffect(() => {
        alanBtn({
            key: 'f5b3dbd1d22fad0807edcd80d26b62952e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, articles, number,place }) => {
                if (command === 'newHeadlines') {
                //   setNewsArticles(articles);
                //   setActiveArticle(-1);
                console.log(command,articles,"yoyoyo");
                } 
                // else if (command === 'instructions') {
                //   setIsOpen(true);
                // } else if (command === 'highlight') {
                //   setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                // } else if (command === 'open') {
                //   const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                //   const article = articles[parsedNumber - 1];
        
                //   if (parsedNumber > articles.length) {
                //     alanBtn().playText('Please try that again...');
                //   } else if (article) {
                //     window.open(article.url, '_blank');
                //     alanBtn().playText('Opening...');
                //   } else {
                //     alanBtn().playText('Please try that again...');
                //   }
                // }
                if(command == 'GoTO'){
                    console.log(place , "<><><><>");
                    window.location.href = `http://localhost:3000/${place}`
                }
              },
        });
    // }, [])


    
}

export default Alan
