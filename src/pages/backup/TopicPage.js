import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
export function TopicPage() {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/topics").then(response => {
            setTopics(response.data.topics);
        })
    }, []);
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Topic Table</h5></div>
                <div className="flex-custom flex-justify-content-start-custom flex-column-custom align-items-start-custom width-100">
                    <button className="btn-custom btn-custom-red margin-left-3 margin-bottom-1">Add Topic</button>
                    <table className="table margin-left-3 width-80">
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
                                        <tr className="tr" key={key}>
                                            <td className="td">{data.id}</td>
                                            <td className="td">{data.topic_title}</td>
                                            <td className="td"><button to={`/topic/update/${data.topic_slug}`} className="action-button">Update</button>/<button onClick={() => {
                                                axios.delete('http://127.0.0.1:8000/api/topics/' + data.id).then(res => {
                                                })
                                            }} className="action-button">Delete</button>
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
export function AddTopic() {
    const [topic, setTopic] = useState("");
    const AddTopic = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("topic_title", topic);
        await axios.post('http://127.0.0.1:8000/api/topics', formData).then(res => {

        })

    }
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Add Topic Form</h5></div>
                <form onSubmit={AddTopic} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom margin-top-5">
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom center-auto width-70">
                        <label htmlFor="news-topic">Topic</label>
                        <div className="width-100 flex-custom flex-justify-start-custom flex-column-custom align-items-start-custom margin-left-2 width-90">
                            <input type={"text"} value={topic} onChange={(e) => setTopic(e.target.value)} className="form-control-custom width-80" />
                            <button className="btn-custom btn-custom-sky ">Add Topic</button>
                        </div>

                        <div className="flex-custom flex-justify-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                            <label htmlFor="topic">Topic</label>
                            <select value={topicId} onChange={(e) => { setTopicId(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-4" id="topic">
                                <option>Choose Topic</option>
                                {
                                    topics.map((data, index) => {
                                        return <option value={data.id} key={index} > {data.topic_title}</option>
                                    })
                                }


                            </select>

                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
export function UpdateTopic() {
    const { topic_slug } = useParams();
    const defaultTopic = useRef();
    const [topic, setTopic] = useState([]);
    const [message, setMessage] = useState("");
    const [updatedTopicTitle, setUpdatedTopicTitle] = useState();
    const [topicId, setTopicId] = useState(null);
    useEffect(() => {
        async function getTopic() {
            axios.get(`http://127.0.0.1:8000/api/topics/${topic_slug}`).then(response => {
                setTopic(response.data.topics);
            })
        }
        getTopic();

    }, []);

    useEffect(() => {
        topic.map(data => {
            // setUpdatedTopicTitle(data.topic_title);
            setTopicId(data.id);
        });
    }, [topic]);
    const updateHandler = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("topic_title", updatedTopicTitle);
        // console.log(formData.get("topic_title"));
        // console.log(topicId);
        // await axios.patch(`http://127.0.0.1:8000/api/topics/${topicId}`, + formData).then(response => {
        //     // setMessage(response.data);
        //     window.location.replace("/");
        // }).catch(e => {
        //     if (e.response.status === 409) {
        //         setMessage(e.response);
        //         console.log(e.response);
        //     }
        // });
        // fetch(`http://127.0.0.1:8000/api/topics/${topicId}`, {
        //     method: "PATCH",
        //     body: JSON.stringify({
        //         topic_title: formData.get("topic_title"),
        //     }),
        //     headers:{
        //         'Content-type'
        //     }
        // });
    }
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "30px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Update Topic Form</h5></div>
                <form className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom width-100 margin-top-1" onmit={updateHandler}>
                    {
                        topic.map((data, index) => {
                            let element_updatedat;
                            if (data.updated_at === 0) {
                                element_updatedat = "";
                            } else {
                                element_updatedat = <>{new Date(data.updated_at).toLocaleDateString(navigator.language) + " " + new Date(data.updated_at).toLocaleString(navigator.language, { weekday: "long" }) + " " + new Date(data.updated_at).toLocaleTimeString()}</>
                            }
                            return (
                                <>
                                    <div key={data.id}>
                                        <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-3 margin-top-2">
                                            <label htmlFor="news-title">News Title</label>
                                            <input type={"text"} className="form-control-custom margin-left-3 width-70" value={updatedTopicTitle} onInput={(e) => setUpdatedTopicTitle(e.target.value)} id="news-title" />
                                        </div>
                                        <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline width-80  margin-left-3" style={{ alignSelf: "center" }}>
                                            <label> Added At  </label>
                                            <p className="form-control-custom-no-border margin-left-3">
                                                {new Date(data.added_at).toLocaleDateString(navigator.language) + " " + new Date(data.added_at).toLocaleString(navigator.language, { weekday: "long" }) + " " + new Date(data.added_at).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-3" style={{ alignSelf: "center" }}>
                                            <label> Updated At </label>
                                            <p className="form-control-custom-no-border margin-left-2">{element_updatedat}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                    <button type="submit" className="btn-custom btn-custom-emerald color-white margin-left-3">Update Topic</button>
                </form>
            </div>
        </>
    );

}