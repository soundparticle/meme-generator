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
        <section>
          <h1>Set Options</h1>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
          <Content content={content} onChange={this.handleContentChange} memeHeader={memeHeader}/>
          {/* <Meme memeHeader={memeHeader} url={url} color={color} textSize={textSize}/> */}
          <label>Choose Font Color:<input type="color" value={color} onChange={this.handleColorChange}/></label>
          <p>
            <button onClick={this.handleExport}>Export</button>
          </p>
        </section> 

        <section className="cow-say">
          <h2 style={{ color: color }}>Memes Of The Imagination</h2>
          <Meme content={content} url={url} memeHeader={memeHeader} onChange={this.handleColorChange} color={color} textSize={textSize}/>
          <p ref={node => this.image = node}>
          </p>
        </section>
      </main>
    );
  }
}

function Meme({ content, url, memeHeader, color, textSize }) {

  return (
    <div>
      <h1 id="meme-header" style={{ color: color }}><font size={textSize}>{memeHeader}</font></h1> 
      <pre id="meme" className="meme-container" style={{ background: `url(${url}) no-repeat ` }}>{content}</pre>
    </div>
  );
}

function Background({ url, onChoose }) {
  return (
    <label>
      Background:
      <input value={url} onChange={({ target }) => onChoose(target.value)}/>
      <input type="file" onChange={({ target }) => {
        const reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => onChoose(reader.result);
      }}/>
    </label>
  );
}

function Content({ content, onChange }) {
  return (
    <p>
      <label >
        Content: 
        <input 
          value={content} 
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </p>
  );  
}

export default App;