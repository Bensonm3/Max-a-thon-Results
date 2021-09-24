import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AthleteTableRow from './AthleteTableRow';
import '../App.css'

export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.sortByDistance = this.sortByDistance.bind(this);
    this.sortByActivity = this.sortByActivity.bind(this);
    this.sortByTime = this.sortByTime.bind(this)
    this.DataTable = this.DataTable.bind(this);
    this.state = {
      athletes: [],
      search: null,
      distanceSort: true,
      activitySort: false,
      timeSort: false

    };
  }

  componentDidMount() {
        // axios.get('http://localhost:4000/athletes/')
        axios.get('https://max-a-thon-backend.herokuapp.com/athletes/')
      .then(res => {
        console.log(res)
        this.setState({
          athletes: res.data,

        });
        console.log(this.state.athletes)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidUpdate(){
  }

  DataTable() {
    let data = this.state.athletes
    let filteredData = data.filter((athletes) => {
      
      if(this.state.search === null){
        return data
      } else if (athletes.name.toLowerCase().includes(this.state.search.toLowerCase()) || athletes.teamName.toLowerCase().includes(this.state.search.toLowerCase())){
        // console.log(athletes)
        return athletes
      }
    })
    return filteredData.map((res, i) => {
      return <AthleteTableRow obj={res} key={i} />;
    })
  }

  compareTimesAscend(a, b) {
    if((a.hours*3600)+(a.minutes*60)+a.seconds <= (b.hours*3600)+(b.minutes*60)+b.seconds){
      return -1;
    } else if ((a.hours*3600)+(a.minutes*60)+a.seconds === (b.hours*3600)+(b.minutes*60)+b.seconds) {
      return 0;
    } else {
      return 1
    }
     
  } 

  compareTimesDescend(a, b) {
    if((a.hours*3600)+(a.minutes*60)+a.seconds >= (b.hours*3600)+(b.minutes*60)+b.seconds){
      return -1;
    } else if ((a.hours*3600)+(a.minutes*60)+a.seconds === (b.hours*3600)+(b.minutes*60)+b.seconds) {
      return 0;
    } else {
      return 1
    }
     
  } 

  
  sortByTime(e){
    if(this.state.timeSort == false){
      let athleteList = [...this.state.athletes]
      const sortedList = athleteList.sort(this.compareTimesAscend);
      this.setState({
        athletes: sortedList, timeSort: true
      })
    } else {
      let athleteList = [...this.state.athletes]
      const sortedList = athleteList.sort(this.compareTimesDescend);
      this.setState({
        athletes: sortedList, timeSort: false
      })
    }
  }

  sortByDistance(e) {
    let athleteList = this.state.athletes;
    if(this.state.distanceSort ==true){
      let sortedAthletes = athleteList.sort((a, b) => (a.journey <= b.journey)? 1 : -1);
      this.setState({
        athletes: sortedAthletes,
        distanceSort: false
       })
       e.preventDefault()
    } else if(this.state.distanceSort ==false) {
    
      let sortedAthletes = athleteList.sort((a, b) => (a.journey >= b.journey)? 1 : -1);
      this.setState({
        athletes: sortedAthletes,
        distanceSort: true
       })
       e.preventDefault()
      }
  }

  sortByActivity(e) {
    let athleteList = this.state.athletes;
    if(this.state.activitySort ==true){
      console.log(this.state.activity)
      let sortedAthletes = athleteList.sort((a, b) => (a.activity <= b.activity)? 1 : -1);
      this.setState({
        athletes: sortedAthletes,
        activitySort: false
       })
       e.preventDefault()
    } else if(this.state.activitySort ==false) {
      console.log(this.state.activity)
      let sortedAthletes = athleteList.sort((a, b) => (a.activity >= b.activity)? 1 : -1);
      this.setState({
        athletes: sortedAthletes,
        activitySort: true
       })
       e.preventDefault()
      }
  }


  render() {
    
    return (<div className="table-wrapper">
      <input onChange={(e)=>this.setState({search: e.target.value})}type="text" placeholder="Find a Team or Athlete!"></input>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th><span className="nameRow">Name</span></th>
            <th>Bib </th>
            <th className="activityRow">Miles Completed <span onClick={this.sortByDistance}> &#8597;</span></th>
            <th><span className="activityRow">Activity<span onClick={this.sortByActivity}> &#8597;</span></span></th>
            <th>Time<span className="activityRow" onClick={this.sortByTime}> &#8597;</span></th>
            <th><span className="teamNameRow">Team</span></th>
            <th><span className="teamNameRow">Location</span></th>
            <th><span className="commentRow">Comments</span></th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}