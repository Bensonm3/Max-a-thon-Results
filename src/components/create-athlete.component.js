import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../App.css'



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
    this.handleBibChange = this.handleBibChange.bind(this);
    
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
      teamDistance: '',
      bib: ''
    }
  };



  handleJourneyChange =(e) =>{
    console.log(e.target.value)
    if(e.target.value === "Team"){
      this.setState({team: true})
      this.setState({journey: e.target.value})
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
    this.setState({teamDistance: e.target.value})
    console.log("team distance "+this.state.journey)
    e.preventDefault()
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
  handleBibChange =(e)=>{
    this.setState({bib: e.target.value})
    console.log(this.state.bib)
  }
  onSubmit(e){
    e.preventDefault()
    let athleteJourney;
    if(this.state.team == true){
      athleteJourney = parseInt(this.state.teamDistance)
    } else {
      athleteJourney = parseInt(this.state.journey)
    }
    const athleteObject = {
      teamName: this.state.teamName,
      name: this.state.name,
      journey: parseInt(athleteJourney),
      activity: this.state.activity,
      hours: parseInt(this.state.hours),
      minutes: parseInt(this.state.minutes),
      seconds: parseInt(this.state.seconds),
      location: this.state.location,
      comment:this.state.comment,
      bib: this.state.bib

    }
    console.log(athleteObject)
    axios({
      method: "post",
      url: '/athletes/create-athlete',
      data: athleteObject
    })
    // axios.post('http://localhost:4000/athletes/create-athlete', athleteObject)
      .then(res => 
        console.log(res.data))
        .catch(err=>{
          console.log(err)
          });

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
      bib:''
    });
    window.location.href = "https://max-a-thon-results.herokuapp.com/athlete-list";
  }
  
  render(){
    const style = {
      display: 'none',
    }
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" required={true} onChange={this.handleNameChange}/>
        </Form.Group>
        <Form.Group controlId="Bib">
          <br></br>
            <Form.Label>Add your Bib Number, this is the three digit number found on your official Max-a-thon race bib</Form.Label>
            <br></br>
            <input onChange={this.handleBibChange} type="number" min="100" max="999" id="comments" required={true} name="bib"/>
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
        <div style={this.state.team ? undefined: style}>
        <Form.Group controlId="TeamName">
          <Form.Label>Team Name</Form.Label>{'  '}
          <br></br>
              <select value = {this.state.teamName} onChange={this.handleTeamChange} name="teamName" id="teamName">
                  <option value="Farther Together">Farther Together</option>
                  <option value="Happy Feet">Happy Feet</option>
                  <option value="Magtulungan Tayo">Magtulungan Tayo</option>
                  <option value="Mighty Max">Mighty Max</option>
                  <option value="Pengy Peeps">Pengy Peeps</option>
                  <option value="Reimagining CML Together">Reimagining CML Together</option>
                  <option value="Tanner Team">Tanner Team</option>
              </select>
              <br></br><br></br>
              <Form.Label>How long was your journey? </Form.Label>
              <br></br>
              <input placeholder='0' onChange={this.handleTeamDistanceChange} step='1' type="number" id="Miles" min="0"  max='135' name="miles"/> Miles
              <br></br><br></br>
          </Form.Group> 
          </div>
        {/* {this.state.team ? <TeamForm/> : false} */}
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
            <input onChange={this.handleHourChange}type="number" placeholder='0' id="hours" required={true} min='0' max='23' name="hours"/> Hours{' '} 
            <input onChange={this.handleMinuteChange} type="number" placeholder='0' id="minutes" required={true} min='0' max='59' name="minutes"/> Minutes{' '}  
            <input onChange={this.handleSecondChange}type="number" placeholder='0' id="seconds" required={true} min='0' max='59' name="seconds"/> Seconds{' '} 
        </Form.Group>
        <br></br>
        <Form.Group controlId="Location">
            <Form.Label>Share where you were</Form.Label>
            <br></br>
            <input onChange={this.handleLocationChange} type="text" id="location" required={true} name="location"/>
        </Form.Group>
        
        <Form.Group controlId="Comments">
          <br></br>
            <Form.Label>Share your thoughts! How did it go? Shout out to your teammates!</Form.Label>
            <br></br>
            <input onChange={this.handleCommentChange} type="text" id="comments" required={false} name="comments"/>
        </Form.Group>
        <br></br>
        
            <Button id="submitBtn"variant="danger" size="lg" block="block" type="submit">
              Submit Result!
            </Button>
          
      </Form>
    </div>);
  }
}
