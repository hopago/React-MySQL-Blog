import { Link, useLocation, useNavigate } from "react-router-dom"
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import { authReq, baseReq } from "../apiReq";
import DOMPurify from "dompurify";


const SinglePost = () => {

  const { currentUser } = useContext(AuthContext);

  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const handleUpdate = async () => {
    try {
      await authReq.put(`posts/${postId}`, {

      });
      navigate(`/post/${postId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await authReq.delete(`posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await baseReq.get(`posts/${postId}`);
        setPost(res.data);
        console.log(post);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3362697/pexels-photo-3362697.jpeg"
            alt=""
          />
          <div className="info">
            <span>{post?.username}</span>
            <p>{moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post?.username && (
            <div className="edit">
              <Link className="link" to={`/write?edit=2`} state={post}>
                <button onClick={handleUpdate} className="editBtn">Edit</button>
              </Link>
              <button onClick={handleDelete} className="deleteBtn">Delete</button>
            </div>
          )}
        </div>
        <h1>
            {post?.title}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      <div className="menu">
        <Menu cat={post.cat} />
      </div>
    </div>
  );
}

export default SinglePost
