import React, { Component, Fragment } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import styles from './App.css';


class App extends Component {

  state = {
    content: 'Take me to campsite #7!',
    cow: 'default',
    url:'http://www.vaguebuttrue.com/images/1435713417-RaccoonridesalligatorWEBSITE.jpg' 
  };

  handleContentChange = (content = ' ') => {
    this.setState({ content });
  };

  handleBackgroundChoose = (url = '') => {
    this.setState({ url });
  };

  handleExport = () => {
    dom2image.toBlob(this.image)
      .then(blob => {
        fileSaver.saveAs(blob, 'cute-cowsay.png');
      });
  };


  render() {
    const { content, url } = this.state;

    return (
      <main className={styles.app}>
        <section>
          <h2>Set Options</h2>
          <Content content={content} onChange={this.handleContentChange}/>
          <Background url={url} onChoose={this.handleBackgroundChoose}/>
        </section> 

        <section className="cow-say">
          <h2>Behold Your Meme!</h2>
          <p ref={node => this.image = node}>
            <Meme content={content} url={url}/>
          </p>
          <p>
            <button onClick={this.handleExport}>Export</button>
          </p>
        </section>

      </main>
    );
  }
}

function Meme({ content, url }) {

  return (
    <Fragment>
      <pre style={{ background: `url(${url}) no-repeat ` }}>{content}</pre> 
    </Fragment>
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
      <label>
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