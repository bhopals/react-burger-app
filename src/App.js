import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';
import Radium, {StyleRoot} from 'radium';

class App extends Component {

  state = {
    persons : [
      {id:'111', name:"Max", age:18},
      {id:'222', name:"Manu", age:22},
      {id:'333', name:"Bhopal", age:25}
    ],
    showPersons : false
  }



  togglePersonHandler= () => {
    const showPerson = this.state.showPersons;
    this.setState({
      showPersons : !showPerson
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons;//DEEP COPY
    const persons = this.state.persons.slice();//SHALLOW COPY
    //const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  onChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });
    console.log("PersonIndex:"+personIndex);

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;
    console.log("Fetched Person:", person);

    const persons = this.state.persons.slice();
    persons[personIndex] = person;

    this.setState({
      persons :  persons
    });


  }
  render() {
    const style = {
      backgroundColor : 'green',
      color:'white',
      font :'inherit',
      border:'1px solid blue',
      padding:'8px',
      cursor:'pointer',
      ':hover' : {
        'backgroundColor':'lightgreen',
        'color':'black'
      }
    }

    let person = null;
    if(this.state.showPersons) {
      person = (
      <StyleRoot>
      <div>
                {
          this.state.persons.map((person, index) => {
            return <Person name={person.name} age={person.age} change={(event)=>this.onChangeHandler(event, person.id)} 
            click = {()=>this.deletePersonHandler(index)} key={person.id}/>;
          })
        }
        
    </div>
    </StyleRoot>);

    style.backgroundColor='red';
    style[':hover'] = {
      'backgroundColor' : 'salmon',
      'color':'black'
    }
    }

    const classes = [];
    if(this.state.persons.length >=2) {
      classes.push('red');
    }

    if(this.state.persons.length >=1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Person Listing</h1>
        <p className={classes.join(' ')}>This is really Working!!!</p>
        <button  style={style} onClick={this.togglePersonHandler}>Toggle Person</button>
         {person}
      </div>
    );
  }
}

export default Radium(App);
