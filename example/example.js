import React from "react";
import ReactDOM from "react-dom";
import ReactJkMusicPlayer from "../src";
import swal from "sweetalert";
import FaHeadphones from "react-icons/lib/fa/headphones";

import "../src/styles/index.less";
import "./example.less";
/*eslint-disable no-console*/

const options = {
  //audio lists model
  audioLists: [
        {
      name: "CFBX 92.5FM - The X Campus & Community Radio",
      singer: "CFBX 92.5FM",
      cover: "https://cfbxsite.files.wordpress.com/2017/07/cropped-screen-shot-2017-07-27-at-10-12-33-pm.png",
      musicSrc: "http://thexaudio.tru.ca:8002/listen.pls?sid=1"
    }
  ],

  //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
  theme: "dark",

  // Specifies movement boundaries. Accepted values:
  // - `parent` restricts movement within the node's offsetParent
  //    (nearest node with position relative or absolute), or
  // - a selector, restricts movement within the targeted node
  // - An object with `left, top, right, and bottom` properties.
  //   These indicate how far in each direction the draggable
  //   can be moved.
  bounds: "body",

  //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
  //"auto|metadata|none" "true| false"
  preload:false,

  //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
  defaultPosition: {
    top:120,
    left:120
  },

  // play mode text config of the audio player
  playModeText: {
    order: "Ordered Once Play",
    orderLoop: "Ordered Loop Play",
    singleLoop: "Single Loop Play",
    shufflePlay: "Shuffle Play"
  },

  //audio controller open text  [ type `String | ReactNode` default 'open']
  openText: "Open",

  //audio controller close text  [ type `String | ReactNode` default 'close']
  closeText: "Close",

  //audio theme switch checkedText  [ type `String | ReactNode` default '-']
  checkedText: "",

  //audio theme switch unCheckedText [ type `String | ReactNode` default '-']
  unCheckedText: "",

  // audio list panel show text of the playlist has no songs [ type `String` | ReactNode  default 'no music']
  notContentText: "No Music",

  panelTitle: "CFBX 92.5FM",

  defaultPlayMode: "order",

  //audio mode        mini | full          [type `String`  default `mini`]
  mode: "full",

  /**
   * [ type `Boolean` default 'false' ]
   * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
   */
  once: true,

  //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
  autoPlay: true,

  //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
  toggleMode: true,

  //audio cover is show of the "mini" mode [type `Boolean` default 'true']
  showMiniModeCover: true,

  //audio playing progress is show of the "mini"  mode
  showMiniProcessBar:true,

  //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
  drag: true,

  //drag the audio progress bar [type `Boolean` default `true`]
  seeked: true,

  //audio controller title [type `String | ReactNode`  default <FaHeadphones/>]
  controllerTitle: <FaHeadphones />,

  //Displays the audio load progress bar.  [type `Boolean` default `true`]
  showProgressLoadBar: true,

  //play button display of the audio player panel   [type `Boolean` default `true`]
  showPlay: true,

  //reload button display of the audio player panel   [type `Boolean` default `true`]
  showReload: true,

  //download button display of the audio player panel   [type `Boolean` default `true`]
  showDownload: false,

  //loop button display of the audio player panel   [type `Boolean` default `true`]
  showPlayMode: true,

  //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
  showThemeSwitch: true,

  //Extensible custom content       [type 'Array' default '[]' ]
  extendsContent: [],

  //default volume of the audio player [type `Number` default `100` range `0-100`]
  defaultVolume: 100,

  //playModeText show time [type `Number(ms)` default `700`]
  playModeShowTime: 600,

  //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
  loadAudioErrorPlayNext:false,

  //Music is downloaded handle
  audioDownload(audioInfo) {
    swal("download successfully", "", "success");
    console.log("audio download", audioInfo);
  },

  //audio play handle
  audioPlay(audioInfo) {
    console.log("audio playing", audioInfo);
  },

  //audio pause handle
  audioPause(audioInfo) {
    console.log("audio pause", audioInfo);
  },

  //When the user has moved/jumped to a new location in audio
  audioSeeked(audioInfo) {
    console.log("audio seeked", audioInfo);
  },

  //When the volume has changed  min = 0.0  max = 1.0
  audioVolumeChange(currentVolume) {
    console.log("audio volume change", currentVolume);
  },

  //The single song is ended handle
  audioEnded(audioInfo) {
    swal("Audio is ended!", "", "success");
    console.log("audio ended", audioInfo);
  },

  //audio load abort The target event like {...,audioName:xx,audioSrc:xx,playMode:xx}
  audioAbort(e) {
    console.log("audio abort", e);
  },

  //audio play progress handle
  audioProgress(audioInfo) {
    // console.log('audio progress',audioInfo);
  },

  //audio load failed error handle
  loadAudioError(e) {
    swal("audio load error", "", "error");
    console.log("audio load err", e);
  }
};

const Demo = () => (
  <div>
    <h2 className="example-title">
      Click to Turn Full mode or Mobile Mode...
    </h2>
    <ReactJkMusicPlayer {...options} />
  </div>
);
ReactDOM.render(<Demo />, document.getElementById("root"));
