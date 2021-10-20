import React from "react";

function Message() {
  return (
    <div style={{textAlign: 'center'}}>
      <h3>Customer Live Chat</h3>
      <p>Submit a ticket and wait for help</p>
      <p>A staff member will contact you shortly</p>
      <iframe
        style={{ height: "700px", width: "100%", border: "none" }}
        src="https://mid-project-01.herokuapp.com/client"
        title="client"
      ></iframe>
    </div>
  );
}
export default Message;
