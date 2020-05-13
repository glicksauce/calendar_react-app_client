import React, { Component } from 'react';
import Calendar from 'react-calendar'
import CalendarImages from './CalendarImages.js'
import 'react-calendar/dist/Calendar.css'
// import * as $ from 'jquery'
// import CalendarDisplay from './CalendarDisplay.js'
// import { render } from '@testing-library/react';

let BaseURL = process.env.REACT_APP_BACKEND

class CalendarGrid extends Component {
  
  state = {
    date: new Date()
  }

  onChange = date => this.setState({ date })

  onMouseOver = () =>{
    console.log("hi")
  }

  displayImage = () =>{
    const stateDateFormatted = new Date(this.state.date)
    .toISOString()
    .toString()
    .substring(0,10)
    
    console.log("state date is", stateDateFormatted)
    fetch(BaseURL + '/calendars')                                        
    .then(response => response.json())                                            
    // .then(json => {
    //   console.log(json[0].img_date)
    //   if (json[0].img_date == stateDateFormatted){
    //     console.log("they equals")
    //     console.log(json[0].photos)
    //   } else{
    //     console.log("they no equals")
    //   }
    // })                                              
    .catch(err => console.log(err)) 
  }
  // componentDidMount() {
  //   $('.react-calendar__tile').click(()=>{
  //     this.displayImage()
  //   })
  //   fetch('/calendars')                                        
  //     .then(response => response.json())                                            
  //     .then(json => console.log(json))                                              
  //     .catch(err => console.log(err)) 
    
  // }
  
  render(){
    // let injectedProps = {}

    // injectedProps.push(this.onChange)
    // injectedProps.push(this.onMouseOver)

    return (
      <>
        <Calendar 
        onChange={this.onChange}
        value={this.date}/>
        <div className="visuals-container">
        <CalendarImages 
          selectedDateFormatted={this.state.date.toString().substring(0,15)}
          selectedDate = {this.state.date}
          handleSubmit={this.props.handleSubmit}
          handleUpdate={this.props.handleUpdate}
          deletePhoto={this.props.deletePhoto}
        />
        </div> 
      </>
    )
  }
}

export default CalendarGrid