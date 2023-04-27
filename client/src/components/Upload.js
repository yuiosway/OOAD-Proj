import { React } from "react";
import { Typography } from "@mui/material";

import './css/Form.css';


const Upload = (props) => {

    return (
        <div className="form-wrapper">
            <div className="header">
                <Typography variant="overline">
                    <h1>Upload</h1>
                </Typography>
            </div>
            <div className="form" id="form1">
                <form className="register-form" id="register-form" method ="POST" action="/push" enctype="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="url">
                            Choose file to Upload to Server:
                        </label>
                    </div>
                    <div className="form-group">
                        <input type="file" name="file" id="file" className="form-submit"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" name="login" id="login" className="form-submit" value = "Upload"/>
                    </div>
                </form>
            </div>
    </div>
    )
}


export default Upload;

