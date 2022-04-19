import React, { useState } from "react";
import "./App.css";
import './styles.scss';
import TreeMap from "react-d3-treemap";
// Include its styles in you build process as well
import "react-d3-treemap/dist/react.d3.treemap.css";
import ReactResizeDetector from 'react-resize-detector';
import { FaPen, FaDownload } from 'react-icons/fa';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
import { OBJModel } from 'react-3d-viewer';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleState: 1,
            toggleUploader: true,
            statValues: [89, 2, 12],
            statText: ['Material Definitions', 'CO2e Definitions', 'Material Energy']
        }
    }
    toggleTab(index) {
        this.setState({
            toggleState: index
        });
    }

    toggleDis(index) {
        this.setState({
            statValues: [51, 23, 25],
            statText: ["A", "B", "C"]
        });
    }

    toggleUploaded(index) {
        this.setState({
            toggleUploader: false
        });
    }

    componentDidMount() {
        console.log('started...')
    }

    onFileUpload = () => {
        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        // Request made to the backend api 
        // Send formData object 
        // axios.post("api/uploadfile", formData); 
    };

    render() {

        let exampledata = {
            name: "IFC Components",
            children: [
                { name: "IFCWALLSTANDARDCASE", value: 69 },
                { name: "IFCDOOR", value: 54 },
                { name: "IFCPLATE", value: 132 },
                { name: "IFCSLAB", value: 13 },
                { name: "IFCRAILING", value: 11 },
                { name: "IFCCOLUMN", value: 3 },
                { name: "IFCMEMBER", value: 385 },
                { name: "NONE", value: 49 },
            ],
        };

        let exampledata2 = {

            name: "IFC Materials",

            children: [

                { name: "Glass", value: 146 },

                { name: "Aluminium", value: 351 },

                { name: "Metal - Stainless Steel", value: 1 },

                { name: "Metal - Painted - Grey", value: 1 },

                { name: "Door - Frame", value: 40 },

                { name: "Door - Panel", value: 40 },

                { name: "Paint - Sienna", value: 13 },

                { name: "Wood - Birch - Solid Stained Light Low Gloss", value: 13 },

                { name: "Wood - Birch", value: 22 },

                { name: "Metal - Steel 43-275", value: 1 },

                { name: "Unnamed", value: 2 },

            ],

        };

        return (
            <div className="container">
                <div className="bloc">
                    <div className="bloc-logo">
                        .lca
                    </div>
                    <div className="bloc-tabs">

                        <button
                            className={this.state.toggleState === 1 ? "tabs active-tabs" : "tabs"}
                            onClick={this.toggleTab.bind(this, 1)}>
                            Project
                        </button>
                        <button
                            className={this.state.toggleState === 2 ? "tabs active-tabs" : "tabs"}
                            onClick={this.toggleTab.bind(this, 2)}>
                            New
                        </button>
                        <button
                            className={this.state.toggleState === 3 ? "tabs active-tabs" : "tabs"}
                            onClick={this.toggleTab.bind(this, 3)}>
                            About
                        </button>
                        <button
                            className={this.state.toggleState === 4 ? "tabs active-tabs" : "tabs"}
                            onClick={() => window.open("https://github.com/dead-water/cdbbhack", "Popup")}>
                            GitHub
                        </button>
                    </div>
                </div>

                <div className="wrapper">
                    <div className={this.state.toggleState === 1 ? "content active-content" : "content"}>
                        {this.state.toggleUploader ?
                            <div className="uploader" style={{ margin: 20 }}>
                                <div style={{ width: 500, margin: '0 auto' }}>
                                    <p style={{ textAlign: 'left', fontWeight: 400 }}>
                                        IFC explorer which aims to extract relevant information from a 3D model which can then be fed to a life cycle analysis (LCA) dashboard. Our product can be used to generate detailed building passports, keeping a track of building updates and repairs without losing the original information (like version control).
                                    </p>
                                </div>

                                <p>Create New</p>

                                <input type="file" onChange={this.onFileChange} accept=".ifc" />
                                <button style={{ padding: 10, borderRadius: 10 }} onClick={this.toggleUploaded.bind(this, 1)}>UPLOAD</button>
                                {/* <button style={{ padding: 10, borderRadius: 10 }} onClick={this.onFileUpload.bind(this)}>UPLOAD</button> */}
                            </div>
                            :
                            // <div style={{ width: '100%', padding: 10 }}>
                            //     <TreeMap
                            //         id="myTreeMap"
                            //         width={500}
                            //         height={400}
                            //         data={exampledata}
                            //         valueUnit={"CO2e"}
                            //     />
                            // </div>

                            <div style={{ width: '100%', padding: 20 }}>

                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ color: '#333', paddingRight: 20 }}>File version: <span style={{ background: 'orange', borderRadius: 10, padding: 5 }}>0.0.1</span></span>
                                    <span style={{ paddingRight: 10, fontWeight: 500 }}>Discipline:</span>
                                    <select name="cars" id="cars">
                                        <option value="volvo">Designer</option>
                                        <option value="saab" onClick={this.toggleDis.bind(this, 1)}>Contractor</option>
                                        <option value="mercedes">Maintainer</option>
                                        <option value="audi">Asset Owner</option>
                                    </select>
                                    {/* <div class="dropdown">
                                        <button class="dropbtn">Dropdown</button>
                                        <div class="dropdown-content">
                                            <a href="#">Link 1</a>
                                            <a href="#">Link 2</a>
                                            <a href="#">Link 3</a>
                                        </div>
                                    </div> */}
                                </div>

                                <h3 style={{ marginTop: 10, fontWeight: 600 }}>Name of Project <FaPen style={{ cursor: 'pointer' }} size={14} /></h3>
                                <h4 style={{ textAlign: 'left' }}>Visualisation</h4>
                                <div style={{ width: '100%' }}>
                                    <ReactResizeDetector handleWidth handleHeight>
                                        {({ width, height }) => <div><OBJModel
                                            width={width} height="400"
                                            position={{ x: 0, y: 0, z: 0 }}
                                            src="./sama.obj"
                                        // onLoad={() => {
                                        //     //...
                                        // }}
                                        // onProgress={xhr => {
                                        //     //...
                                        // }}
                                        /></div>}
                                    </ReactResizeDetector>

                                </div>

                                <h4 style={{ textAlign: 'left' }}>Executive Summary</h4>

                                <div style={{ width: 540, display: 'inline-block' }}>
                                    <div style={{ width: 160, height: 220, marginRight: 30, display: 'inline-block' }}>

                                        <AnimatedProgressProvider
                                            valueStart={0}
                                            valueEnd={this.state.statValues[0]}
                                            duration={1.4}
                                            easingFunction={easeQuadInOut}
                                            style={{ display: 'inline-block' }}
                                        >
                                            {value => {
                                                const roundedValue = Math.round(value);
                                                return (
                                                    <div>
                                                        <CircularProgressbar
                                                            value={value}
                                                            text={`${roundedValue}%`}
                                                            /* This is important to include, because if you're fully managing the
                                                        animation yourself, you'll want to disable the CSS animation. */
                                                            styles={buildStyles({ pathTransition: "none" })}
                                                        />
                                                        <div style={{ fontSize: 24 }}>{this.state.statText[0]}</div>
                                                    </div>
                                                );
                                            }}
                                        </AnimatedProgressProvider>
                                    </div>
                                    <div style={{ width: 160, height: 220, marginRight: 30, display: 'inline-block' }}>
                                        <AnimatedProgressProvider
                                            valueStart={0}
                                            valueEnd={this.state.statValues[1]}
                                            duration={1.4}
                                            easingFunction={easeQuadInOut}
                                            style={{ display: 'inline-block' }}
                                        >
                                            {value => {
                                                const roundedValue = Math.round(value);
                                                return (
                                                    <div>
                                                        <CircularProgressbar
                                                            value={value}
                                                            text={`${roundedValue}%`}
                                                            /* This is important to include, because if you're fully managing the
                                                        animation yourself, you'll want to disable the CSS animation. */
                                                            styles={buildStyles({ pathTransition: "none" })}
                                                        />
                                                        <div style={{ fontSize: 24 }}>{this.state.statText[1]}</div>
                                                    </div>
                                                );
                                            }}
                                        </AnimatedProgressProvider>
                                    </div>
                                    <div style={{ width: 160, height: 220, display: 'inline-block' }}>
                                        <AnimatedProgressProvider
                                            valueStart={0}
                                            valueEnd={this.state.statValues[2]}
                                            duration={1.4}
                                            easingFunction={easeQuadInOut}
                                            style={{ display: 'inline-block' }}
                                        >
                                            {value => {
                                                const roundedValue = Math.round(value);
                                                return (
                                                    <div>
                                                        <CircularProgressbar
                                                            value={value}
                                                            text={`${roundedValue}%`}
                                                            /* This is important to include, because if you're fully managing the
                                                        animation yourself, you'll want to disable the CSS animation. */
                                                            styles={buildStyles({ pathTransition: "none" })}
                                                        />
                                                        <div style={{ fontSize: 24 }}>{this.state.statText[2]}</div>
                                                    </div>
                                                );
                                            }}
                                        </AnimatedProgressProvider>
                                    </div>
                                </div>

                                <h4 style={{ textAlign: 'left', marginTop: 20 }}>Components</h4>
                                <ReactResizeDetector handleWidth handleHeight>
                                    {({ width, height }) => <div>
                                        {/* {`${width}x${height}`} */}
                                        <TreeMap
                                            id="myTreeMap"
                                            width={width}
                                            height={400}
                                            data={exampledata}
                                            valueUnit={"CO2e"}
                                        />
                                    </div>}
                                </ReactResizeDetector>

                                <h4 style={{ textAlign: 'left', marginTop: 20 }}>Materials</h4>
                                <ReactResizeDetector handleWidth handleHeight>
                                    {({ width, height }) => <div>
                                        {/* {`${width}x${height}`} */}
                                        <TreeMap
                                            id="myTreeMap"
                                            width={width}
                                            height={400}
                                            data={exampledata2}
                                            valueUnit={"CO2e"}
                                        />
                                    </div>}
                                </ReactResizeDetector>
                                <div style={{ marginTop: 10, textAlign: 'right' }}>
                                    <button style={{ padding: 10, borderRadius: 10 }}>DOWNLOAD .lca <FaDownload /></button>
                                </div>
                            </div>

                        }

                    </div>
                    <div className={this.state.toggleState === 2 ? "content active-content" : "content"}>
                        Create New
                    </div>
                    <div className={this.state.toggleState === 3 ? "content active-content" : "content"}>
                        About Us

                        FIBE is a CDT based in the University of Cambridge Engineering Dept
                    </div>
                </div >


            </div >
        )
    }
}

export default Tabs;