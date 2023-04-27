import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import { Button, Switch, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import './css/Table.css'

const Options = (props) => {
    var path = [];

    useEffect(() => {
        console.log('render');
    },[]); 

    //function for handling edit of the column name
    //on a prompt
    const handleEdit = (e,item,i) => {
            const newParamsData = props.mainParams.slice();
            if (e.target.checked === false) {
                    newParamsData[i]['editable'] = false;
                    props.setMainParams(newParamsData);
            } else if (e.target.checked === true) {
                    newParamsData[i]['editable'] = true;
                    props.setMainParams(newParamsData);
            }
    }

    //function for adding a key to each object in the data
    const addToData = (e) => {
        props.setMainData(s => {
            const newData = s.slice();
            for (let i = 0 ; i < newData.length ; i++) {
                newData[i][e] = ''; 
            }
            return newData;
        })
    }


    //function for adding the param to the mainParams list
    const addToParamData = (e) => {
        props.setMainParams(s => {
            const param = {paramName : '' , editable:true , comment : ''}
            const newParams = s.slice();
            param['paramName'] = e;
            newParams.push(param);
            return newParams;
        })
    }
    

    //function for asking whether the user wants to add a column(paramName)
    const promptParam = () => {
        const tempParam = prompt('please enter the new Column name')

        if (tempParam === '') {
            return
        } else {
            addToParamData(tempParam);
            addToData(tempParam);
        }
    }

    //function for removing the entire parameter
    const deleteParam = (item,n) => {
        const newParamsData = props.mainParams;
        for (let i = 0; i < newParamsData.length ; i++) {
            if (newParamsData[i] === item) {
                props.setMainParams(s => {
                    const newParams = s.slice();
                    newParams.splice(i,1);
                    return newParams;
                })
            }
        }
    }

    //function for editing the comment for the column 
    const editComment = (item) => {
        let tempParam = prompt("please enter the comment for the column : ");
        
        if (tempParam === null) {
            return 
        } else {
            for (let i = 0; i< props.mainParams.length ; i++) {
                if  (props.mainParams[i] === item) {
                    props.setMainParams(s => {
                        const newParams = s.slice();
                        newParams[i]['comment'] = tempParam
                        return newParams;
                    })
                }
            }
        }
    }



    //function for changing the name of the column(paramName) 
    //it also changes the name of the param in the data for each of the json object
    const editParam = (item, n, fullPath) => {
        let tempParam = fullPath;
        if (tempParam === null) {
            return 
        } else {
            console.log(props.mainParams[n]["paramName"]);
            props.setMainData(s => {
                const newData = s.slice();
                for (let i = 0 ; i < props.mainData.length ; i++) {
                    const item = newData[i]
                    item[tempParam] = item[props.mainParams[n]['paramName']]
                    delete item[props.mainParams[n]['paramName']]
                }
                return newData
            })
            for (let i = 0; i< props.mainParams.length ; i++) {
                if  (props.mainParams[i] === item) {
                    props.setMainParams(s => {
                        const newParams = s.slice();
                        newParams[i]['paramName'] = tempParam
                        return newParams;
                    })
                }
            }
        }
    }


    

    // function to return column header as a path string
    const getPath = (path) => {
        let fullPath = "";
        for(let pos = 0 ; pos < path.length ; pos++) {
            fullPath += (path[pos].toString());
            if(pos !== (path.length - 1)){
                fullPath += ".";
            }
        }
        return fullPath;
    }

    // function to create drop down

    const getDD = (subMenu, sub, item, i, path) => {
        return (
            subMenu[sub].map((subAttribute, index) => {
                path.push(subAttribute);
                if(subMenu[subAttribute] != null){
                    if(subMenu[subAttribute].length === 0) {
                        let nextMenu = 
                        (
                            <Dropdown.Menu 
                                title={subAttribute}
                                eventKey = {subAttribute}
                            >{subAttribute}
                                <Dropdown.Item eventKey = {getPath(path)}  onSelect = {(eventKey, event) => editParam(item, i, eventKey)}  >Set as path</Dropdown.Item>
                                {createAttribute(subAttribute)} 
                            </Dropdown.Menu>  
                        )
                        path.pop();
                        return nextMenu

                    }else {
                        let nextMenu = 
                        (
                            <Dropdown.Menu 
                                title={subAttribute}
                                eventKey = {subAttribute}
                            >{subAttribute}
                                {getDD(subMenu, subAttribute, item, i, path)}
                                {createAttribute(subAttribute)} 
                            </Dropdown.Menu>  
                        )
                        path.pop();
                        return nextMenu
                    }
                } else {
                    let nextMenu = 
                    (
                        <Dropdown.Menu 
                            title={subAttribute}
                            eventKey = {subAttribute}
                        >{subAttribute}
                            <Dropdown.Item eventKey = {getPath(path)}  onSelect = {(eventKey, event) => editParam(item, i, eventKey)}  >Set as path</Dropdown.Item>
                            {createAttribute(subAttribute)} 
                        </Dropdown.Menu>  
                    )
                    path.pop();
                    return nextMenu
                }
            })
        )
    }


    
    // function to return menu item to create new attribute

    const createAttribute = (path) => {
        let nextItem =
        (
            <Dropdown.Item>
                <Button className="add-atr-button" onClick = {() => setAttribute(path)}>
                    <AddIcon />New Attribute
                </Button>
            </Dropdown.Item>
        )
        return nextItem;
    }

   //function to create new attribute

    const setAttribute = (path) => {
        var attribute = prompt('Attribute Name:');
        if (attribute.length === 0) {
            return
        } else {
            appendToMenuList(path, attribute);
        }
    }

     // function to add new attribute to the dropdown menu

    const appendToMenuList = (upper, attribute) => {
        props.setMenuList(s => {
            var newList = s.slice();
            newList.forEach(element => {
                if(element.col_name === upper){
                    element.attributes.push(attribute);
                    element[attribute] = [];
                } else if (element[upper]) {
                    element[upper].push(attribute);
                    element[attribute] = [];
                }
            });
            return newList;
        })
    }
    
    // function to return menu item to create new collection
    
    const createCollection = () => {
        let nextItem =
        (
            <Dropdown.Item>
                <Button className="add-atr-button" onClick={() => setCollection()}>
                    <AddIcon />New Collection
                </Button>
            </Dropdown.Item>
        )
        return nextItem;
    }

    //function to create new collection

    const setCollection = () => {
        var collection = prompt('Collection Name:');
        if (collection.length === 0) {
            return
        } else {           
            addToMenuList(collection);
        }
    }

    // function to add new collection to the dropdown menu

    const addToMenuList = (e) => {
        props.setMenuList(s => {
            const entry  = {
                "col_name": "",
                "attributes": [
                    
                ]
            };
            const newList = s.slice();
            entry['col_name'] = e;
            newList.push(entry);
            return newList;
        })
    }



    




    return(
        <div className="wrapper">
            <div className="tablewrapper">
                <Box >
                    <Typography variant="overline" >
                        <h1>Options</h1>
                        <h4>Map to Database</h4>
                        Map dataset columns to data model using the Select Dropdown Menu.
                    </Typography>
                </Box>
                <Box className = "table-container">
                        <table className = "table-main-options">
                            <thead>
                                <tr class="header-row">
                                    <th>
                                        <div class = "header-container">
                                            <p className = "column-headers">
                                                Column name
                                            </p>   
                                        </div>
                                    </th>
                                    <th>
                                        <div class = "header-container">
                                            <p className = "column-headers">
                                                Map to database
                                            </p>   
                                        </div>
                                    </th>
                                    <th>
                                        <div class = "header-container">
                                            <p className = "column-headers">
                                                Editable
                                            </p>   
                                        </div>
                                    </th>
                                    <th>
                                        <div class = "header-container">
                                            <p className = "column-headers">
                                                Delete Column
                                            </p>   
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="body-rows">
                                {props.mainParams.map((item,i) => (
                                    <tr key={i} className="options-cell">
                                        <td key="paramN"><p className = "row-headers" >{item['paramName']}</p></td>
                                        <td className="options-data">
                                            <div>
                                                <Dropdown className = "mainDD1" title="Choose a collection">
                                                    {props.menuList.map((collection, index) => {
                                                        path.push(collection.col_name);
                                                        let menu =
                                                        (
                                                            <Dropdown.Menu title={collection.col_name}>{collection.col_name}
                                                                {getDD(collection, "attributes", item, i, path)}
                                                                {createAttribute(collection.col_name)} 
                                                            </Dropdown.Menu>
                                                        )
                                                        path.pop();
                                                        return menu;
                                                    })}
                                                    {createCollection()}
                                                </Dropdown>
                                            </div>
                                        </td>
                                        <td><Switch checked={item['editable']} onChange={(e) => handleEdit(e,item,i)}   /></td>
                                        <td><Button variant="outlined" sx={{color: "#ffffff", backgroundColor:"#333333"}} size="small"  onClick={() => deleteParam(item,i)}><DeleteIcon /></Button></td>
                                    </tr>
                                )
                                )}
                                <tr>
                                    <td className = "options-new-col-td">
                                        <button className="button-new-entry-1 button--primary full-width" onClick={promptParam}><AddIcon />add column</button>
                                    </td>
                                    <td className = "options-new-col-td"><Typography variant="h5"  >-</Typography></td>
                                    <td className = "options-new-col-td"><Typography variant="h5"  >-</Typography></td>
                                    <td className = "options-new-col-td"><Typography variant="h5"  >-</Typography></td>
                                </tr>
                            </tbody>
                        </table>
                </Box>
            </div>
        </div>
            
    )
}

export default Options;