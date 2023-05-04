import Home from "../code/views/home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from '@cypress/react18'

describe("<Home />", () => {
  it("renders", () => {
    mount(
      <Router>
        <Home />
      </Router>
    );
  });
});
