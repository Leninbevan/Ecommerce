import { BrowserRouter, Route, Switch } from "react-router-dom"
import BuyModal from "../pages/buyModal/buyModal"
import MiniDrawer from "./drawer/drawer"

function Router() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={()=> <MiniDrawer page={'home'}/>}/>
                    <Route exact path='/shop' render={()=> <MiniDrawer page={'shop'}/>}/>
                    <Route exact path='/preview/:id' render={()=> <MiniDrawer page={'preview'}/>}/>
                    <Route exact path='/about' render={()=> <MiniDrawer page={'about'}/>}/>
                    <Route exact path='/cart' render={()=> <MiniDrawer page={'cart'}/>}/>
                    <Route exact path='/wishlist' render={()=> <MiniDrawer page={'wishList'}/>}/>
                    <Route exact path='/buy' render={()=> <BuyModal page={'buy'}/>}/>
                    <Route path='*' render={()=> <p>404 page not fount</p>}/>
                </Switch>
            </BrowserRouter>
        </>
    )
}
export default Router