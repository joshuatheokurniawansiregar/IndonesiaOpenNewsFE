import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
export function SideNavigationBar() {
    useEffect(() => {
        let menu_toggle = document.querySelectorAll(".side-nav-dropdown-toggle");
        let drop_down_menu = document.getElementsByClassName("side-nav-dropdown-menu-list");
        let arrow_right = document.querySelectorAll(".arrow-right");
        let index_menu_toggle = menu_toggle.length;
        let counter_array = [0, 0, 0];
        let array = new Array(index_menu_toggle);
        for (let index = 0; index < array.length; index++) {
            array[index] = new Array(1);
        }
        for (let i = 0; i < index_menu_toggle; i++) {
            for (let a = 0; a < 1; a++) {
                array[i][a] = counter_array[i];
            }
        }
        for (let i = 0; i < index_menu_toggle; i++) {
            menu_toggle[i].addEventListener("click", () => {
                array[i][0] = counter_array[i]++;
                if (array[i][0] === 0) {
                    drop_down_menu[i].classList.toggle("side-nav-dropdown-menu-toggled", true);
                    arrow_right[i].classList.toggle("arrow-bottom", true);
                } else if (array[i][0] === 1) {
                    counter_array[i] = 0;
                    drop_down_menu[i].classList.toggle("side-nav-dropdown-menu-toggled", false);
                    arrow_right[i].classList.toggle("arrow-bottom", false);
                }
            });
        }
    })
    const signOut = () => {

    }
    return (
        <>
            <input type={"checkbox"} className="display-none" id="menu-toggle" />
            <label className="menu-parent" htmlFor="menu-toggle">
                <span className="menu-child"></span>
                <span className="menu-child"></span>
                <span className="menu-child"></span>
            </label>
            <header className="header">
                <h5 className="center-auto">Indonesia Open News Administrator Dashboard</h5>
            </header>
            <nav className="side-nav-overlay">
                <ul className="side-nav-overlay-list">
                    <li className="side-nav-overlay-list-item">
                        <NavLink to="/" className="side-nav-overlay-list-item-link" href="#">Home</NavLink>
                    </li>
                    <li className="side-nav-overlay-list-item">
                        <span className="side-nav-overlay-list-item-link side-nav-dropdown-toggle" href="#" data-toggle="dropdown"> News <div className="arrow-right"></div> </span>
                        <ul className="side-nav-dropdown-menu-list">
                            <li className="side-nav-dropdown-menu-list-item">
                                <NavLink to="/news" className="side-nav-dropdown-menu-list-item-link">News</NavLink>
                            </li>
                            <li className="side-nav-dropdown-menu-list-item">
                                <NavLink to="/topic" className="side-nav-dropdown-menu-list-item-link">Topic</NavLink>
                            </li>
                            <li className="side-nav-dropdown-menu-list-item">
                                <NavLink to="/subtopic" className="side-nav-dropdown-menu-list-item-link">Sub Topic</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="side-nav-overlay-list-item">
                        <NavLink to="/adminapproval" className="side-nav-overlay-list-item-link" href="#" data-toggle="dropdown">
                            Admin Approval
                        </NavLink>
                    </li>
                    <li className="side-nav-overlay-list-item">
                        <NavLink to="/adminnewsapproval" className="side-nav-overlay-list-item-link" href="#" data-toggle="dropdown">
                            Admin News Approval
                        </NavLink>
                    </li>
                    {/* <li className="side-nav-overlay-list-item">
                            <NavLink to="/admin" className="side-nav-overlay-list-item-link" href="#">Admin Profile
                            </NavLink>
                        </li> */}
                    <li className="side-nav-overlay-list-item"><NavLink to={'/signup'} className="side-nav-overlay-list-item-link">Admin Register</NavLink></li>
                </ul>
                <button className="btn-custom btn-gray center-auto" style={{ position: "relative", top: "20px" }} onClick={signOut}>Signout</button>
            </nav >
        </>
    )

}