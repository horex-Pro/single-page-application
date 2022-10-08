import dashbord from "./pages/dashboard.js";
import products from "./pages/products.js";
import posts from "./pages/posts.js";
import notFound from "./pages/notfound.js";

function router(){

    // what to show? 

    const routes =[
        {
            path: "/",
            view: dashbord,
        },
        {
            path: "/products",
            view: products,
        },
        {
            path: "/posts",
            view: posts,
        }
    ];


    const potentialRoutes = routes.map((item)=>{
        return {
            route: item,
            isMatch : location.pathname === item.path
        }
    })

    let match = potentialRoutes.find((item)=> item.isMatch);

    if(!match){
        match = {
            route:{
                path: '/not-found',view: notFound,
            },
            isMatch:true,
        };
    }

    document.querySelector('#app').innerHTML = match.route.view()
    console.log(match.route.view())
    console.log(match)


}

function navigateTo(url){

    // push user to new page
    history.pushState(null,null,url);
    router();
}


// fix click on browser back button
window.addEventListener("popstate",router)

document.addEventListener("DOMContentLoaded",(e)=>{
    
    document.body.addEventListener('click',(e)=>{
        if(e.target.matches("[data-link]")){
            console.log(e.target.href);
            navigateTo(e.target.href);
            e.preventDefault();
        }
    })
    router();
})