import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { authReq, baseReq } from "../apiReq";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";


const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const uploadImg = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await baseReq.post("upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (img !== null) {
        const imgUrl = await uploadImg();
        try {
          console.log("Fetch Start...");
          state
            ? await authReq.put(`posts/${state.id}`, {
                title,
                desc: value,
                cat,
                img: imgUrl,
              })
            : await authReq.post("posts", {
                title,
                desc: value,
                cat,
                img: imgUrl,
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
              });
            navigate("/");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          console.log("Fetch Start...");
          state
            ? await authReq.put(`posts/${state.id}`, {
                title,
                desc: value,
                cat,
                img: "",
              })
            : await authReq.post("posts", {
                title,
                desc: value,
                cat,
                img: "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
              });
            navigate("/");
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          value={title}
          type="text"
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              onChange={(e) => setCat(e.target.value)}
              name="cat"
              value="art"
              id="art"
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "health"}
              onChange={(e) => setCat(e.target.value)}
              name="cat"
              value="health"
              id="health"
            />
            <label htmlFor="health">Health</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "dev"}
              onChange={(e) => setCat(e.target.value)}
              name="cat"
              value="dev"
              id="dev"
            />
            <label htmlFor="dev">Develope</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "movie"}
              onChange={(e) => setCat(e.target.value)}
              name="cat"
              value="movie"
              id="movie"
            />
            <label htmlFor="movie">Movie</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              onChange={(e) => setCat(e.target.value)}
              name="cat"
              value="design"
              id="design"
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              onChange={(e) => setCat(e.target.value)}
              name="cat"
              value="food"
              id="food"
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
