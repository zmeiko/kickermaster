import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/fonts/GothamPro-Black/styles.css";
import "./assets/fonts/GothamPro-Medium/styles.css";

// import enLocale from 'date-fns/locale/en-US';

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
