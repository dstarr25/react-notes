import React from 'react';
import { googleLogin } from '../services/datastore';

const Loginout = (props) => {
    const imgurl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png';

    const renderButton = () => {
        if (props.user.localId === 'guest') {
            return (
                <button className="loginoutButton" onClick={() => { googleLogin(props.loginNewUser); }} type="button"><img src={imgurl} alt={imgurl} /></button>
            );
        }
        return (
            <button className="loginoutButton" onClick={props.logoutUser} type="button"><img src={props.user.photoUrl} alt="" /> sign out</button>
        );
    };

    return renderButton();
};

export default Loginout;
