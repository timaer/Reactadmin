import './index.scss'
import {Card,Tag,Input,Button,Tabs,Select,Table} from 'element-react'
import {useState,useRef,useEffect} from 'react'
function ClassManager(){
    
     const [dynamicTags,setdynamicTags]=useState([])
     const [inputVisible,setinputVisible]=useState(false)
     const [inputValue,setinputValue]=useState('')
     const [goodslist,setgoodslist]=useState([])
     const [selectgoods,setselectgoods]=useState('')
     const [classgoodslist,setclassgoodslist]=useState([])
     const [currentClass,setcurrentClass]=useState('')
     
     useEffect(()=>{
         window.$post("/goods/getClassList",{}).then((data)=>{
             if(data.result.success){
                 setdynamicTags(data.result.info.classnames)
                 setgoodslist(data.result.info.goodslist)
                 setclassgoodslist(data.result.info.classgoodslist)
                 setcurrentClass(data.result.info.classnames.length>0?data.result.info.classnames[0]:'')
             }else{
                 window.$msg(data.result.info)
             }  
         })     
     },[])
     const saveTagInput=useRef(null)
     const onKeyUp=(e)=>{ 
        if (e && e.keyCode === 13) {
          handleInputConfirm();
        }
    }
      
    const onChange=(value)=>{
        setinputValue(value)
      }
      
    const handleClose=(index,tag)=>{
        window.$post("/goods/delGoodsClass",{classname:tag}).then((data)=>{
            if(data.result.success){
                window.$msg(data.result.info,'success')
                let leftTags=dynamicTags.filter((tag,key)=>key!==index)
                setdynamicTags(leftTags)
            }else{
                window.$msg(data.result.info)
            }
        })
      }
      
    const showInput=()=>{
        setinputVisible(true)
        saveTagInput.current && saveTagInput.current.focus();
      }
      
    const handleInputConfirm=()=>{
        window.$post("/goods/addGoodsClass",{classname:inputValue}).then((data)=>{
            if(data.result.success){
                window.$msg(data.result.info,'success')
                let newTagArr=dynamicTags
                newTagArr.push(inputValue)
                setdynamicTags(newTagArr)
                setinputVisible(false)
                setinputValue('')
            }else{
                window.$msg(data.result.info)
            }
        })
      }

    const removeClassGoods=(item)=>{
        window.$post("/goods/delClassGoods",{classname:currentClass,goodsid:item.id}).then((data)=>{
           if(data.result.success){
               window.$msg("????????????",'success')
               setclassgoodslist(data.result.info)
           }else{
               window.$msg(data.result.info)
           }
        })
    }  
    const columns=[
          {
            label: "?????????",
            render:(item)=>{
              return <img src={item.headimg} alt='pic' className='headimg'/>
            } 
          },
          {
            label: "??????",
            prop: "name"
          },
          {
            label: "??????",
            render:(item)=>{
              return  <Button type="danger" onClick={()=>{removeClassGoods(item)}}>??????</Button>
            }
          }
    ]  
    
    const toggleClass=(tabname)=>{
          setcurrentClass(tabname)
          window.$post("/goods/getClassGoodsList",{classname:tabname}).then((data)=>{
               if(data.result.success){ 
                  setclassgoodslist(data.result.info)
               }else{
                  window.$msg(data.result.info)
               }
          })
    }

    const addToClass=()=>{
         if(selectgoods===''){
            window.$msg("??????????????????");return false;
         }
         window.$post("/goods/addToGoodsClass",{goodsid:selectgoods,classname:currentClass}).then((data)=>{
             if(data.result.success){
                window.$msg("??????????????????","success")
                setclassgoodslist(data.result.info)
             }else{
                window.$msg(data.result.info)
             }
         })
    }
    const tabPanList=dynamicTags.map((item)=><Tabs.Pane label={item} name={item} key={item}></Tabs.Pane>)
    const tabContent=tabPanList.length>0?<Tabs activeName={dynamicTags[0]} onTabClick={ (tab) => {toggleClass(tab.props.name)}}>{tabPanList}</Tabs>:<></>
    const tabPage=(<>
                    {tabContent}  
                    <div className='classgoods'>
                    <Select value={selectgoods} placeholder="?????????" onChange={(value)=>setselectgoods(value)}>
                        {
                        goodslist.map(el => {
                            return <Select.Option key={el.id} label={el.name} value={el.id} />
                        })
                        }
                    </Select>
                    <Button type="primary" icon="plus" onClick={()=>addToClass()} >??????????????????</Button>
                    <Table
                        style={{width: '100%'}}
                        columns={columns}
                        data={classgoodslist}
                    />
                    </div>
                 </>)
    return(
      <div id='classmanager'>
      <Card
      className="box-card"
      header={
        <div className="clearfix">
          <span style={{ "lineHeight": "36px" }}>
          <div>
            {
                dynamicTags.map((tag, index) => {
                return (
                    <Tag
                    key={Math.random()}
                    closable={true}
                    closeTransition={false}
                    onClose={()=>handleClose(index,tag)}>{tag}</Tag>
                )
                })
            }
            {
                inputVisible ? (
                <Input
                    className="input-new-tag"
                    value={inputValue}
                    ref={saveTagInput}
                    onChange={(value)=>onChange(value)}
                    onKeyUp={(e)=>onKeyUp(e)}
                    onBlur={()=>handleInputConfirm()}
                />
                ) : <Button className="button-new-tag" size="small" onClick={()=>showInput()}>+ ????????????</Button>
            }
            </div>
          </span>
        </div>
      }
     >
     {tabPage}
    </Card>
    </div>  
    )
}

export default ClassManager