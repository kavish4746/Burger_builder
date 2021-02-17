/* eslint-disable no-lone-blocks */
//This is Layout part
// so in this we want TOOLbar , Sidedrawer, Backdrop
//we make one hoc for not using root component, we here didnnt use Fragement,instead of that we make one HOC which return chilldre

import React from "react";
import Auxi from "../../hoc/Auxi";
import classes from "./Layout.module.css";

{
  /* <div>
    <ToolBar/>
    <SideBar/>
    <Backdrop>
</div>
<Main>
    here we want our component to load
    {props.children}
</Main> */
}

const layout = (props) => (
  <Auxi>
    <div>Toolbar----sidedrawer-----backdrop</div>
    <main className={classes.content}>{props.children}</main>
  </Auxi>
);

export default layout;
