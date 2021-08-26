import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateAthlete extends Component{
  constructor(props){
    super(props);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleTeamDistanceChange = this.handleTeamDistanceChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleJourneyChange = this.handleJourneyChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      team: false,
      teamName: 'N/A',
      name: '',
      journey: '15',
      activity: 'Run',
      hours: '0',
      minutes: '0',
      seconds: '0',
      totalTime: '0',
      location: '',
      comment:'',
    }
  };
  handleJourneyChange =(e) =>{
    console.log(e.target.value)
    if(e.target.value === "Team"){
      this.setState({team: true})
    } else{
      this.setState({journey: e.target.value})
      this.setState({team: false})
    }
  }
  handleTeamChange =(e) =>{
    this.setState({teamName: e.target.value})
    console.log(this.state.teamName)
  }
  handleTeamDistanceChange=(e) =>{
    this.setState({journey: e.target.value})
    console.log("team distance "+this.state.journey)
  }
  handleNameChange = (e) =>{
    this.setState({name: e.target.value})
    console.log(this.state.name)
  }
  handleActivityChange =(e) =>{
    this.setState({activity: e.target.value})
    console.log(this.state.activity)
  }
  handleHourChange =(e) =>{
    this.setState({hours: e.target.value})
    console.log(this.state.hours)
  }
  handleMinuteChange =(e) =>{
    this.setState({minutes: e.target.value})
    console.log(this.state.minutes)
  }
  handleSecondChange =(e) =>{
    this.setState({seconds: e.target.value})
    console.log(this.state.seconds)
  }
  handleLocationChange =(e) =>{
    this.setState({location: e.target.value})
    console.log(this.state.location)
  }
  handleCommentChange =(e) =>{
    this.setState({comment: e.target.value})
    console.log(this.state.comment)
  }
  onSubmit(e){
    e.preventDefault()
    if(this.state.team !== false){
      console.log("its a team")
      this.setState({journey: this.state.teamDistance, teamName: "N/A"})
      console.log(this.state.journey)
    }
    const athleteObject = {
      teamName: this.state.teamName,
      name: this.state.name,
      journey: this.state.journey,
      activity: this.state.activity,
      hours: this.state.hours,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
      totalTime: +this.state.seconds+(+this.state.minutes*60)+(+this.state.hours*3600),
      location: this.state.location,
      comment:this.state.comment,
    }
    console.log(athleteObject)
  
    axios.post('http://localhost:4000/athletes/create-athlete', athleteObject)
      .then(res => console.log(res.data));

    this.setState({
      teamName: '',
      teamDistance: 0,
      name: '',
      journey: '',
      activity: '',
      hours: '',
      minutes: '',
      seconds: '',
      location: '',
      comment:'',
    });
  }
  
  render(){
    const TeamForm = () =>(
        <Form.Group controlId="Name">
            <Form.Label>Team Name</Form.Label>
                <select value = {this.state.teamName} onChange={this.handleTeamChange} name="teamName" id="teamName">
                    <option value="Farther Together">Farther Together</option>
                    <option value="Happy Feet">Happy Feet</option>
                    <option value="Magtulungan Tayo">Magtulungan Tayo</option>
                    <option value="Mighty Max">Mighty Max</option>
                    <option value="Pengy Peeps">Pengy Peeps</option>
                    <option value="Reimagining CML Together">Reimagining CML Together</option>
                    <option value="Tanner Team">Tanner Team</option>
                </select>
                <br></br>
                <Form.Label>How long was your journey?</Form.Label>
                <input value={this.state.teamDistance} onChange={this.handleTeamDistanceChange} type="number" id="Miles" min="0"  max='135' name="miles"/>Miles
                <br></br>
            </Form.Group>
            
                  
    )
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" required={true} onChange={this.handleNameChange}/>
        </Form.Group>
        <br></br>
        <Form.Group controlId="Journey">
          <Form.Label>Choose Your Journey</Form.Label>
          <br></br>
            <select onChange={this.handleJourneyChange} name="journey" id="journey">
                <option value="15">Tony's Journey (15 Miles)</option>
                <option value="30">Kailash's Journey (30 miles)</option>
                <option value="135">Ebrima's Journey (135 miles)</option>
                <option value="Team">Team Journey</option>
            </select>
        </Form.Group>
        <br></br>
        {this.state.team ? <TeamForm/> : false}
        <Form.Group controlId="Activity">
            <Form.Label>Choose your Activity</Form.Label>
            <br></br>
            <select onChange={this.handleActivityChange} name="activity" id="activity">
                <option value="Run">Run</option>
                <option value="Walk">Walk</option>
                <option value="Bike">Bike</option>
                <option value="Swim">Swim</option>
            </select>
        </Form.Group>
        <br></br>
        <Form.Group controlId="Time">
            <Form.Label>Record your time</Form.Label>
            <br></br>
            <input onChange={this.handleHourChange}type="number" id="hours" required={true} min='0' max='23' name="hours"/>Hours 
            <input onChange={this.handleMinuteChange} type="number" id="minutes" required={true} min='0' max='59' name="minutes"/>Minutes 
            <input onChange={this.handleSecondChange}type="number" id="seconds" required={true} min='0' max='59' name="seconds"/>Seconds
        </Form.Group>
        <br></br>
        <Form.Group controlId="Location">
            <Form.Label>Share where you were</Form.Label>
            <br></br>
            <input onChange={this.handleLocationChange} type="text" id="location" required={true} name="location"/>
        </Form.Group>
        <Form.Group controlId="Comments">
            <Form.Label>Share your thoughts! How did it go? Shout out to your teammates!</Form.Label>
            <br></br>
            <input onChange={this.handleCommentChange} type="text" id="comments" required={false} name="comments"/>
        </Form.Group>
        <br></br>
        <Button variant="danger" size="lg" block="block" type="submit">
          Submit Result!
        </Button>
      </Form>
    </div>);
  }
}
