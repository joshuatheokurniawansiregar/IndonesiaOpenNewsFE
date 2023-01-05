import { SideNavigationBar } from "../layouts/SideNavBar";
import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export function NewsPage() {
    // const [authors, setAuthors] = useState();
    // useEffect(() => {
    //     getAuthors();
    // }, []);
    // const getAuthors = async () => {
    //     const authors = await axios.get("http://127.0.0.1:8000/api/authors");
    //     setAuthors(authors.data);
    // }
    // console.log(authors);
    return (
        <>
            <div className="main-side">
                {/* {
                    authors.map((data, key) => {
                        return (
                            <><h1>TestSSSS</h1>
                                <p>{data.id}</p>
                            </>
                        )
                    })
                } */}
                <div style={{ border: "2px solid black", marginTop: "5px", marginBottom: "5px", width: "100%" }}>
                    <h5 className="center-auto">News Table</h5>
                </div>
                <div className="row-custom background-aliceblue">
                    <div className="col-custom-4 flex-custom-custom flex-justify-content-around-custom align-items-baseline-custom">
                        <label>Filter By Date</label>
                        <div className="flex flex-justify-content-start margin-left-1 flex-column align-items-baseline">
                            {/* <DatePicker selected={this.state.startDate} onChange={this.handleDateChange} /> */}
                            <div className="flex flex-justify-content-around flex-column align-items-start">
                                <label><input type={"radio"} />Created At</label>
                                <label><input type={"radio"} />Updated At</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-custom-4 flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom">
                        <label>Filter By Author</label>
                        <select className="form-control-custom width-70 cursor-pointer">
                            <option className="">Choose an Author </option>
                            <option className="">Joshua Theo Kurniawan Siregar </option>
                            <option className="">AAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAA </option>
                            <option className="">M. Hikmatul Baihaqi Adnan</option>
                        </select>
                    </div>
                    <div className="col-custom-4 flex-custom flex-justify-content-around-custom flex-column-custom">
                        <label>Filter By Keywords</label>
                        <input type="text" className="form-control-custom" />
                    </div>
                    <div className="flex-custom flex-column-custom flex-justify-content-around margin-bottom-1">
                        <button className="btn-custom btn-custom-white center-auto">Confirm Filter</button>
                    </div>
                </div>
                <div className="row-custom h-75hv-w-90">
                    {/* {
                        News.map((data, key) => {
                            return (
                                <div className="col-custom-4 background-grey-1" style={{ border: "1px solid white" }}>
                                    <img style={{ width: "75%", height: "150px" }} src="http://localhost:3000/res/contoh-gambar.png" />
                                    <p>{data.author}</p>
                                    <a href="#" className="link-h5"><span>{data.title_news}</span></a>
                                    <p>Added at: {new Date(data.added_at).toString()}</p>
                                    {
                                        new Date(data.updated_at).toString()
                                    }
                                    <p className="font-body-content">{content_news}</p>
                                    <button className="btn-custom btn-custom-white" style={{ display: "inline-block" }}>
                                        Update
                                    </button>
                                    <button className="btn-custom btn-custom-red" style={{ display: "inline-block", marginLeft: "10px" }}>
                                        Delete
                                    </button>
                                </div>
                            )
                        })
                    } */}
                </div>
            </div>
        </>
    )

}
