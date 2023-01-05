import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export function AdminPage() {
    const [admins, setAdmins] = useState([]);
    // const [adminId, setadminId] = useState("");

    // const getAdmins = async () => {
    //     await axios.get("http://127.0.0.1:8000/api/admins").then(res => {
    //         setAdmins(res.data.admins)
    //     })
    // };

    const DeleteAdmin = async (id) => {
        // let formdata = new FormData()
        // formdata.append("admin_name", adminName)
        // formdata.append("admin_id", adminId)
        await axios.delete("http://127.0.0.1:8000/api/admins/" + id).then(res => { })
        // getAdmins();
    }

    // useEffect(() => {
    //     getAdmins();
    // }, []);
    return (
        <>
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Admin Table</h5></div>
                <div className="flex-custom flex-justify-content-start-custom flex-column-custom align-items-start-custom width-100">
                    <button className="btn-custom btn-custom-red margin-left-3 margin-bottom-1" onClick={() => window.location.replace("/admin/add")}>Add Admin</button>
                    <table className="table margin-left-3 width-80">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="th">Admin ID</th>
                                <th className="th">Admin Name</th>
                                <th className="th">Admin Password</th>
                                <th className="th">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="td">1</td>
                                <td className="td">Admin 1</td>
                                <td className="td">XXXXXXXXXXX</td>
                                <td>
                                    <a href="#" className="action-button">Update</a>/
                                    <button className="action-button">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="td">2</td>
                                <td className="td">Admin 2</td>
                                <td className="td">XXXXXXXXXXX</td>
                                <td>
                                    <a href="#" className="action-button">Update</a>/
                                    <button className="action-button">Delete</button>
                                </td>
                            </tr>
                            {/* {
                                admins.map((data, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className="td">
                                                {data.id}
                                            </td>
                                            <td className="td"  >
                                                {data.name}
                                            </td>
                                            <td className="td"  >
                                                {data.password}
                                            </td>
                                            <td  >
                                                <a href={`/admin/update/${data.admin_slug}`} className="action-button">Update</a>/
                                                <button onClick={() => DeleteAdmin(data.id)} className="action-button">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export function AddAdmin() {
    const [admins, setAdmins] = useState([])
    const [adminId, setAdminId] = useState("")
    const [adminName, setAdminName] = useState("")
    const SubmitAdmin = async (event) => {
        event.preventDefault();
        // let formdata = new FormData()
        // formdata.append("admin_name", adminName)

        // axios.post("http://127.0.0.1:8000/api/admins", formdata,
        //     {
        //         headers: { "Content-type": "multipart/form-data" },
        //     }).then(res => {
        //         window.location.replace("/admin")
        //     })
    }
    // useEffect(() => {
    //     async function getAdmins() {
    //         axios.get('http://127.0.0.1:8000/api/admins').then(res => { setAdmins(res.data.admins) })
    //     }
    //     getAdmins()
    // }, [])
    const navigate = useNavigate();
    return (
        <>
            <div className="main-side">

                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Add Admin Form</h5></div>
                <form onSubmit={SubmitAdmin} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom margin-top-5">
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="admin">Name</label>
                        <input value={adminName} onChange={(e) => { setAdminName(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="name" />
                    </div>
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-admin">Password</label>
                        <input value={adminName} onChange={(e) => { setAdminName(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="password" />
                    </div>

                    <button className="btn-custom btn-custom-sky margin-left-7" >Add Admin</button>
                </form>
            </div>
        </>
    );

}


export function UpdateAdmin() {

    const [admin, setAdmin] = useState([])
    const [adminName, setAdminName] = useState("")
    const { admin_slug } = useParams();

    const SubmitAdmin = async (event) => {
        event.preventDefault();

        let formdata = new FormData()
        formdata.append("_method", "PUT")
        formdata.append("admin_name", adminName)

        axios.post("http://127.0.0.1:8000/api/admins/" + admin.id, formdata
        ).then(res => {
            window.location.replace("/admin")
        }).catch(error => {
            //
        });
    }


    useEffect(() => {
        async function getAdmin() {
            axios.get("http://127.0.0.1:8000/api/admins/" + admin_slug).then(response => {
                setAdmin(response.data.admins[0])
                const data = response.data.admins[0].admin_name
                setAdminName(data)
            });

        }
        getAdmin();
    }, [])
    const navigate = useNavigate();
    return (
        <>
            {/* {admin_slug} */}
            <div className="main-side">
                <div style={{ border: "2px solid black", marginTop: "10px", marginBottom: "10px", width: "100%" }}><h5 className="center-auto">Update Admin Form</h5></div>
                <form onSubmit={SubmitAdmin} className="form-group-custom flex-custom flex-justify-content-around-custom flex-column-custom align-items-baseline-custom margin-top-5">
                    <div className="flex-custom flex-justify-content-start-custom flex-row-custom align-items-baseline-custom width-80 margin-left-2">
                        <label htmlFor="sub-admin">Sub Admin</label>
                        <input value={adminName} onChange={(e) => { setAdminName(e.target.value) }} type={"text"} className="form-control-custom width-75 margin-left-2" id="admin" />
                    </div>


                    <button className="btn-custom btn-custom-sky margin-left-7" >Update Admin</button>
                </form>
            </div >
        </>
    );

}
