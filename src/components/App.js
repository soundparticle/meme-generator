import React, { Component } from 'react';



class App extends Component {

  state = {
    content: ' ',
  };

  handleContentChange = (content = ' ') => {
    this.setState({ content });
  };


  render() {
    const { content } = this.state;

    return (
      <main className={StyleSheet.app}>
        <section>
          <h2>Set Options</h2>
          <Content content={content} onChange={this.handleContentChange}/>
          
        </section>
      </main>
    );
  }
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