import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function TopicPage() {
    const [topics, setTopics] = useState([]);
    // const [topicId, settopicId] = useState("");

    const getTopics = async () => {
        await axios.get("http://127.0.0.1:8000/api/topics").then(res => {
            setTopics(res.data.topics)
        })
    };

    const DeleteTopic = async (id) => {
        // let formdata = new FormData()
        // formdata.append("topic_title", topicTitle)
        // formdata.append("topic_id", topicId)
        await axios.delete("http://127.0.0.1:8000/api/topics/" + id).then(res => { })
        getTopics();
    }

    useEffect(() => {
        getTopics();
    }, []);
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Topic Table</h5></div>
                <div className="flex-custom flex-justify-content-start-custom flex-column-custom align-items-start-custom width-100">
                    <button className="btn-custom btn-custom-red margin-left-3 margin-bottom-1" onClick={() => window.location.replace("/topic/add")}>Add Topic</button>
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
                                        <tr key={key}>
                                            <td className="td">
                                                {data.id}
                                            </td>
                                            <td className="td"  >
                                                {data.topic_title}
                                            </td>
                                            <td  >
                                                <a href={`/topic/update/${data.topic_slug}`} className="action-button">Update</a>/
                                                <button onClick={() => DeleteTopic(data.id)} className="action-button">Delete</button>

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
    const [topics, setTopics] = useState([])
    const [topicId, setTopicId] = useState("")
    const [topicTitle, setTopicTitle] = useState("")
    const SubmitTopic = async (event) => {
        event.preventDefault();
        let formdata = new FormData()
        formdata.append("topic_title", topicTitle)

        axios.post("http://127.0.0.1:8000/api/topics", formdata,
            {
                headers: { "Content-type": "multipart/form-data" },
            }).then(res => {
                window.location.replace("/topic")
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

                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Add Topic Form</h5></div>
                <form onSubmit={SubmitTopic} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom margin-top-5">
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Topic</label>
                        <input value={topicTitle} onChange={(e) => { setTopicTitle(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="sub-topic" />
                    </div>

                    <button className="btn-custom btn-custom-sky margin-left-7" >Add Topic</button>
                </form>
            </div>
        </>
    );

}


export function UpdateTopic() {

    const [topic, setTopic] = useState([])
    const [topicTitle, setTopicTitle] = useState("")
    const { topic_slug } = useParams();

    const SubmitTopic = async (event) => {
        event.preventDefault();

        let formdata = new FormData()
        formdata.append("_method", "PUT")
        formdata.append("topic_title", topicTitle)

        axios.post("http://127.0.0.1:8000/api/topics/" + topic.id, formdata
        ).then(res => {
            window.location.replace("/topic")
        }).catch(error => {
            //
        });
    }


    useEffect(() => {
        async function getTopic() {
            axios.get("http://127.0.0.1:8000/api/topics/" + topic_slug).then(response => {
                setTopic(response.data.topics[0])
                const data = response.data.topics[0].topic_title
                setTopicTitle(data)
            });

        }
        getTopic();
    }, [])
    const navigate = useNavigate();
    return (
        <>
            {/* {topic_slug} */}
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Update Topic Form</h5></div>
                <form onSubmit={SubmitTopic} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom margin-top-5">
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-topic">Sub Topic</label>
                        <input value={topicTitle} onChange={(e) => { setTopicTitle(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="topic" />
                    </div>


                    <button className="btn-custom btn-custom-sky margin-left-7" >Update Topic</button>
                </form>
            </div >
        </>
    );

}
