/*note that all moment() methods/objects work 
because you have the <script src="https://unpkg.com/moment"></script> 
in your html */

/*
Example of a JSON received from this API call

    source: {id: "wired", name: "Wired"}
    author: "Garrett M. Graff"
    title: "How Trump Hollowed Out US National Security"
    description: "Acting director of national intelligence Richard Grenell is just the latest in a cascade of temporary or vacant personnel in critical government positions."
    url: "https://www.wired.com/story/trump-hollowed-out-us-national-security-vacancies-acting/"
    urlToImage: "https://media.wired.com/photos/5e4ffdc5903506000820ea86/191:100/w_1280,c_limit/Security_RichardGrenell_1046104636.jpg"
    publishedAt: "2020-02-21T16:58:01Z"
    content: "The State Department asdasdasdas"
*/
let newsArray = [];
let indexOfStories = 0;

let callApi = async() => {
    let apiKey = '1cea5279cd2d43698c1e692ee1e04475';
    let url=`http://newsapi.org/v2/everything?pageSize=40&q=trump&apiKey=${apiKey}`; 

    let data = await fetch(url); 
    let result = await data.json();
    console.log("data", result);
    newsArray = result.articles;
    console.log("article list ", newsArray);
    //note: if you try to put the two lines below outside of the async callApi function, the newsArray will be empty???
    render(newsArray);
    indexOfStories += 20;
}
let render = (array) => {


    let htmlForNews = array.map( (item) => {
        //"2020-02-21T16:58:01Z"
        //also handle time
        let now = moment(new Date()); //todays date
        let publishedAtDate = moment(new Date(item.publishedAt)); // another date
        let duration = Math.floor(moment.duration(now.diff(publishedAtDate)).asDays()) + ' days ago';
        //h2 length limit 35 chars
        //text content length limit 167
        return `<div id="news" class="d-flex shadow-sm my-2 rounded-lg border" style="height:250px;">
        <img style="width:300px" class="rounded-left"src="${item.urlToImage}"/>
        <div class="p-3 w-100">
            <h2>${item.title.slice(0, 32)}...</h2>
            <p class="w-100">${item.description.slice(0, 164)}...</p>
            <a href=${item.url}>Read More...</a>
            <div>MAR 11th 2020</div>
            <div class="d-flex flex-row justify-content-between">
                <div>Source: ${item.source.name} </div>
                <div>${duration}</div>
            </div>
        </div>
    </div>`
    });
    let someNews = htmlForNews.slice(indexOfStories,indexOfStories+20).join('');
    document.getElementById('newsArea').innerHTML += someNews;
    document.getElementById('storiesNum').innerHTML =  `Number of Stories: ${newsArray.length}`;
}

let displayMoreStories = () => {
    console.log('hi');
    render(newsArray);
    document.getElementById('seeMoreButton').hidden = true;
}

callApi();


