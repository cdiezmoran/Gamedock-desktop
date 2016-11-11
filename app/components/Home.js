// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import { desktopCapturer } from 'electron';
import styles from './Home.css';


export default class Home extends Component {
  captureDesktop() {
    // Change state to capturing

    // Get sources and select which one we want using props
    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      for(let source of sources) {
        // TODO: Replace gamedock with game name from props
        if(source === 'Gamedock') {
          navigator.mediaDevices.getUserMedia({
            audio: true,
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

          }).catch((error) => {

          });
        }
      }
    }
  },
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Gamedock Home</h2>
        </div>
      </div>
    );
  }
}
