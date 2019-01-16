import React, { Component } from 'react';
import styles from './App.css';
import Person from './Person/Person.js';

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
    //Better to use shallow copy as it copies the obect.
    //Also can use Object.create({}, type) to create immutable version of the obejcts.
    //const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons:persons});
  }

  onTestChangeEventHandler = (key) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });
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
    
    let person = null;
    let btnClass = null;
    if(this.state.showPersons) {
      person = (
      <div>
                {
          this.state.persons.map((person, index) => {
            return <Person name={person.name} age={person.age} key={person.id} change={(event)=>this.onChangeHandler(event, person.id)} 
            click = {()=>this.deletePersonHandler(index)} />;
          })
        }
        
    </div>);

        btnClass= styles.Red;
    }

    const classes = [];
    if(this.state.persons.length >=2) {
      classes.push(styles.red);
    }

    if(this.state.persons.length >=1) {
      classes.push(styles.bold);
    }

    return (
      <div className={styles.App}>
        <h1>Person Listing</h1>
        <p className={classes.join(' ')}>This is really Working!!!</p>
        <button className={btnClass} onClick={this.togglePersonHandler}>Toggle Person</button>
         {person}
      </div>
    );
  }
}

export default App;
