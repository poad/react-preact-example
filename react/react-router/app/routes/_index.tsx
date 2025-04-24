import type { MetaFunction } from "react-router";
import { NavLink } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router SPA" },
    { name: "description", content: "Welcome to React Router (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to React Router (SPA Mode)</h1>
      <ul>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://reactrouter.com/how-to/spa"
            rel="noreferrer"
          >
            SPA Mode Guide
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://reactrouter.com/home"
            rel="noreferrer"
          >
            React Router Docs
          </a>
        </li>
        <li>
          <NavLink to="./test/123456">123456</NavLink>
        </li>
      </ul>
    </div>
  );
}
