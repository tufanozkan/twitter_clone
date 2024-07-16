import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [postObject, setPostObjects] = useState({});
    const [comments, setComments] = useState([]);
    const [NewComment, SetNewComment] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axios.get(`http://localhost:3001/posts/byId/${id}`, { timeout: 10000 });
                setPostObjects(postResponse.data);
            } catch (error) {
                console.error('Gönderi alınırken hata oluştu:', error);
            }

            try {
                const commentsResponse = await axios.get(`http://localhost:3001/comments/${id}`, { timeout: 10000 });
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Yorumlar alınırken hata oluştu:', error);
            }
        };
        fetchData();
    }, [id]);

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {commentBody: NewComment, PostId: id}).then((response) => {
            const commentToAdd = {commentBody: NewComment}
            setComments([...comments, commentToAdd])
            SetNewComment("")
        });
    }

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title">{postObject.title}</div>
                    <div className="body">{postObject.postText}</div>
                    <div className="footer">{postObject.username}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addCommentContainer">
                    <input type="text" placeholder="Comment.." autoComplete="off" value={NewComment} onChange={(event) => {SetNewComment(event.target.value)}} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => (
                        <div key={key} className="comment">{comment.commentBody}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Post;
