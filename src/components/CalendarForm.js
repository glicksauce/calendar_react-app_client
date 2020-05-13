import React, { Component } from 'react';
import * as $ from 'jquery'
// import Calendar from 'react-calendar'
// import CalendarDisplay from './CalendarDisplay.js'
// import { render } from '@testing-library/react';


class CalendarForm extends Component {
  
  state = {
    img_src: "",
    img_date: "",
    journal_entry: ""
  }

  addImagesToState = imageArray =>{
    let images = imageArray.map(x => x.img_src)
    this.setState({
      imageArray: images

    })
  }

  onMouseOver = () =>{
    console.log("hi")
  }

  onTileClick = () =>{
    //set brief timout so props is updated with correct data
    setTimeout(() => {
        let formattedDate = this.props.selectedDate
        .toISOString()
        .toString()
        .substring(0,10)
        this.setState({
            img_date: formattedDate
        })
    },200)
  }

  dateConvert = (date) => {
    //converts date before calling fetch
    const stateDateFormatted = new Date(date)
    .toISOString()
    .toString()
    .substring(0,10)
    return stateDateFormatted
}


  componentDidMount() {
    this.onTileClick()
    
    $('.react-calendar__tile').click(this.onTileClick)

  }

  handleChange = (event) => {
    console.log(event.target.id, event.target.value)
    this.setState({[event.target.id] : event.target.value})
}

handleSubmit =(event) => {
    event.preventDefault()
    const imageToAdd = {
      img_date: this.state.img_date,
      img_src: this.state.img_src,
      journal_entry: this.state.journal_entry
    }

    //call POST function
    let newPhotoObject
    this.props.handleSubmit(event, imageToAdd).then(result => newPhotoObject = result)
    console.log("new photo id is: " + newPhotoObject)

    //pause to get POST results
    setTimeout(()=>{
        console.log("new photo id is: " + JSON.stringify(newPhotoObject))
        imageToAdd["id"] = newPhotoObject.id
    },500)

    //add new image to state but only if on the date image was added in
    let propsDate = this.dateConvert(this.props.selectedDate)
    if (propsDate === imageToAdd.img_date){
        this.props.addedImage(imageToAdd.img_src, imageToAdd)
    }

}

  render() {
    //console.log(this.dateConvert(this.props.selectedDate))
    return (
      <>
      <h3>Add Images</h3>
        <form onSubmit={this.handleSubmit}>
            <input 
                type="text"
                id="img_date"
                name="img_date"
                placeholder="image date"
                value={this.state.img_date}
                onChange={this.handleChange}
            />
            <input 
                type="text"
                id="img_src"
                name="img_src"
                placeholder="image source"
                value={this.state.img_src}
                onChange={this.handleChange}
            />
            <input 
                type="text"
                id="journal_entry"
                name="journal_entry"
                placeholder="journal entry"
                value={this.state.journal_entry}
                onChange={this.handleChange}
            />            
            <input
                type="submit"
            />
        </form>
        </>
    )
  }
}

export default CalendarForm