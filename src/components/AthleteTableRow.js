import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class AthleteTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteAthlete = this.deleteAthlete.bind(this);
    }

    deleteAthlete() {
          axios.delete('https://max-a-thon-backend.herokuapp.com/athletes/delete-athlete/' + this.props.obj._id)
        //  axios.delete('/athletes/delete-athlete/'+ this.props.obj._id)   
            .then((res) => {
                console.log('athlete successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }
     renderNum = (e)=> {
        if(e < 10){
            return '0'+e
        } else{
            return e
        }
    }
    render() {
        return (
            
            <tr>
                
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.bib}</td>
                <td>{parseInt(this.props.obj.journey)}</td>
                <td>{this.props.obj.activity}</td>
                <td>{this.renderNum(this.props.obj.hours)}:{this.renderNum(this.props.obj.minutes)}:{this.renderNum(this.props.obj.seconds)}</td>
                <td>{this.props.obj.teamName}</td>
                <td>{this.props.obj.location}</td>
                <td>{this.props.obj.comment}</td>
                <td>
                    <Button onClick={this.deleteAthlete} size="sm" variant="danger">Delete</Button>
                </td>
                
                <td>
                </td>
            </tr>
        );
    }
}