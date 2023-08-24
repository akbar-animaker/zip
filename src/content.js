/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import App from "./App";
class Main extends React.Component {
  render() {
    return (
      <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
        <FrameContextConsumer>
          {
            ({ document, window }) => {
              return (
                <App document={document} window={window} isExt={true} />
              )
            }
          }
        </FrameContextConsumer>
      </Frame>
    )
  }
}

const parent = document.createElement('div');
const app = document.createElement('div');
app.id = "my-extension-root";
parent.style.display = "none";
parent.style.width = "100%";
parent.style.position = "fixed";
parent.style.left = "0px";
parent.style.top = "0px";
parent.style.zIndex = 100000;
parent.style.height = "100%";
parent.appendChild(app);

document.body.appendChild(parent);
ReactDOM.render(<Main />, app);
app.style.backgroundImage = `url(${chrome.runtime.getURL("static/media/bg.jpg")})`;
app.style.backgroundRepeat = 'no-repeat';
app.style.backgroundSize = 'cover';

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "CLICKED_BROWSER_ACTION") {
      toggle();
    }
  }
);

parent.addEventListener('click', toggle);

function toggle() {
  if (parent.style.display === "none") {
    parent.style.display = "block";
  } else {
    parent.style.display = "none";
  }
}
