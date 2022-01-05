import {useState,useEffect} from 'react'
import {Button,Table} from 'element-react'
import {useNavigate} from 'react-router-dom'
function ShopList(){
    let navigate=useNavigate()
    const [shoplist,setshoplist]=useState([])
    const getList=()=>{
       window.$post("/shop/getShopList",{}).then((data)=>{
           if(data.result.success){
               setshoplist(data.result.info)
           }else{
              window.$msg(data.result.info)
           }
       })
    }

    useEffect(()=>{
       getList()  
        // eslint-disable-next-line  
    },[])

    const editShop=(item)=>{
        navigate("/editshop/"+item.id)
    }

    const delShop=()=>{

    }
    const columns=[
        {
          label:'缩略图',
          render:(item)=>{
             return <img src={item.headimg} alt='pic' className='headimg'/> 
          }
        },
        {
           label:'店铺ID',
           prop:'id'
        },
        {
            label:'店铺名称',
            prop:'name'
        },
        {
            label:'地址',
            prop:'address'
        },
        {
            label:'经营范围',
            prop:'business'
        },{
            label:'创建时间',
            render:(item)=>{
               return window.$timeToDate(item.createtime)
            }
        },{
            label:'操作',
            render:(item)=>{
              return (
                <Button.Group>
                  <Button type="primary" onClick={()=>editShop(item)}>编辑</Button>
                  <Button type="danger" onClick={()=>delShop(item)}>删除</Button>
                 </Button.Group>
              )
            }
        }
    ]

    return(
        <div id='shoplist'>
            <Table
                style={{width: '100%'}}
                columns={columns}
                data={shoplist}
                stripe={true}
                />
        </div>
    )
}
export default ShopList