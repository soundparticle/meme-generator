import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';


class App extends Component {
  
  state = {
    content: 'Take me to campsite #7!',
    memeHeader: 'Take me to campsite #666',
    color: '#ffffff',
    textSize: '6',
    url:'http://www.vaguebuttrue.com/images/1435713417-RaccoonridesalligatorWEBSITE.jpg' 
  };

  handleHeaderChange = ({ target }) => {
    this.setState({
      memeHeader: target.value
    });
  };

  handleContentChange = (content = ' ') => {
    this.setState({ content }); 
  };
  
  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };
  
  handleExport = () => {
    // const meme = document.getElementById('meme');
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob, 'my-meme.png');
      });
  };

  handleColorChange = ({ target }) => {
    this.setState({ color: target.value });
  };
  handleTextChange = ({ target }) => {
    this.setState({ textSize: target.value });
  };
  
  
  render() {
    const { content, url, memeHeader, color, textSize } = this.state;

    return (
      <main className={styles.app}>

        
        <section className="cow-say">
          <h2>Memes Of The Imagination</h2>
          <p ref={node => this.image = node}>
          </p>
        </section>

        <div>
          <h1>Set Options</h1>
          <Meme style={{ color: color }} content={content} url={url} memeHeader={content} onChange={this.handleColorChange} color={color} textSize={textSize}/>
          <Background url={url} onChoose={this.handleBackgroundChoose} color={color} textSize={textSize}/>
          <Content content={content} onChange={this.handleContentChange} memeHeader={memeHeader} color={color} textSize={textSize}/>
          {/* <Meme memeHeader={memeHeader} url={url} color={color} textSize={textSize}/> */}
          <label>Choose Font Color:<input type="color" value={color} onChange={this.handleColorChange}/></label>
          <label>Choose Font Size:<input type="text" value={textSize} onChange={this.handleTextChange}/></label>
          <p>
            <button onClick={this.handleExport}>Export</button>
          </p>
        </div> 

      </main>
    );
  }
}

function Meme({ content, url, memeHeader, color, textSize }) {

  return (
    <div>
      <h1 id="meme-header" style={{ color: color }}><font size={textSize}>{memeHeader}</font></h1> 
      <pre id="meme" className="meme-container" style={{ color: color, background: `url(${url}) no-repeat ` }}>{content}</pre>
    </div>
  );
}

// Set Options
//
function Background({ url, onChoose }) {
  return (
    <div>
      <label>
        Background:
        <span>
          <input type="file" onChange={({ target }) => {
            const reader = new FileReader();
            reader.readAsDataURL(target.files[0]);
            reader.onload = () => onChoose(reader.result);
          }}/>
        </span>
        <span>
          <input value={url} onChange={({ target }) => onChoose(target.value)}/>
        </span>
      </label>
    </div>
  );
}

function Content({ content, onChange }) {
  return (
    <p>
      <div>
        <label >
          Text Content: 
          <input 
            value={content} 
            onChange={({ target }) => onChange(target.value)}
          />
        </label>
      </div>
    </p>
  );  
}

export default App;
