import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';


class App extends Component {
  
  state = {
    content: 'Choose your phrase...',
    memeHeader: 'Header text here...',
    color: 'black',
    textSize: '3',
    url:'http://www.vaguebuttrue.com/images/1435713417-RaccoonridesalligatorWEBSITE.jpg' 
  };

  handleHeaderChange = ({ target }) => {
    this.setState({ memeHeader: target.value });
  };

  handleContentChange = ({ target }) => {
    this.setState({ content: target.value }); 
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
    const meme = document.getElementById('meme');
    dom2image.toBlob(meme)
      .then(blob => {
        fileSaver.saveAs(blob, 'my-meme.png');
      });
  };
  
  
  render() {
    const { content, url, memeHeader, color, textSize } = this.state;

    return (
      <main className={styles.app}>
        <header>
          <h2>Memes Of The Imagination</h2>
        </header>
        
        <section>
          {/* <p ref={node => this.image = node}></p> */}
        
          <h1>Set Options</h1>
          <section className="set-options" id="options-group">

            {/* <label>
              <Header memeHeader={memeHeader} onChange={this.handleHeaderChange} color={color} textSize={textSize}/> 
            </label> */}
            <label>Meme Header:<input value={memeHeader} onChange={this.handleHeaderChange}/></label>

            <label>
              <Content content={content} onChange={this.handleContentChange} memeHeader={memeHeader} color={color} textSize={textSize}/>
            </label>
            <label>
              <Background url={url} onChoose={this.handleBackgroundChoose}/>
            </label>
            {/* Font and Color select working */}
            <label>Choose Font Size:
              <input type="text" value={textSize} onChange={this.handleTextChange}/>
            </label>
            <label>Choose Font Color:
              <input type="color" value={color} onChange={this.handleColorChange}/>
            </label>
          </section>

          <button onClick={this.handleExport}>Export Meme</button>
          {/* <hr></hr> */}
          <div>
            <Meme memeHeader={memeHeader} content={content} url={url} onChange={this.handleColorChange} style={{ color: color }} color={color} textSize={textSize}/>
          </div>
          
        </section> 

      </main>
    );
  }
}
function Meme({ content, url, memeHeader, color, textSize }) {
  
  return (
    <div id="meme" className="meme-container" style={{ background: `url(${url}) no-repeat `, backgroundSize: 'cover' }}>
      {/* maxWidth: 600, maxHeight: 400 */}
      <h3 style={{ color: color }}>
        <font size={textSize}>{memeHeader}</font>
      </h3>
      <h4 style={{ color: color }}>
        <font style={{ color: color }} size={textSize}>{content}</font>
      </h4>
      
      {/* <pre id="meme-pre" size={textSize}       
        style={{ color: color, maxHeight: 400, maxWidth: 600 }}>
      </pre> */}
    </div>
  );
}
// Set Options
function Background({ url, onChoose }) {
  return (
    
    <label>
      Select Background Image:
      <div>
        <input value={url} onChange={({ target }) => onChoose(target.value)}/>
        <input id="url-input" type="file" onChange={({ target }) => {
          const reader = new FileReader();
          reader.readAsDataURL(target.files[0]);
          reader.onload = () => onChoose(reader.result);
        }} />
        
      </div>
      {/* <span>
        <input value={url} onChange={({ target }) => onChoose(target.value)}/>
      </span> */}
    </label>
  );
}

function Content({ content, onChange }) {
  return (
    <section>      
      <label>
        Choose Meme Text: 
        <input 
          // style={{ marginLeft: 15 }}
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
          // style={{ marginLeft: 9 }} 
          value={memeHeader} 
          onChange={({ target }) => onChange(target.value)}
        />
      </label>
    </section>
  );  
}


export default App;
