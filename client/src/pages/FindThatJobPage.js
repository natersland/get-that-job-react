import React from "react";
import GTJhooksfantasy from "../hooks/GTJhooksfantasy";

function FindThatJobPage() {
  const { email, password } = GTJhooksfantasy();
  return (
    <div>
      <h1>FindThatJobPage</h1>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
    </div>
  );
}

export default FindThatJobPage;
