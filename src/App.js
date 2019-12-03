import React, { Component } from 'react';
import './App.css';
class App extends Component {
    constructor() {
        super();
        this.state = {
            inputContent: '',
            listToDo:[],
            nextId:1,
        }
    }
    handleChange=(e) =>{
        this.setState({
            inputContent: e.target.value
    })
    }
    addItem = () => {
      let newItem={ "id":this.state.nextId,
                    "content":this.state.inputContent,
                    "myClass":"item",
                    "nbrClick":1,
                    "completed":"Complete"
                },
          newList=[...this.state.listToDo,newItem]
         
          if (this.state.inputContent!=='')
                this.setState({
                nextId: this.state.nextId+1,
                listToDo:newList,
                inputContent:'',
                btnCmpltUndo:"Complete"
            })
    }
  deleteItem = (id) =>{
      const updatedList=this.state.listToDo.filter( (el) => {
          return el.id!==id
      })
      this.setState({
          listToDo:updatedList
      })
  }
  completeItem = (id)=>{
      for(let i=0;i<this.state.listToDo.length;i++){
      if (this.state.listToDo[i].id===id){
      this.state.listToDo[i].nbrClick=this.state.listToDo[i].nbrClick+1
      this.setState({
        listToDo:this.state.listToDo
      })
         if (this.state.listToDo[i].nbrClick%2==0){
            this.state.listToDo[i].myClass="item iscompleted"
            this.state.listToDo[i].completed="Undo"
            this.setState({
              listToDo:this.state.listToDo
            })
            } else {
              this.state.listToDo[i].myClass="item"
              this.state.listToDo[i].completed="Complete"
              this.setState({
                listToDo:this.state.listToDo
              })
              }
      }
    }
  }
    render() {
 
        return (
            <div className="App">
                <section className="add-to-do-item">
                    <div className="add-container">
                        <h1>To-Do App!</h1>
                        <p>Add New To-Do</p>
                        <div className="form-container">
                            <input  type="text"
                                    name="add-to-do"
                                    id="add-to-do-input"
                                    placeholder="Enter new task"
                                    value={this.state.inputContent}
                                    onChange={(e)=>this.handleChange(e)}
                            /><br/>
                            <input type="submit" value="Add" id="add-btn" onClick={()=> this.addItem()}/>
                        </div>
                    </div>
                </section>
                <section className="show-to-do-list">
                    <div className="show-container">
                        <div className="heading-division">
                            <h2>Let's get some work done!</h2>
                            <hr className="heading-rule"/>
                        </div>
                        <div id="to-do-items">
                            <ul id="my-to-do-List">
                            {this.state.listToDo.map((el,i)=>{
                                    return (
                                        <li className="items" key={i}>
                                            <span className="btn" onClick={()=>this.completeItem(el.id)}>{el.completed}</span>
                                            <span className="btn" onClick={()=>this.deleteItem(el.id)}>Delete</span>
                                            <span className={el.myClass}>{el.content}</span>
                                        </li>
                                    )
                                    }
                                )}
                            </ul>
                        </div>
                    </div>
                </section>
    </div>
         );
    }
}
export default App;