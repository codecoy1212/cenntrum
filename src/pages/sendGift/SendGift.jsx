import React, { useState } from "react";
import "./sendGift.css";
import qrcode from "../../img/qrcode.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendGift } from "../../redux/features/giftSlice";
// import ReactSummernote from "react-summernote";
// import "react-summernote/dist/react-summernote.css"; // import styles
// import "react-summernote/lang/summernote-ru-RU";
import { TextEditor } from "text-editor-react";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const initialState = {
  type: "1",
  email: "",
  exchange: "",
  points: "",
  date: "",
  subject: "",
  desc: "",
};

const SendGift = () => {
  const [formValue, setFormValue] = useState(initialState);
  // const [desc, setDesc] = useState("");
  const { loading, error } = useSelector((state) => ({
    ...state.gift,
  }));
  const { email, exchange, points, date, subject, desc } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (email && exchange && points && date && subject && desc) {
    dispatch(sendGift({ formValue, navigate }));
    // }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const setDesc = (value) => {
    // let value = value;
    setFormValue({ ...formValue, desc: value });
    // console.log(value);
  };

  // const onInputChange = (e) => {
  //   let { value } = e.target;
  //   setFormValue({ ...formValue, value: value });
  // };

  return (
    <div className="gift">
      <div className="gift-top">Create Gift Card</div>
      <div className="gift-form-wrapper">
        <form className="gift-form" onSubmit={handleSubmit}>
          <div className="gift-form-container">
            <div className="gift-form-left">
              <input
                type="text"
                className="gift-input"
                placeholder="User Email"
                value={email}
                name="email"
                onChange={onInputChange}
              />
              <input
                type="text"
                className="gift-input"
                placeholder="Exchange N°"
                value={exchange}
                name="exchange"
                onChange={onInputChange}
              />
              <input
                type="text"
                className="gift-input"
                placeholder="Points"
                value={points}
                name="points"
                onChange={onInputChange}
              />
              <input
                type="text"
                className="gift-input"
                placeholder="Date and Time"
                value={date}
                name="date"
                onChange={onInputChange}
              />
              <input
                type="text"
                className="gift-input"
                placeholder="Subject"
                value={subject}
                name="subject"
                onChange={onInputChange}
              />

              <div style={{ margin: "10px 35px" }}>
                <label
                  htmlFor="file"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                ></label>
              </div>
            </div>
            <div className="gift-form-right">
              <div
              // style={{
              //   width: "100% !important",
              //   height: "100vh !important",
              // }}
              >
                <ReactQuill
                  theme="snow"
                  // id="desc"
                  // name="desc"
                  value={desc}
                  onChange={setDesc}
                  // style={{ minHeight: "100px" }}
                />
                {/* <Editor
                    editorState={""}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onInputChange}
                    // onChange={onInputChange}
                  /> */}
                {/* <Editor editorState={formValue} onChange={onInputChange()} /> */}

                {/* <TextEditor
                    id="desc"
                    toolItemStyle={{
                      color: "red",
                      fontSize: "1.2rem",
                    }}
                    value={desc}
                    onChange={onInputChange}
                  /> */}
                {/* <textarea
                    id="desc"
                    cols="50"
                    rows="23"
                    name="desc"
                    style={{ borderRadius: "25px", padding: "15px" }}
                  ></textarea> */}
                {/* <ReactSummernote
                    value="Default value"
                    options={{
                      lang: "ru-RU",
                      height: 350,
                      dialogsInBody: true,
                      toolbar: [
                        ["style", ["style"]],
                        ["font", ["bold", "underline", "clear"]],
                        ["fontname", ["fontname"]],
                        ["para", ["ul", "ol", "paragraph"]],
                        ["table", ["table"]],
                        ["insert", ["link", "picture", "video"]],
                        ["view", ["fullscreen", "codeview"]],
                      ],
                    }}
                    onChange={onInputChange}
                  /> */}
              </div>
            </div>
          </div>
          <button className="gift-button">Send</button>
        </form>
      </div>
    </div>

    // <div className='gift'>
    //   <div className='gift-top'>Send Gift</div>
    //   <div className='gift-form-wrapper'>
    //     <form className='gift-form'>
    //       <div className='gift-form-container'>
    //         <div className='gift-form-left'>
    //           <img
    //             src={qrcode}
    //             alt=''
    //             style={{ width: "160px", margin: "10px 35px" }}
    //           />
    //         </div>
    //         <div className='gift-form-center'>
    //           <input
    //             type='text'
    //             className='gift-input'
    //             placeholder='Enter User ID'
    //           />
    //           <input
    //             type='text'
    //             className='gift-input'
    //             placeholder='Enter Points'
    //           />
    //           <input
    //             type='text'
    //             className='gift-input'
    //             placeholder='Enter Date and Time'
    //           />
    //         </div>
    //         <div className='gift-form-right'>
    //           <input
    //             type='text'
    //             className='gift-input'
    //             placeholder='Exchange N*'
    //           />
    //           <input
    //             type='text'
    //             className='gift-input'
    //             placeholder='Enter Subject'
    //           />
    //         </div>
    //       </div>
    //       <button className='gift-button'>Send</button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default SendGift;
