
function router(){
    const routes =[
        {
            path: "/",
            view: ()=> console.log('dashbord page')
        },
        {
            path: "/products",
            view: ()=> console.log('products page')
        },
        {
            path: "/posts",
            view: ()=> console.log('posts page')
        }
    ];


    const potentialRoutes = routes.map((item)=>{
        return {
            route: item,
            isMatch : location.pathname === item.route
        }
    })

    let match = potentialRoutes.find((item)=> item.isMatch);

    if(!match){
        match = {
            route:{
                path: '/not-found',view: ()=> console.log("not found"),
            },
            isMatch:true,
        };
    }
    console.log(match.route.view())



}

function navigateTo(url){
    history.pushState(null,null,url);
    router();
}

window.addEventListener("popstate",router)

document.addEventListener("DOMContentLoaded",()=>{
    
    document.body.addEventListener('click',(e)=>{
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})