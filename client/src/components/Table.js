import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import 'rsuite/dist/rsuite.min.css';
import './css/Table.css'


var XLSX = require('xlsx');

const Table = (props) => {
    
    // function to handle file input
    const handleInput = async (e) => {
        const file = e.target.files[0];
        const newData = await file.arrayBuffer();
        const workbook = XLSX.read(newData);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        props.setMainData(jsonData);
        updateParams();
    }

    //updating the parameters , this function also updates the whole table
    const updateParams =  () => {
        props.setParams(Object.keys(props.mainData[0]))
        const newParamsData = []
        for (let i = 0; i< props.params.length ; i++) {          
            let newParam = {paramName : "" , editable : true , comment : ""}
            newParam['paramName'] = props.params[i];
            newParamsData.push(newParam)
        }
        props.setMainParams(newParamsData);
    }
    
    
    
    //function that handles the changes the value in the data
    //whenever the user makes a change in the text box
    const handleChange = (e,rowData,paramName) => {
        const rowInd = e.target.id
        const colInd = paramName
        props.setMainData(s => {
            const newData = s.slice();
            newData[rowInd][colInd] =e.target.value;
        return newData;
        })
    }
 
    //handling export using sheetjs
    const exportData = () => {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(props.mainData);
        
        XLSX.utils.book_append_sheet(wb,ws,"sheet1");
        XLSX.writeFile(wb,"export.xlsx");
    }
    const getCSV = () => {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(props.mainData);
        XLSX.utils.book_append_sheet(wb,ws,"sheet1");
        XLSX.writeFile(wb, "test.csv", { bookType: "csv" });
    }
    

    // adds a new datapoint(row) to the table
    const addItem = () => {
        props.setMainData(s=> {
            const newItem = {}
            for ( let i = 0 ; i < props.params.length ; i++) {
                newItem[props.params[i]] = '';
            }
            return [...s,newItem]
        } );
    }
    
    // function to display the column header with sub-levels
    const formatColumnName = (name) => {
        let col = name.trim().split(".");
        let text = '';
        let space = "- ";
        let size = col.length;
        col.forEach(function (value, index) { 
            text += value;
            if(index<size-1){
                text += "\n" + space;
            }
            space += "- ";
        });
        return(
            <pre className = "column-headers">
                {text}
            </pre>        
        )

    }

    //function for mapping each element to a textfield
    //each textfield is also connected to the handleChange() function 
    const tdData = () => {
        return props.mainData.map((rowData,i) => {
            return(
                <tr className="tbody-tr">
                    {props.mainParams.map((param,j) => {
                        if (!param['editable']) {
                            return (
                                <td className = "td-label">
                                    <p className = "td_p">{rowData[param['paramName']]}</p>
                                </td>
                        )
                    } else {
                        return (
                            <td className = "td_main">
                                <input 
                                    className = "table-input"
                                    type='text'
                                    id={i}
                                    onChange={(e) => handleChange(e,rowData,param['paramName'])} 
                                    placeholder={rowData[param['paramName']]}>
                                </input>
                            </td>
                        )
                    }
                })}
                </tr>
            )
        })
    }

    return(
        <div className="wrapper">
            <div>
                <Box >
                    <Typography variant="overline" >
                        <h1>Grade center</h1>
                        please enter the grades for the assignments , click on add column for adding a new assignment
                    </Typography>
                </Box>
                <Box className = "table-container">
                    <table className = "table-main">
                        <thead>
                            <tr>
                                {props.mainParams.map((item,i) => (
                                    <th key={i}>
                                        <div class = "header-container">
                                            {formatColumnName(item['paramName'])}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody class="body-rows">
                            {tdData()}
                            <tr>
                                <td style={{border:0}}>
                                    <button className="button-new-entry button--primary full-width" onClick={addItem}>+ Add Entry</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </div>
            <Box>
                <button className="select-file"><input type="file" onChange={handleInput}/></button><br></br>
                <button className="button button--primary full-width" onClick={updateParams}>Update columns</button>
                <button className="button button--primary full-width" onClick={exportData}>Export XLSX</button>
                <button className="button button--primary full-width" onClick={getCSV}>Export CSV</button>
            </Box>
        </div>
    )
}

export default Table;