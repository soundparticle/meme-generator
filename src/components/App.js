import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';


class App extends Component {
  
  state = {
    content: 'Choose your phrase...',
    memeHeader: 'Header text here...',
    color: 'black',
    textSize: '6',
    url:'http://www.vaguebuttrue.com/images/1435713417-RaccoonridesalligatorWEBSITE.jpg' 
  };

  handleHeaderChange = (memeHeader = '') => {
    this.setState({ memeHeader });
  };

  handleContentChange = (content = '') => {
    this.setState({ content }); 
  };
  
  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };
  
  handleColorChange = ({ target }) => {
    this.setState({ color: target.value });
  };

  handleTextChange = ({ target }) => {
    this.setState({ textSize: target.value });
  };
  
  handleExport = () => {
    // const meme = document.getElementById('meme');
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob, 'my-meme.png');
      });
  };
  
  
  render() {
    const { content, url, memeHeader, color, textSize } = this.state;

    return (
      <main className={styles.app}>
        
        <section className="cow-say">
          <header>
            <h2>Memes Of The Imagination</h2>
          </header>
          <p ref={node => this.image = node}></p>
        </section>
        <section>
          <h1>Set Options</h1>
          <section className="set-options" id="options-group">

            <label>Add Image (400px)
              url:<Background url={url} onChoose={this.handleBackgroundChoose}/>
            </label>

            <Content content={content} onChange={this.handleContentChange} memeHeader={memeHeader} color={color} textSize={textSize}/>
            <Header memeHeader={memeHeader} onChange={this.handleHeaderChange} color={color} textSize={textSize}/> 
            <label>Choose Font Size:
              <input type="text" value={textSize} onChange={this.handleTextChange}/>
            </label>
            <label>Choose Font Color:
              <input type="color" value={color} onChange={this.handleColorChange}/>
            </label>
          </section>

          <button onClick={this.handleExport}>Export Meme</button>
          <hr></hr>
          <div>
            <Meme style={{ color: color }} content={content} url={url} memeHeader={memeHeader} onChange={this.handleColorChange} color={color} textSize={textSize}/>
          </div>
          
        </section> 

      </main>
    );
  }
}

function Meme({ content, url, memeHeader, color, textSize }) {

  return (
    <div className="meme">
      <h1 id="meme-header" style={{ color: color }}>
        
        <font size={textSize}>{memeHeader}</font> 
      </h1>
      {/* <img style={{ color: color, background: `url(${url}) no-repeat ` }}></img>  */}
      <pre id="meme" className="meme-container" size={textSize}
        
        style={{ color: color, background: `url(${url}) no-repeat ` }}>
        <font size={textSize}>{content}</font>
      </pre>
    </div>
  );
}
// Set Options
//
function Background({ url, onChoose }) {
  return (
    <section>
      <label>
        Background:
        <input type="file" onChange={({ target }) => {
          const reader = new FileReader();
          reader.readAsDataURL(target.files[0]);
          reader.onload = () => onChoose(reader.result);
        }}/>
        <span>
          <input value={url} onChange={({ target }) => onChoose(target.value)}/>
        </span>
      </label>
    </section>
  );
}

function Content({ content, onChange }) {
  return (
    <section>      
      <label>
        Choose Meme Content: 
        <input 
          value={content} 
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </section>
  );  
}

function Header({ memeHeader, onChange }) {
  return (
    <section>      
      <label>
        Choose Header Text: 
        <input 
          value={memeHeader} 
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </section>
  );  
}


export default App;
