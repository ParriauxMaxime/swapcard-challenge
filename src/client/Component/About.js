import React from "react";
import { Link } from "react-router-dom";

export const About = () => (
    <div>
      <span>[<Link to="/">Home</Link>]</span>
      <span>[About]</span>
      <h1>About</h1>
      <p>This is a tiny TODO app example</p>
    </div>
  );