import { Component } from "react";
export class UpdateNewsPage extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const styletage = document.querySelectorAll("style")[0];
        document.querySelector("head").removeChild(styletage);
    }
    render() {
        return (
            <>
                <div className="main-side">
                    <form className="form-group-custom flex flex-justify-content-around flex-column width-100 margin-top-2">
                        <div className="flex flex-justify-content-start flex-row align-items-baseline width-75 center-auto margin-s" style={{ alignSelf: "center" }}>
                            <label> Author:  </label>
                            <p className="margin-left-5 form-control-custom-no-border">Joshua Theo Kurniawan Siregar</p>
                        </div>
                        <div className="flex flex-justify-content-start flex-row align-items-baseline width-75 center-auto ">
                            <label htmlFor="news-title">News Title</label>
                            <input type={"text"} className="form-control-custom margin-left-4 width-70" id="news-title" />
                        </div>
                        <div className="flex flex-justify-content-start flex-row align-items-baseline width-75 center-auto">
                            <label htmlFor="news-content">News Content</label>
                            <textarea type={"text"} rows="20" className="textarea-control margin-left-2 width-70" style={{ borderRadius: "3px" }} id="news-content" />
                        </div>
                        <div className="flex flex-justify-content-start flex-row align-items-baseline width-75 center-auto">
                            <label htmlFor="news-topic">News Topic</label>
                            <select type={"text"} className="form-control-custom margin-left-3 width-70" id="news-topic">
                                <option>A topic title</option>
                                <option>A topic title</option>
                                <option>A topic title</option>
                                <option>A topic title</option>
                            </select>
                        </div>
                        <div className="flex flex-justify-content-start flex-row align-items-baseline width-75 center-auto">
                            <label> Added At:  </label>
                            <p className="margin-left-4 form-control-custom-no-border">Joshua Theo Kurniawan Siregar</p>
                        </div>
                        <div className="flex flex-justify-content-start flex-row align-items-baseline width-75 center-auto">
                            <span> Updated At:  </span>
                            <p className="margin-left-3 form-control-custom-no-border">Joshua Theo Kurniawan Siregar</p>
                        </div>
                        <div className="center-auto margin-bottom-2">
                            <button className="margin-vertically-center btn-custom btn-custom-gray" style={{ display: "block" }}>Update</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}