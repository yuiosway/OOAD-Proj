import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'


import Navbar  from './components/Navbar';
import Home from './components/Home';
import Table from './components/Table';
import Option from './components/Options';
import Upload from './components/Upload';
import Login from './components/Login';
import Signup from './components/Signup';

import menuInfo from "./components/menuInfo/menu"



const App = () => {
  const [mainData,setMainData] = useState([{}])
  const [params,setParams] = useState([])


  const [mainParams,setMainParams] = useState([
    {paramName : "Collection.Attribute" , editable : true , delete: false},
    {paramName : "Collection.Attribute.Sub-Attribute-Level-1" , editable : false , delete: false},
    {paramName : "Collection.Attribute" , editable : false , delete: false},
    {paramName : "Collection.Attribute.Sub-Attribute-Level-1.Sub-Attribute-Level-2" , editable : false , delete: false},
    {paramName : "Collection.Attribute" , editable : false , delete: false},
    {paramName : "Collection.Attribute.Sub-Attribute-Level-1.Sub-Attribute-Level-2.Sub-Attribute-Level-3" , editable : false , delete: false}
  ])

  const [menuList,setMenuList] = useState(menuInfo)

  return (
    <div >
      <Navbar/>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/table" element={<Table params={params} 
              setParams={setParams} 
              mainParams = {mainParams} 
              setMainParams = {setMainParams} 
              mainData = {mainData} 
              setMainData = {setMainData}
              menuList = {menuList} 
              setMenuList = {setMenuList}/>} />
          <Route path="/options" element={<Option params={params} 
              setParams={setParams} 
              mainParams = {mainParams} 
              setMainParams = {setMainParams} 
              mainData = {mainData} 
              setMainData = {setMainData}
              menuList = {menuList} 
              setMenuList = {setMenuList}/>} />
          <Route path="/upload" element={<Upload params={params} 
              setParams={setParams} 
              mainParams = {mainParams} 
              setMainParams = {setMainParams} 
              mainData = {mainData} 
              setMainData = {setMainData}
              menuList = {menuList} 
              setMenuList = {setMenuList}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App