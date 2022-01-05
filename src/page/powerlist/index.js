import './index.scss'
import{Tree,Card,Select,Tag,Button} from 'element-react'
import {useState,useEffect,useRef} from 'react'
import {useDispatch} from 'react-redux'
import {reLogin} from 'redux/Slices/userSlice'
function PowerList(){
    let dispatch=useDispatch()
    const [shopList,setShopList]=useState([])
    const [shopval,setShopVal]=useState('')
    const [treeCon,setTreeCon]=useState(null)
    const refTree=useRef(null)

    const options={
        children: 'children',
        label: 'label'
    }

    useEffect(()=>{
        window.$post("/manager/getPowerInfo",{}).then((data)=>{
            if(data.result.success){
                let shopListCon=data.result.info.shoplist.map((el)=><Select.Option key={el.id} label={el.name} value={el.id} />)
                setShopList(shopListCon)
                setShopVal(data.result.info.bindshopid)
                const treeContent=(
                    <Tree
                        data={data.result.info.treedata}
                        options={options}
                        isShowCheckbox={true}
                        nodeKey="id"
                        defaultExpandedKeys={data.result.info.expanddata}
                        defaultCheckedKeys={data.result.info.checkdata}
                        ref={refTree}
                    />
                )
                setTreeCon(treeContent)
            }else{
                window.$msg(data.result.info)
            }
        })
        // eslint-disable-next-line
    },[])
   
    const handleSelect=(shopid)=>{
          if(shopid!==shopval){
              window.$post("/login/changeBindShop",{shopid:shopid}).then((data)=>{
                  if(data.result.success){
                      dispatch(reLogin(data))
                      window.$msg("切换店铺成功",'success')
                  }else{
                    window.$msg("切换店铺失败",'error')
                  }
              })
          }
    }
    const savePower=()=>{
        const powerlist=refTree.current.getCheckedKeys()
        window.$post("/manager/savePower",{powerlist:powerlist}).then((data)=>{
            if(data.result.success){
                window.$post("/login/reLogin",{}).then((rdata)=>{
                    dispatch(reLogin(rdata))
                    window.$msg("保存权限成功",'success')
                })
            }else{
                window.$msg(data.result.info)
            }
        })
    }
    return(
       <div id='powerlist'>
        
        <Card
        className="box-card"
        header={
          <div className="clearfix">
             <Tag type="success">当前绑定店铺：</Tag>
             <Select value={shopval} placeholder="请选择绑定店铺" onChange={(e)=>handleSelect(e)}>
                {shopList}
            </Select>
            <Button type="primary" className='fr' onClick={()=>savePower()}>保存权限</Button>
          </div>
        }
        >
        {treeCon}
      </Card>
      </div>
    )
}
export default PowerList