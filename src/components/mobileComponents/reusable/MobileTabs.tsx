

import React from "react";
import { bag, bagInactive, chat, chatInactive, productInactiveLogo, productLogo, settings, settingsInactive, store, storeInactiveLogo, storeLogo } from "../../../assets";
import { Nav, NavItem } from "react-bootstrap"
import { useRouter } from "next/router";
import { IconImage } from "../Styled";

import { windowWidth } from "../../../utils/windowWidth";
import styled from "styled-components";

const MobileTabs = () => {
    const pathName = windowWidth()?.location.pathname
    const router = useRouter()


    const tabs = [
        {
            route: "/my-store",
            icon: pathName === "/my-store" ? store : storeInactiveLogo,
            label: "Store",
        },
        {
            route: "/products",
            icon: pathName === "/products" ? productLogo : productInactiveLogo,
            label: "Products",
        },
        {
            route: "/orders",
            icon: pathName === "/orders" ? bag : bagInactive,
            label: "Orders",
        },
        {
            route: "/inbox",
            icon: pathName === "/inbox" ? chat : chatInactive,
            label: "Inbox",
        },
        {
            route: "/settings",
            icon: pathName === "/settings" ? settings : settingsInactive,
            label: "Settings",
        },
    ];


    return (
        <Div >
            {/* Bottom Tab Navigator*/}
            <nav className="navbar fixed-bottom navbar-black" role="navigation">
                <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        {tabs.map(({ route, icon, label }, index) => (
                            <NavItem key={`tab-${index}`}>
                                <div
                                    onClick={() => router.push(route)}
                                    className="nav-link"
                                //activeClassName="active"
                                >
                                    <div className="row d-flex flex-column justify-content-center align-items-center">
                                        <IconImage
                                            src={icon}
                                            width={20}
                                            height={20}
                                        />
                                        <div className={pathName === route ? "label" : "label-inactive"}>{label}</div>
                                    </div>

                                </div>
                            </NavItem>
                        ))}
                    </div>
                </Nav>
            </nav>
        </Div>
    );
};

export default MobileTabs;


const Div = styled.div`
    margin-top: 20%;
`