import {Form,Input,Select,Switch,Button,Upload,Dialog} from 'element-react'
import {useState,useEffect,useRef} from 'react'
import {useParams,useNavigate} from 'react-router-dom'

function EditGoods(){
    let navigate=useNavigate()
    const {id}=useParams()
  
    const [name,setname]=useState('')
    const [desc,setdesc]=useState('')
    const [dashprice,setdashprice]=useState('')
    const [price,setprice]=useState('')
    const [stock,setstock]=useState('')
    const [ishot,setishot]=useState(false)
    const [goodsclass,setgoodsclass]=useState([])
    const [selectedclass,setselectedclass]=useState('')
    const [magpicVisible,setmagpicvisible]=useState(false)
    const [magpicurl,setmagpicurl]=useState('')
    const [headimg,setheadimg]=useState('')
    const [slides,setslides]=useState([])
    const [uploadcon,setuploadcon]=useState(null)

    const refHeadImg=useRef(null)
    const refSlides=useRef(null)
    const clearImgCache=()=>{
        refHeadImg.current && refHeadImg.current.clearFiles()
        refSlides.current && refSlides.current.clearFiles()
    }

    useEffect(()=>{
        window.$post('/goods/getGoodsInfo',{goodsid:id}).then((data)=>{
           if(data.result.success){
               let initData=data.result.info
               let goodsclasscon=initData.goodsclass.map((item)=><Select.Option label={item.name} value={item.id} key={item.id}></Select.Option>)
               setgoodsclass(goodsclasscon)
               const filelist=initData.filelist
               let uploadcontent=(  //由于react element没有自动刷新fileList ，只能在这里一次性设置
                 <>       
                  <Form.Item label='缩略图'>
                    <Upload
                        name='image'
                        action={process.env.REACT_APP_IMG_UPLOAD_URL}
                        listType="picture-card"
                        onPreview={file => handlePreview(file)}
                        onRemove={(file, fileList) => handleRemove(file, fileList)}
                        limit={1}
                        onExceed={()=>window.$msg('超出最大上传数')}
                        onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'headimg')}	
                        fileList={filelist['headimg']}
                        ref={refHeadImg}
                    >
                       <i className="el-icon-plus"></i>
                    </Upload>
                </Form.Item>
                <Form.Item label='轮播图'>
                    <Upload
                        name='image'
                        action={process.env.REACT_APP_IMG_UPLOAD_URL}
                        listType="picture-card"
                        onPreview={file =>handlePreview(file)}
                        onRemove={(file, fileList) =>handleRemove(file, fileList)}
                        onSuccess={(response,file,fileList)=>handleUploadOk(response,file,fileList,'slides')}	
                        fileList={filelist['slides']}
                        ref={refSlides}
                    >
                      <i className="el-icon-plus"></i>
                    </Upload>
                </Form.Item>
                </>
               )
               setuploadcon(uploadcontent)
               if(id>0){
                 setname(initData.goodsinfo.name)
                 setdesc(initData.goodsinfo.desc)
                 setdashprice(initData.goodsinfo.dashprice)
                 setprice(initData.goodsinfo.price)
                 setstock(initData.goodsinfo.stock)
                 setishot(initData.goodsinfo.ishot)
                 setselectedclass(initData.goodsinfo.classid)
                 setheadimg(initData.goodsinfo.headimg)
                 setslides(initData.goodsinfo.slides)
               }else{
                clearImgCache()   
                setname('')
                setdesc('')
                setdashprice("")
                setprice("")
                setstock("")
                setishot(false)
                setselectedclass("")
               }
           }else{
               window.$msg(data.result.info)
           }
        })  
    },[id])

    const saveGoods=()=>{
       
        if(name===''||desc===''||dashprice===''||isNaN(dashprice)||parseInt(dashprice)<0||price===''||isNaN(price)||parseInt(price)<0||selectedclass===''||headimg===''||slides.length<=0){
            window.$msg('你有表单项没有填全，请核查','error');
            return false;
        }
        let goodsinfo={}
            goodsinfo.id=id===undefined?0:id
            goodsinfo.name=name
            goodsinfo.desc=desc
            goodsinfo.dashprice=dashprice
            goodsinfo.price=price
            goodsinfo.stock=stock
            goodsinfo.ishot=ishot?1:0
            goodsinfo.classid=selectedclass
            goodsinfo.headimg=headimg
            goodsinfo.slides=slides

            window.$post('goods/saveGoods',{goodsinfo:goodsinfo}).then((data)=>{
                if(data.result.success){
                    window.$msg(data.result.info,'success')
                    setTimeout(()=>{navigate('/goodslist')},500)
                }else{
                    window.$msg(data.result.info)
                }
            })
    }

    const handlePreview=(file)=>{
        setmagpicurl(file.url)
        setmagpicvisible(true)
    }

    const handleRemove=(file,fileList)=>{
        console.log(file, fileList);
    }

    const handleUploadOk=(data,file,fileList,type)=>{
       if(type==='headimg'){
          setheadimg(data.result.info.url)
       }else if(type==='slides'){
          let imgslides=fileList.map((item)=>item.response.result.info.url)
          setslides(imgslides)
       }  
    }
    return(
        <div id='editgoods'>
            <Form labelWidth="80">
                <Form.Item label="商品名称">
                    <Input value={name} onChange={(value)=>setname(value)}></Input>
                </Form.Item>
                <Form.Item label="商品简介">
                    <Input type="textarea" value={desc} onChange={(value)=>setdesc(value)}></Input>
                </Form.Item>
                <Form.Item label="零售价格">
                    <Input value={dashprice} onChange={(value)=>setdashprice(value)}></Input>
                </Form.Item>
                <Form.Item label="商品价格">
                    <Input value={price} onChange={(value)=>setprice(value)}></Input>
                </Form.Item>
                <Form.Item label="商品库存">
                    <Input value={stock} onChange={(value)=>setstock(value)}></Input>
                </Form.Item>
                <Form.Item label="所属分类">
                    <Select value={selectedclass} placeholder="请选择分类" onChange={(value)=>setselectedclass(value)}>
                        {goodsclass}
                    </Select>
                </Form.Item>
                <Form.Item label="是否推荐">
                    <Switch
                    onText=""
                    offText=""
                    value={ishot}
                    onChange={(value)=>setishot(value)}
                    />
                </Form.Item>
                {uploadcon}
                <Form.Item>
                    <Button type="primary" onClick={()=>saveGoods()}>立即保存</Button>
                    <Button onClick={()=>navigate(-1)}>取消</Button>
                </Form.Item>
                <Dialog
                        visible={magpicVisible}
                        size="tiny"
                        onCancel={()=>setmagpicvisible(false)}
                        >
                        <img width="100%" src={magpicurl} alt="" />
                </Dialog>
                </Form>
        </div>
    )
}
export default EditGoods