import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export function Home() {
    const [topics, setTopics] = useState([]);
    const [subtopics, setSubTopics] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [news, setNews] = useState([]);
    const [unchangedNews, setUnchangedNews] = useState([]);
    const [filteredNewsByDate, setFilteredNewsByDate] = useState([]);
    const [filterDate, setFilterDate] = useState(new Date());
    useEffect(() => {
        async function getTopics() {
            const topics = await axios.get("http://127.0.0.1:8000/api/topics");
            setTopics(topics.data.topics);
        }
        async function getSubTopics() {
            await axios("http://127.0.0.1:8000/api/sub_topics").then(response => {
                setSubTopics(response.data.sub_topics);
            });
        }
        async function getAuthors() {
            const authors = await axios.get("http://127.0.0.1:8000/api/authors");
            setAuthors(authors.data);
        }
        async function getNews() {
            await axios.get("http://127.0.0.1:8000/api/news").then(response => {
                setNews(response.data);
                setUnchangedNews(response.data);
            });
        }

        if (localStorage.getItem("user")) {
            setTimeout(function () {
                getTopics();
                getSubTopics();
                getAuthors();
                getNews();
            }, 1);
        }
    }, []);
    const handleDateChange = (date) => {
        setFilterDate(date);
        console.log(date);
    }
    useEffect(() => {
        filterByDateAt(news);
        filterNewsByAuthorNames();
    });
    const filterByDateAt = (sorted_news) => {
        const radioButtons = document.querySelectorAll(".filterd-by-date");
        let sorted = null;
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].addEventListener("change", function (param) {
                if (param.target) {
                    if (param.target.value == "created_at") {
                        sorted = sorted_news.sort((a, b) => b.added_at - a.added_at);
                    }
                    if (param.target.value == "updated_at") {
                        sorted = sorted_news.sort((a, b) => b.updated_at - a.updated_at);
                    }
                    setNews(sorted);
                }
            });
        }
    }
    const filterNewsByAuthorNames = () => {
        const jsonstringify = JSON.stringify(news);
        const jsonparse = JSON.parse(jsonstringify);
        const filtering = document.getElementById("filter-news-by-authors");
        filtering.addEventListener("input", function (e) {
            const filterednews = news.filter(newss => newss.name === e.target.value);
            // console.group(filterednews);
            if (filterednews.length == 0) {
                setNews(unchangedNews);
            }
            if (filterednews.length != 0) {
                setNews(filterednews);
            }
        });
    }
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "5px", marginBottom: "5px", width: "100%" }}>
                    <h5 className="center-auto">News Table</h5>
                </div>
                <div className="row-custom background-aliceblue">
                    <div className="col-custom-4 flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom">
                        <label>Filtered By Date</label>
                        <div className="flex flex-justify-content-start margin-left-1 flex-column align-items-baseline">
                            <DatePicker selected={filterDate} onChange={handleDateChange} />
                            <span>Sorted By Date</span>
                            <div className="flex flex-justify-content-around flex-column align-items-start">
                                <label><input type={"radio"} value="created_at" name="filtered-by-date" className="filterd-by-date" />Created At</label>
                                <label><input type={"radio"} value="updated_at" name="filtered-by-date" className="filterd-by-date" />Updated At</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-custom-4 flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom">
                        <label>Filter By Author</label>
                        <input id="filter-news-by-authors" className="width-75"></input>
                        {/* <select className="form-control-custom width-70 cursor-pointer" id="filter-news-by-authors">
                            <option value="noselection" >Choose an Author </option>
                            {
                                authors.map((data, key) => {
                                    return (
                                        <option value={data.name} key={key}>{data.name} </option>
                                    )
                                })
                            }
                        </select> */}
                    </div>
                    <div className="col-custom-4 flex-custom flex-justify-content-around-custom flex-column-custom">
                        <label>Filter By Title</label>
                        <input type="text" className="form-control-custom width-75" />
                    </div>
                    <div className="flex-custom flex-justify-content-around-custom margin-bottom-1">
                        <button className="btn-custom btn-custom-white center-auto">Clear Filter</button>
                    </div>
                </div>
                <div className="row-custom h-75hv-w-90">
                    {
                        news.map((data, key) => {
                            let element_updatedat;
                            if (data.updated_at === null) {
                                element_updatedat = "";
                            } else {
                                element_updatedat = <>{new Date(new Date(data.updated_at).toDateString()).toLocaleDateString() + " " + new Date(data.updated_at).toLocaleString('en-US', { weekday: 'long' })}</>
                            }
                            return (
                                <div key={key} className="col-custom-12 background-grey-1" style={{ border: "1px solid white" }}>
                                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-center-custom margin-bottom-2">
                                        <img width={50} height={50} className="rounded-circle" src={data.photo_profile_link} />
                                        <h5 className="margin-left-1">{data.name}</h5>
                                    </div>
                                    <img style={{ maxWidth: "40%", height: "250x", }} className="margin-bottom-2" src={data.news_picture_link} />
                                    {/* <p>{data.author}</p> */}
                                    <a href="#" className="link-h5"><span>{data.news_title}</span></a>
                                    <p>{new Date(new Date(data.added_at).toDateString()).toLocaleDateString() + " " + new Date(data.added_at).toLocaleString('en-US', { weekday: 'long' })}</p>
                                    {element_updatedat}
                                    <p className="font-body-content">{data.news_content}</p>
                                    <button className="btn-custom btn-custom-white" style={{ display: "inline-block" }}>
                                        Update
                                    </button>
                                    <button className="btn-custom btn-custom-red margin-top-2" style={{ display: "inline-block" }}>
                                        Delete
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Topic Table</h5></div>
                <button className="btn-custom btn-custom-red margin-left-2" onClick={() => window.location.replace("/topic/add")}>Add Topic</button>
                <table className="table margin-left-3 width-80 margin-top-1">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="th">Topic ID</th>
                            <th className="th">Topic</th>
                            <th className="th">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topics.map((data, key) => {
                                return (
                                    <>
                                        <tr className="tr" key={key}>
                                            <td className="td">{data.id}</td>
                                            <td className="td">{data.topic_title}</td>
                                            <td className="td"><NavLink to={`/topic/update/${data.topic_slug}`} className="action-button">Update</NavLink>/<NavLink to="#" className="action-button">Delete</NavLink></td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}>
                    <h5 className="center-auto">Sub Topic Table</h5>
                </div>
                <button className="btn-custom btn-custom-emerald margin-left-3">Add Sub Topic</button>
                <table className="table margin-left-3 width-80 margin-top-1">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="th">Sub Topic ID</th>
                            <th className="th">Sub Topic</th>
                            <th className="th">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subtopics.map((data, key) => {
                                return (
                                    <tr className="tr" key={key}>
                                        <td className="td">{data.id}</td>
                                        <td className="td">{data.sub_topic_title}</td>
                                        <td className="td"><NavLink to={`/subtopic/update/${data.sub_topic_slug}`} className="action-button">Update</NavLink>/<button className="action-button">Delete</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}>
                    <h5 className="center-auto">Admin Approval</h5>
                </div>
                <table className="table margin-left-3 width-80 margin-top-1">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="th">Admin Approval ID</th>
                            <th className="th">Author Name</th>
                            <th className="th">Author Description</th>
                            <th className="th">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="tr">
                            <td className="td">1</td>
                            <td className="td">Test</td>
                            <td className="td"><a href="#" className="action-button">Update</a>/<a href="#" className="action-button">Delete</a></td>
                            <td className="td"><a href="#" className="action-button">Update</a>/<a href="#" className="action-button">Delete</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}
