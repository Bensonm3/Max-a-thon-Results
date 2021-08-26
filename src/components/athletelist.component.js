import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AthleteTableRow from './AthleteTableRow';


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      athletes: [],
      search: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/athletes/')
      .then(res => {
        this.setState({
          athletes: res.data,

        });
        console.log(this.state.athletes)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    let dataArray = [this.state.athletes]
    console.log(dataArray[0][0])
    console.log(this.state.athletes)
    if(this.state.search == null){
      return dataArray[0].map((res, i) => {
        return <AthleteTableRow obj={res} key={i} />;
      });
    } else if(dataArray[0].includes(this.state.search,)){
      return dataArray[0].map((res, i) => {
        return <AthleteTableRow obj={res} key={i} />;
      });
    }
  }
  athleteSearch =(e) =>{
    this.setState({search: e.target.value})
    console.log(this.state.search)
  }


  render() {
    
    return (<div className="table-wrapper">
      <input onChange={this.athleteSearch}type="text" placeholder="Search for an Athlete!"></input>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Miles Completed</th>
            <th>Activity</th>
            <th>Time</th>
            <th>Team Name</th>
            <th>Location</th>
            <th>Comment</th>
            <th>total time</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}