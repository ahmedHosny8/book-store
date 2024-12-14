import { Link } from "react-router-dom";
import FacebookIcon from "../../icons/FacebookIcon";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutupeIcon from "../../icons/YoutupeIcon";

function Footer() {
  return (
    <footer
      className="footer footer-center gap-5 bg-base-200 rounded py-6 w-full text-white font-bold"
      style={{ backgroundColor: "#172554" }}
    >
      <nav>
        <Link to={"/"}>
          <img
            src="/logo-removebg.svg"
            width={"80"}
            alt="Logo"
            style={{ filter: "invert(1) brightness(2)" }}
          />
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to={"#"}>
            <FacebookIcon />
          </Link>
          <Link to={"#"}>
            <TwitterIcon />
          </Link>
          <Link to={"#"}>
            <YoutupeIcon />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by Book
          Store
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
