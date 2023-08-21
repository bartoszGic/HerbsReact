// import { useState } from "react"
import { useState } from "react";
import { auth } from "../../firebase-config"


const ReviewEdit = (props) => {
    // const [user, setUser] = useState('')
    const users = props.downloadedReviews.filter((rev) => rev.user === auth.currentUser.email.substring(0, auth.currentUser.email.indexOf('@')))
    const user = users[0]
    return (
        <div>
            <div>ELOELO</div>
            {/* <div>{user.review}</div> */}
        </div>
    )
}
export default ReviewEdit