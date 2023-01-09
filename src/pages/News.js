import { SideNavigationBar } from "../layouts/SideNavBar";
import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useParams } from "react-router-dom";
export function NewsPage() {

    const [posts, setPosts] = useState([]);
    // const [postId, setpostId] = useState("");

    const getPosts = async () => {
        await axios.get("http://127.0.0.1:8000/api/news").then(res => {
            setPosts(res.data)
        })
    };

    const DeletePost = async (id) => {
        // let formdata = new FormData()
        // formdata.append("post_title", postTitle)
        // formdata.append("post_id", postId)
        await axios.delete("http://127.0.0.1:8000/api/news/" + id).then(res => { })
        getPosts();
    }

    useEffect(() => {
        getPosts();
    }, []);
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
                    {/* <button className="btn-custom btn-custom-red margin-left-3 margin-bottom-1" onClick={() => window.location.replace("/news/add")}>Add News</button> */}
                    <table className="table margin-left-3 width-80">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">News ID</th>
                                <th className="th">News Title</th>
                                <th className="th">Name</th>
                                <th className="th">Status</th>
                                <th className="th">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                posts.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="td">
                                                {data.id}
                                            </td>
                                            <td className="td"  >
                                                {data.news_title}
                                            </td>
                                            <td className="td"  >
                                                {data.name}
                                            </td>
                                            <td className="td"  >
                                                {data.news_status}
                                            </td>
                                            <td  >
                                                <a href={`/news/update/${data.id}`} className="action-button">Update</a>/
                                                <button onClick={() => DeletePost(data.id)} className="action-button">Delete</button>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export function AddNews() {
    const [topics, setTopics] = useState([])
    const [subTopics, setSubTopics] = useState([])

    const [topicId, setTopicId] = useState("")
    const [subTopicId, setSubTopicId] = useState("")
    const [newsTitle, setNewsTitle] = useState("");
    const [newsStatus, setNewsStatus] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const AddPost = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("post_title", newsTitle);
        await axios.post('http://127.0.0.1:8000/api/news', formData).then(res => {

        })

    }

    const getSubTopics = async () => {
        await axios.get("http://127.0.0.1:8000/api/sub_topics").then(res => {
            setSubTopics(res.data.sub_topics)
        })
    };
    const getTopics = async () => {
        axios.get('http://127.0.0.1:8000/api/topics').then(res => {
            setTopics(res.data.topics)
        })
    };
    useEffect(() => {
        getSubTopics();
        getTopics();

    }, [])

    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Add Post Form</h5></div>
                <form onSubmit={AddPost} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom margin-top-5">
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">News</label>
                        <input value={newsTitle} onChange={(e) => { setNewsTitle(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Content</label>
                        <textarea value={newsContent} onChange={(e) => { setNewsContent(e.target.value) }} rows="5" className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Status</label>
                        <input value={newsStatus} onChange={(e) => { setNewsStatus(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>
                    <div className="flex-custom flex-justify-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="topic">Topic</label>
                        <select value={topicId} onChange={(e) => { setTopicId(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-4" id="topic">
                            <option>Choose Topic</option>
                            {
                                topics.map((data, index) => {
                                    return <option value={data.id} key={index}>{data.topic_title}</option>
                                })
                            }
                        </select>

                    </div>
                    <div className="flex-custom flex-justify-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="topic">Sub Topic</label>
                        <select value={subTopicId} onChange={(e) => { setSubTopicId(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-4" id="topic">
                            <option>Choose Topic</option>
                            {
                                subTopics.map((data, index) => {
                                    return <option value={data.id} key={index}>{data.sub_topic_title}</option>
                                })
                            }
                        </select>

                    </div>
                    <button className="btn-custom btn-custom-sky margin-left-7" >Add News</button>
                </form>
            </div>
        </>
    );
}


export function UpdateNews() {
    const [topics, setTopics] = useState([])
    const [subTopics, setSubTopics] = useState([])
    const [news, setNews] = useState([])
    const { news_id } = useParams();

    const [subTopicId, setSubTopicId] = useState("")
    const [newsTitle, setNewsTitle] = useState("");
    const [newsStatus, setNewsStatus] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [newsName, setNewsName] = useState("");
    const [newsPictureLink, setNewsPictureLink] = useState("");
    const [newsFile, setNewsFile] = useState("");

    const UpdatePost = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append("news_title", newsTitle);
        formData.append("news_content", newsContent);
        formData.append("name", newsName);
        formData.append("image_file", newsFile);
        formData.append("sub_topic_id", subTopicId);

        console.log(formData.get("news_title", newsTitle))
        console.log(formData.get("news_content", newsContent))
        console.log(formData.get("news_status", newsStatus))
        console.log(formData.get("name", newsName))
        console.log(formData.get("image_file", newsFile))
        console.log(formData.get("sub_topic_id", subTopicId))
        // alert('ok')
        await axios.post('http://127.0.0.1:8000/api/news/' + news_id, formData,
            {
                headers: { "Content-type": "multipart/form-data" },
            }).then(res => {
                console.log(res)
                // alert('tes')
                // window.location.replace("/news")
            }).catch(error => {
                console.log(error)
            });
    }

    const getNews = async () => {
        await axios.get("http://127.0.0.1:8000/api/news/update/" + news_id).then(async (res) => {
            setNews(res.data[0])
            setNewsTitle(res.data[0].news_title != null ? res.data[0].news_title : "")
            setNewsContent(res.data[0].news_content != null ? res.data[0].news_content : "")
            setNewsStatus(res.data[0].news_status != null ? res.data[0].news_status : "")
            setNewsName(res.data[0].name != null ? res.data[0].name : "")
            setNewsPictureLink(res.data[0].news_picture_link != null ? res.data[0].news_picture_link : "")
            setSubTopicId(res.data[0].sub_topic_id != null ? res.data[0].sub_topic_id : "")
            const sub_topic = await axios.get("http://127.0.0.1:8000/api/sub_topics/show_by_id/" + res.data[0].sub_topic_id);
            await axios.get(`http://127.0.0.1:8000/api/topics/showbyid/${sub_topic.data.sub_topics["topic_id"]}`).then(response => {
                document.getElementById("topic-by-sub-toopic").innerHTML = response.data.topics["topic_title"];
            });
        })
    }
    const getSubTopics = async () => {
        await axios.get("http://127.0.0.1:8000/api/sub_topics").then(res => {
            setSubTopics(res.data.sub_topics)
        })
    };
    const getTopics = async () => {
        axios.get('http://127.0.0.1:8000/api/topics').then(res => {
            setTopics(res.data.topics)
        })
    };
    useEffect(() => {
        getSubTopics();
        getTopics();
        getNews();
    }, [])
    // function insertParagraph(row, par) {
    //     const caretPos = row.selectionStart,
    //         textAreaTxt = row.value,
    //         newCaretPos = caretPos + par.length;
    //     row.setSelectionRange(newCaretPos, newCaretPos);
    //     console.log(row.index);
    //     if (caretPos == caretPos) {
    //         row.value = textAreaTxt.substring(0, caretPos) + par + textAreaTxt.substring(caretPos);

    //     }
    // }
    async function chooseTopic(e) {
        setSubTopicId(e.target.value);
        const sub_topic = await axios.get("http://127.0.0.1:8000/api/sub_topics/show_by_id/" + e.target.value);
        if (e.target.value === "selected") {
            document.getElementById("topic-by-sub-toopic").innerHTML = "";
        } else {
            axios.get(`http://127.0.0.1:8000/api/topics/showbyid/${sub_topic.data.sub_topics["topic_id"]}`).then(response => {
                document.getElementById("topic-by-sub-toopic").innerHTML = response.data.topics["topic_title"];
            });
        }
    }
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Update Post Form</h5></div>
                <form onSubmit={UpdatePost} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom margin-top-5">

                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">News</label>
                        <input value={newsTitle} onChange={(e) => { setNewsTitle(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Content</label>
                        <textarea value={newsContent} onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                // insertParagraph(e.target, '"New paragraph"')
                            }
                        }} style={{ height: "200px" }} onChange={(e) => {
                            setNewsContent(e.target.value);
                        }} rows="5" className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Status</label>
                        <input value={newsStatus} disabled onChange={(e) => { setNewsStatus(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Name</label>
                        <input value={newsName} onChange={(e) => { setNewsName(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Images</label>
                        <img style={{ maxWidth: "40%", height: "250x", }} className="margin-bottom-2" src={newsPictureLink} />
                        <input onChange={(e) => { setNewsFile(e.target.files[0]) }} type={"file"} accept="image/*" className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>
                    {/* <div className="flex-custom flex-justify-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="topic">Topic</label>
                        <select value={topicId} onChange={(e) => { setTopicId(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-4" id="topic">
                            <option>Choose Topic</option>
                            {
                                topics.map((data, index) => {
                                    return <option value={data.id} key={index}>{data.topic_title}</option>
                                })
                            }
                        </select>

                    </div> */}
                    <div className="flex-custom flex-justify-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="topic">Sub Topic</label>
                        <select value={subTopicId} onChange={chooseTopic} type={"text"} className="form-control-custom width-75 margin-left-4" id="topic">
                            <option>Choose Topic</option>
                            {
                                subTopics.map((data, index) => {
                                    return <option value={data.id} key={index}>{data.sub_topic_title}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <p>Topic: </p>
                        <p id="topic-by-sub-toopic"></p>
                    </div>
                    <button className="btn-custom btn-custom-sky margin-left-7" >Update News</button>
                </form>
            </div>
        </>
    );
}