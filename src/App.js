import React, { Component } from 'react';
import './App.css';
import UsersList from './UsersList.js';
class App extends Component {
  constructor() {
    super();
    this.child = React.createRef();
    this.state = { name: '', data: '', clicked: false, page: 1 };
    this.firstLoad = this.firstLoad.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  async firstLoad() {
    const name=this.state.name;
    const page=this.state.page;
    if (name !== '') {
      const data = await fetch('https://api.github.com/search/users?q=' + name + '&page=' + page).then(response => {
        return response.json();
      }).then(data =>
        data
      ).catch(error => {
        console.log(error);
      });
      this.setState({ data: data })
      this.setState({page:this.state.page+1, clicked: true });
      this.child.current.listing();
    }
    else {
      alert("Value can't be Empty");
    }
  }
  handleChange(event) {
    const name = event.target.value;
    this.setState({ name: name });
    this.firstLoad = this.firstLoad.bind(this);
  }
  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.firstLoad();
    } 
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div>
         <div className="box">
          <input type="text" value={this.state.name} placeholder="Search" onChange={this.handleChange.bind(this)} />
          <button onClick={this.firstLoad.bind(this)}>
            <span className="glyphicon glyphicon-search"></span>
          </button>
        </div>
        {this.state.clicked && this.state.data !== '' ? <UsersList ref={this.child} list={this.state.data} name={this.state.searchName} /> : ""}
      </div>
    );
  }
}

export default App;
