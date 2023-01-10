import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function AdminNewsnApproval() {
    const [adminApprovals, setAdminApprovals] = useState([]);
    // const [adminApprovalId, setadminApprovalId] = useState("");

    const getAdminApprovals = async () => {
        await axios.get("http://127.0.0.1:8000/api/adminapproval/news").then(res => {
            setAdminApprovals(res.data.admin_news_approval)
        })
    };

    const RejectAdminApproval = async (id) => {
        await axios.post("http://127.0.0.1:8000/api/adminapproval/news/reject/" + id).then(res => {
            alert('rejected')
        })
        getAdminApprovals();
    }
    const ApproveAdminApproval = async (id) => {
        await axios.post("http://127.0.0.1:8000/api/adminapproval/news/approve/" + id).then(res => {
            alert('approved')
            console.log(res.data.approved_news);
        }).catch(error => {
            console.log(error.response.data);
        })
        getAdminApprovals();
    }
    useEffect(() => {
        getAdminApprovals();
    }, []);
    return (
        <>
            <div style={{ overflow: "auto", width: "98%", height: "100vh", }}>
                <table className="table margin-left-1 margin-top-1">
                    <thead className="thead">
                        <tr className="tr">
                            <th className="th" style={{ width: "100px" }} >Admin News Approval ID</th>
                            <th className="th" style={{ width: "200px" }}>News Image</th>
                            <th className="th">News Title</th>
                            <th className="th" style={{ width: "300px" }}>News Content</th>
                            <th className="th">News Topic</th>
                            <th className="th">News Sub Topic</th>
                            <th className="th">Author Name</th>
                            <th className="th" style={{ width: "200px" }}>Author Description</th>
                            <th className="th">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adminApprovals.map((data, key) => {
                                return (
                                    <tr key={key} style={{ height: "100px", overflowY: "auto" }}>
                                        <td className="td">
                                            {data.id}
                                        </td>
                                        <td className="td">
                                            <img src={data.news_picture_link} style={{ width: "100%", height: "100px" }} />
                                        </td>
                                        <td className="td">
                                            {data.news_title}
                                        </td>
                                        <td className="td">
                                            {data.news_content}
                                        </td>
                                        <td className="td">
                                            {data.topic_title}
                                        </td>

                                        <td className="td">
                                            {data.sub_topic_title}
                                        </td>
                                        <td className="td">
                                            {data.name}
                                        </td>
                                        <td className="td" style={{ overflowY: "auto" }}>
                                            {data.author_description}
                                        </td>
                                        <td className="td">
                                            <button onClick={(e) => { e.preventDefault(); ApproveAdminApproval(data.id) }} className="action-button">Approve</button>/
                                            <button onClick={(e) => { e.preventDefault(); RejectAdminApproval(data.id) }} className="action-button">Rejected</button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>)
}
