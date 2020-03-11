let newsArray = [];
let callApi = async() => {
    let apiKey = '1cea5279cd2d43698c1e692ee1e04475';
    let url=`http://newsapi.org/v2/everything?q=trump&apiKey=${apiKey}`; 

    let data = await fetch(url); 
    let result = await data.json();
    console.log("data", result);
    newsArray = result.articles;
    console.log("article list ", newsArray);
    render(newsArray);
}
let render = (array) => {
    let htmlForNews = array.map( (item) => {
        console.log('test');
        return `<div id="news" class="d-flex rounded border" style="border: 1px solid; height:250px">
        <img style="width:300px" src="${item.urlToImage}"/>
        <div class="">
            <h2>news title</h2>
            <p>Lorem, ipsum riatur non debitis culpa maxime explicabo quos rem molestiae!</p>
            <div>MAR 11th 2020</div>
            <div>BBC NEWS LINK</div>
        </div>
    </div>`
    }).join('');
    document.getElementById('newsArea').innerHTML = htmlForNews;
}

callApi();


