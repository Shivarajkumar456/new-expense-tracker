import React,{useRef, useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/authReducer";
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom';

export const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
    const inputFullnameRef = useRef();
    const inputPhotoUrlRef = useRef();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const handleCancel = () => {
        navigate('/home');
    };

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ`, {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error('Unable to fetch user profile');
        }

        const user = data.users[0];
        setDisplayName(user.displayName);
        setPhotoURL(user.photoUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(() => {
      fetchUserProfile();
    }, []);

    const profileSubmitHandler=async(event)=>{
        event.preventDefault();
        try{
       const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAGhMOoCkZh2xzJ3X_mtq7XNf2z2AOvrrQ',{
        method : 'POST',
        body :JSON.stringify({
            idToken: token,
            displayName: inputFullnameRef.current.value,
            photoUrl: inputPhotoUrlRef.current.value,
            returnSecureToken: true,
        }),
        headers : {
            'Content-Type' : 'application/json'
        }
       })

       const data = await res.json();
       console.log(data)
       dispatch(authAction.updateProfile({
        name: inputFullnameRef.current.value,
        profileUrl: inputPhotoUrlRef.current.value
       }));
       inputFullnameRef.current.value=""
       inputPhotoUrlRef.current.value=""

       if (res.ok) {
        navigate('/home');
      } else {
        throw data.error;
      }

        }
        catch(error){
            console.log(error.message)
        }

    }
  return (
    <div className='update'>
        <div className='main-update-profile'>
            <h3>Winner never Quits , quitter never wins</h3>
            <div className='profile-update'>Your Profile is <b>64%</b> complete . A complete Profile has <br/>higher chances of landing a job </div>
        </div>
        <hr></hr>
        <div className="main-update-form">
        <form onSubmit={profileSubmitHandler} className="form">
          <div className="form-row">
            <h3>Update Profile</h3>
            <button className='cancel-button' type="button" onClick={handleCancel}>Cancel</button>
          </div>
          <div className="form-row">
            <label htmlFor="fullname">Full Name:</label>
            <input ref={inputFullnameRef} type="text" id="fullname" defaultValue={displayName} />
            <label htmlFor="profileurl">Profile Photo Url:</label>
            <input ref={inputPhotoUrlRef} type="text" id="profileurl" defaultValue={photoURL}/>
          </div>
          <div className="form-row">
            <button className='submit-button' type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile;