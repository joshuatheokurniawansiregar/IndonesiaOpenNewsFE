import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export function SubTopicPage() {
    const [subTopics, setSubTopics] = useState([]);
    const [topicId, setTopicId] = useState("");
    const [subTopicId, setsubTopicId] = useState("");

    const getSubTopics = async () => {

        await axios.get("http://127.0.0.1:8000/api/sub_topics").then(res => {
            setSubTopics(res.data.sub_topics)
        })
    };

    const DeleteSubTopic = async (id) => {
        // let formdata = new FormData()
        // formdata.append("sub_topic_title", subTopicTitle)
        // formdata.append("topic_id", topicId)
        await axios.delete("http://127.0.0.1:8000/api/sub_topics/" + id).then(res => { })
        getSubTopics();
    }

    useEffect(() => {



        getSubTopics();

    }, []);
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Sub Topic Table</h5></div>
                <div className="flex-custom flex-justify-content-start-custom flex-column-custom align-items-start-custom width-100">
                    <button className="btn-custom btn-custom-red margin-left-3 margin-bottom-1" onClick={() => window.location.replace("/subtopic/add")}>Add SubTopic</button>
                    <table className="table margin-left-3 width-80">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">Sub Topic ID</th>
                                <th className="th">Sub Topic</th>
                                <th className="th">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subTopics.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="td">
                                                {data.id}
                                            </td>
                                            <td className="td"  >
                                                {data.sub_topic_title}
                                            </td>
                                            <td  >
                                                <a href={`/subtopic/update/${data.sub_topic_slug}`} className="action-button">Update</a>/
                                                <button onClick={() => DeleteSubTopic(data.id)} className="action-button">Delete</button>

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

export function AddSubTopic() {
    const [topics, setTopics] = useState([])
    const [topicId, setTopicId] = useState("")
    const [subTopicTitle, setSubTopicTitle] = useState("")
    const SubmitSubTopic = async (event) => {
        event.preventDefault();
        let formdata = new FormData()
        formdata.append("sub_topic_title", subTopicTitle)
        formdata.append("topic_id", topicId)
        axios.post("http://127.0.0.1:8000/api/sub_topics", formdata,
            {
                headers: { "Content-type": "multipart/form-data" },
            }).then(res => {
                window.location.replace("/subtopic")
            })
    }
    useEffect(() => {
        async function getTopics() {
            axios.get('http://127.0.0.1:8000/api/topics').then(res => { setTopics(res.data.topics) })
        }
        getTopics()
    }, [])
    const navigate = useNavigate();
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Add Sub Topic Form</h5></div>
                <form onSubmit={SubmitSubTopic} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom margin-top-5">
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Sub Topic</label>
                        <input value={subTopicTitle} onChange={(e) => { setSubTopicTitle(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="sub-topic" />
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
                    <button className="btn-custom btn-custom-sky margin-left-7" >Add Sub Topic</button>
                </form>
            </div>
        </>
    );

}


export function UpdateSubTopic() {
    const [topics, setTopics] = useState([])
    const [subTopic, setSubTopic] = useState([])
    const [topicId, setTopicId] = useState("")
    const [subTopicTitle, setSubTopicTitle] = useState("")
    const { sub_topic_slug } = useParams();

    const SubmitSubTopic = async (event) => {
        event.preventDefault();

        let formdata = new FormData()
        formdata.append("_method", "PUT")
        formdata.append("sub_topic_title", subTopicTitle)
        formdata.append("topic_id", topicId)

        axios.post("http://127.0.0.1:8000/api/sub_topics/" + subTopic.id, formdata,
            {
                headers: { "Content-type": "multipart/form-data" },
            }).then(res => {
                window.location.replace("/subtopic")
            }).catch(error => {
                //
            });
    }
    useEffect(() => {
        async function getTopics() {
            axios.get('http://127.0.0.1:8000/api/topics').then(res => {
                setTopics(res.data.topics)
            })
        }
        getTopics();

    }, [])

    useEffect(() => {
        async function getSubTopic() {
            axios.get("http://127.0.0.1:8000/api/sub_topics/" + sub_topic_slug).then(response => {
                setSubTopic(response.data.sub_topics)
                setSubTopicTitle(response.data.sub_topics.sub_topic_title)
                setTopicId(response.data.sub_topics.topic_id)
            });

        }
        getSubTopic();
    }, [])
    const navigate = useNavigate();
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Update Sub Topic Form</h5></div>
                <form onSubmit={SubmitSubTopic} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom margin-top-5">
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Sub Topic</label>
                        <input value={subTopicTitle} onChange={(e) => { setSubTopicTitle(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="sub-topic" />
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

                    <button className="btn-custom btn-custom-sky margin-left-7" >Update Sub Topic</button>
                </form>
            </div >
        </>
    );

}
