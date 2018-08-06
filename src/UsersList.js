import React, { Component } from 'react';
import './UsersList.css';
class UsersList extends Component {
    constructor(props){
        super(props);
        this.state={items:[]};
    }
    listing() {
        console.log(this.props.list);
        const list = this.props.list;
        const tempArr=[];
        for(var i=0;i<list.items.length;i++){
            const body={avatar_url:list.items[i].avatar_url,login:list.items[i].login,score:list.items[i].score};
            tempArr.push(body);
        }
        const newArr=this.state.items.concat(tempArr);
        this.setState({items:newArr});
      }
    
    
    render() {
        return (
            <div>
                { <div className="container">
                    <div className="row">{
                        this.state.items.map((item, index) => <div key={index} className="col-md-6 col-xs-12 col-sm-6 col-lg-6">
                            <div className="data">
                                <span className="cont">
                                    <div className="image">
                                        <img src={item.avatar_url} className="img-circle" alt="Cinque Terre" width="130" height="130"></img>
                                        <p>Name : {item.login}
                                            <br></br> Score : {item.score}
                                        </p>
                                    </div>
                                </span>
                            </div>
                        </div>
                        )}
                    </div>
                </div> }
            </div>
        );
    }
}
export default UsersList;