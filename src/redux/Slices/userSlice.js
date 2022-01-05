import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
export const doLoginAction = createAsyncThunk('user/doLoginAction', async params => {
  const response = await window.$post('/login/doLogin',{username:params.username,password:params.password})
  return response
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token:'',
    powerlist:[],
    ismobile:true,
    bindshopid:''
  },
  reducers: {
    setUserName: (state,action) => {
      state.username = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPowerList:(state,action)=>{
      state.powerlist=action.payload
    },
    setBindShopID:(state,action)=>{
      state.bindshopid=action.payload
    },
    setIsMobile:(state,action)=>{
      state.ismobile=action.payload
    },
    reLogin:(state,action)=>{
      const data=action.payload
      state.username=data.result.info.username
      state.token=data.result.info.token
      state.powerlist=data.result.info.powerlist
      state.ismobile=data.result.info.ismobile
      state.bindshopid=data.result.info.shopid
    },
    doLogout:state=>{
      state.username=''
      state.token=''
      state.powerlist=[]
      state.ismobile=true
    }
  },
  extraReducers:{
    [doLoginAction.fulfilled]:(state,action)=>{
       const data=action.payload
       state.username=data.result.info.username
       state.token=data.result.info.token
       state.powerlist=data.result.info.powerlist
       state.ismobile=data.result.info.ismobile
       state.bindshopid=data.result.info.shopid
    }
  }
});


export const getSecretMobile = state => state.substring(0,5)+"******"


export const { setUserName,setToken,doLogout,reLogin } = userSlice.actions
export default userSlice.reducer