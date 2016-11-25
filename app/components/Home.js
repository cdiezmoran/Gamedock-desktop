// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { desktopCapturer } from 'electron';
import MediaStreamRecorder from 'msr';
import $ from 'jquery';
import styles from './Home.css';

import GameComponent from './GameComponent';

let mediaRecorder;

class Home extends Component {
  handleCapture() {
    // Change state to capturing

    // Get sources and select which one we want using props
    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      for(let source of sources) {
        // TODO: Replace gamedock with game name from props
        //console.log(source)
        if(source.name === "Entire screen") {
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
            mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.recorderType = MediaRecorderWrapper;

            mediaRecorder.ondataavailable = (blob) => {
              let blobURL = URL.createObjectURL(blob)
              mediaRecorder.save(blob, new Date().getTime() + "-custom.webm");
              $('#video').attr("src", blobURL);
            }
            mediaRecorder.start(5 * 5000);

          }).catch((error) => {
            console.log(error);
          });
        }
      }
    });
  }

  handleStop() {
    if(mediaRecorder) {
      mediaRecorder.stop();
    }


    $('#video').attr('src', '');
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2> Home</h2>
          <GameComponent />
          <video width="640" height="360" id="video" autoPlay/>
          <button onClick={this.handleCapture}>Capture</button>
          <button onClick={this.handleStop}>Stop</button>
        </div>
      </div>
    );
  }
}

export default Home
