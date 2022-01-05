import {Routes,Route,useNavigate,Navigate} from "react-router-dom";
import store from 'redux/store'
import {useEffect} from 'react'

import Index from 'page/index'
import Orderlist from 'page/orderlist'
import My from 'page/my'
import Login from 'page/login'
import Error404 from 'page/error404'
import PowerList from 'page/powerlist'
import GoodsList from 'page/goodslist'
import ShopList from 'page/shoplist'
import EditGoods from 'page/editgoods'
import EditShop from 'page/editshop'
import ClassManager from 'page/classmanager'

function RouterView(){ 
    let navigate=useNavigate()
    useEffect(()=>{
        const authToken=store.getState().user.token
        if(authToken===''){
            navigate("/login")
        }
    },[navigate])
    
    return(
        <Routes>
           <Route path="/login" element={<Login />} />
           <Route path="/" element={<Index />} />
           <Route path="/index" element={<Index />} />
           <Route path="/orderlist" element={<Orderlist />} />
           <Route path="/my" element={<My />} />
           <Route path="/power" element={<PowerList />} />
           <Route path="/goodslist" element={<GoodsList />} />
           <Route path="/shoplist" element={<ShopList />} />
           <Route path="/editgoods" element={<EditGoods />} />
           <Route path="/editgoods/:id" element={<EditGoods />} />
           <Route path="/addshop" element={<EditShop />} />
           <Route path="/editshop/:id" element={<EditShop />} />
           <Route path="/classmanager" element={<ClassManager />} />
           <Route path="/404" element={<Error404 />} />
           <Route path="*" element={<Navigate to="/404" />}/>
        </Routes>
    )  
}

export default RouterView