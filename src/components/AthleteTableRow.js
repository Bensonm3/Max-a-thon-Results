import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default class AthleteTableRow extends Component {
    render() {
        // display single digit times correctly
        if(parseInt(this.props.obj.hours,10)<10){
            this.props.obj.hours ='0'+this.props.obj.hours;
            }
        if(parseInt(this.props.obj.minutes,10)<10){
            this.props.obj.minutes ='0'+this.props.obj.minutes;
            }
        if(parseInt(this.props.obj.seconds,10)<10){
            this.props.obj.seconds ='0'+this.props.obj.seconds;
            }
        return (
            
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.journey}</td>
                <td>{this.props.obj.activity}</td>
                <td>{this.props.obj.hours}:{this.props.obj.minutes}:{this.props.obj.seconds}</td>
                <td>{this.props.obj.teamName}</td>
                <td>{this.props.obj.location}</td>
                <td>{this.props.obj.comment}</td>
                <td>{this.props.obj.totalTime}</td>
                <td>
                <Link className="edit-link" to={"/edit-athlete/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.deleteAthlete} size="sm" variant="danger">Delete</Button>
                </td>
                
                <td>
                </td>
            </tr>
        );
    }
}