import React from "react";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.column}>
          {/* <h2>FAQ</h2>
          <span>What we sell</span>
          <span>How can you order</span>
          <span>What currency we accept</span>
          <span>Privacy policy</span> */}
        </div>
        <div className={classes.column}>
          <h2>About</h2>
          <p className={classes.aboutParagraph}>
          Welcome to Graffiti Graphix, where art meets fashion.
           We are a brand that prides itself on blending the rebellious spirit of graffiti with the expressive world of graphic design. 
           Established in June 2023, our journey has been marked by creativity, originality, and a passion for self-expression.
          
          </p>
        </div>
        <div className={classes.column}>
          <h2>Contact</h2>
          <div className={classes.icons}>
          <a href="https://www.instagram.com/graffitii.graphix/" target="_blank">
            <AiOutlineInstagram />
            </a>
            {/* <AiOutlineFacebook />
            <AiOutlineTwitter /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
