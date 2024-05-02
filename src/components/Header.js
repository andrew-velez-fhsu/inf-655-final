import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div class="navBar">
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">My Account</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>Login</div>
      </div>
    </>
  );
}
