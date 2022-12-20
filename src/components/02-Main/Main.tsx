import React from 'react';
import {Route, Routes} from "react-router-dom";
import ProfileContainer from "./Profile/ProfileContainer";
import UsersContainer from "./Users/UsersContainer";
import {withSuspense} from "../../hoc/withSuspense";
import css from "./Main.module.css"
import Chat from "../../pages/chat/Chat";
import {MainWidget} from "./MainWidget/MainWidget";

const DialogsContainer = React.lazy(()=>
    import("./Dialogs/DialogsContainer")
        .then(({DialogsContainer}) => ({default: DialogsContainer}))
)


const Main = () => {
    const DialogsContain = withSuspense(DialogsContainer)

    return (
        <div className={css.main}>

            <Routes>
                <Route path="/dialogs/" element={<MainWidget title={"Dialogs"}><DialogsContain/></MainWidget>}/>
                <Route path='/' element={<MainWidget title={"Profile"}><ProfileContainer/></MainWidget>}>
                    <Route path='/profile/:userId' element={<MainWidget title={"Profile"}><ProfileContainer/></MainWidget>}/>
                </Route>
                <Route path="/users" element={<MainWidget title={"Users"}><UsersContainer/></MainWidget>}/>
                {/*<Route path="/login" element={<LoginComponent/>}/>*/}
                <Route path="/chat" element={ <MainWidget title={"CommonChat"}><Chat/></MainWidget> }/>
                <Route path="*" element={<div>404</div>}/>
                {/*<Route path="/settings" element={<Settings />}/>*/}
            </Routes>

        </div>
    );
};

export default Main;