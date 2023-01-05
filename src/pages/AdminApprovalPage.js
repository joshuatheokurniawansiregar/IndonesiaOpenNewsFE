import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function AdminApproval() {
    const [adminApprovals, setAdminApprovals] = useState([]);
    // const [adminApprovalId, setadminApprovalId] = useState("");

    const getAdminApprovals = async () => {
        await axios.get("http://127.0.0.1:8000/api/adminapproval/author").then(res => {
            setAdminApprovals(res.data.admin_approval)
        })
    };

    const RejectAdminApproval = async (id) => {
        // let formdata = new FormData()

        // formdata.append("adminApproval_title", adminApprovalTitle)
        // formdata.append("adminApproval_id", adminApprovalId)
        await axios.post("http://127.0.0.1:8000/api/adminapproval/author/reject/" + id).then(res => { })
        alert('rejected')
        getAdminApprovals();
    }
    const ApproveAdminApproval = async (id) => {
        // let formdata = new FormData()

        // formdata.append("adminApproval_title", adminApprovalTitle)
        // formdata.append("adminApproval_id", adminApprovalId)
        await axios.post("http://127.0.0.1:8000/api/adminapproval/author/approve/" + id).then(res => { })
        alert('approved')
        getAdminApprovals();
    }

    useEffect(() => {
        getAdminApprovals();
    }, []);

    return (
        <>
            <table className="table margin-left-3 width-80 margin-top-1">
                <thead className="thead">
                    <tr className="tr">
                        <th className="th">Admin Approval ID</th>
                        <th className="th">Author Photo</th>
                        <th className="th">Author Title</th>
                        <th className="th">Author Name</th>
                        <th className="th">Author Description</th>
                        <th className="th">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        adminApprovals.map((data, key) => {
                            return (
                                <tr key={key}>
                                    <td className="td">
                                        {data.id}
                                    </td>
                                    <td className="td"  >
                                        <img src={data.photo_profile_link} style={{ width: "100%", height: "100px" }} />
                                    </td>
                                    <td className="td"  >
                                        Author
                                    </td>
                                    <td className="td"  >
                                        {data.name}
                                    </td>
                                    <td className="td"  >
                                        {data.author_description}
                                    </td>
                                    <td className="td">
                                        <button onClick={() => ApproveAdminApproval(data.id)} className="action-button">Approve</button>/
                                        <button onClick={() => RejectAdminApproval(data.id)} className="action-button">Rejected</button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>)
}
