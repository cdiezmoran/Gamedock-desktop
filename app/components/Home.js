// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { desktopCapturer } from 'electron';
import $ from 'jquery';
import styles from './Home.css';

class Home extends Component {
  handleCapture() {
    // Change state to capturing

    // Get sources and select which one we want using props
    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      for(let source of sources) {
        // TODO: Replace gamedock with game name from props
        console.log(source.name)
        if(source.name === "Slack - Make School Product Academy '18") {
          console.log("Getting media for " + source.name)
          navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
              }
            }
          }).then((stream) => {
            // TODO: Handle stream
            console.log("Got stream")
            $('#video').attr("src", URL.createObjectURL(stream))
          }).catch((error) => {
            console.log(error);
          });
        }
      }
    });
  }

  handleStop() {
    // TODO: Stop the capture
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2> Home</h2>
          <video width="640" height="360" id="video" autoPlay/>
          <button onClick={this.handleCapture}>Capture</button>
          <button onClick={this.handleStop}>Stop</button>
        </div>
      </div>
    );
  }
}

export default Home
