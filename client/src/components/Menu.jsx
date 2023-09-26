import { useEffect, useState } from "react";
import { baseReq } from "../apiReq";


const Menu = ({ cat }) => {

  console.log(cat);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await baseReq.get(`/posts?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <>
      <h1>Other posts recommend for you</h1>
      {posts.map(post => (
        <div className="post" key={post.id}>
            <img src={`../upload/${post?.img}`} alt="" />
            <h2>{post.title}</h2>
            <button>Read More</button>
        </div>
      ))}
    </>
  )
}

export default Menu
