import React from 'react'
import './css/Home.css'

const Home = () => {
  return (
    <div className="home-container">
        <div>
            <p className="Home-Title">CEDS - Common Education Data Store</p>
            <p className="Home-Welcome">Welcome</p>
        </div>
        <div className="Home-Info">
            <pre className="Home-Info1">Upload your data set.  Create a data model.  Store data on the cloud.</pre>
        </div>
    </div>
  );
};

export default Home;