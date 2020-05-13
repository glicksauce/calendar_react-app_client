import React, { Component } from 'react';
import CalendarForm from './CalendarForm.js'
import CalendarUpdateForm from './CalendarUpdateForm.js'
import * as $ from 'jquery'

let BaseURL = process.env.REACT_APP_BACKEND

// import Calendar from 'react-calendar'
// import CalendarDisplay from './CalendarDisplay.js'
// import { render } from '@testing-library/react';


class CalendarImages extends Component {
  
  state = {
    imageArray: [],
    photoArray: []
  }

  addImagesToState = imageArray =>{
    let images = imageArray.map(x => x.img_src)
    this.setState({
      imageArray: images,
      photoArray: imageArray

    })
  }

  onMouseOver = () =>{
    console.log("hi")
  }

  displayImage = (date) =>{

    //converts date before calling fetch
    const stateDateFormatted = new Date(date)
    .toISOString()
    .toString()
    .substring(0,10)
    
    console.log("clicked date is", stateDateFormatted)
    console.log(process.env)
    fetch(BaseURL+ '/calendars/' + stateDateFormatted)                                        
    .then(response => response.json())                                            
    .then(json => {
      console.log("fetch results: ", json)
      if (json.photos) {
        this.addImagesToState(json.photos)
      }
    })                                              
    .catch(err => console.log(err)) 
  }

  addedImage = (img_src, image) =>{
    let newImages = this.state.imageArray
    newImages.push(img_src)
    let newPhotos = this.state.photoArray
    newPhotos.push(image)
    this.setState({
        imageArray: newImages,
        photoArray: newPhotos
    })
  }

  //successor to 'addedImage
  updateState = (imageEntry, index) =>{
    let newPhotos = this.state.photoArray
    newPhotos.splice(index,1, imageEntry)
    this.setState({
      photoArray: newPhotos
    })
  }

  deleteImage = (imageIndex, imageId) =>{
    console.log("delete clicked index : " + imageIndex + ", Id: " + imageId)

    //remove image from state
    let refreshedImages = this.state.imageArray
    let refreshedPhotos = this.state.photoArray
    refreshedImages.splice(imageIndex,1)
    refreshedPhotos.splice(imageIndex,1)
    // console.log(refreshedImages)
    this.setState({
      imageArray: refreshedImages,
      photoArray: refreshedPhotos
    })

    //remove image from DB
    this.props.deletePhoto(imageId)
  }

  displayUpdateForm = (imageId) =>{
    // console.log(imageId)
    // console.log("update clicked")
    $('#update-container'+imageId).toggle()

  }

  componentDidMount() {
    
    $('.react-calendar__tile').click((e)=>{
      //sometimes this will be undefined if browser is slow or something
      if ($(e.target).children().length >= 1) {
        console.log($(e.target).children(), $(e.target).children().length)
        let clickedDate = ($(e.target).children()[0].ariaLabel)
        this.displayImage(clickedDate)
      }
    })
    // fetch(BaseURL + '/calendars')                                        
    //   .then(response => response.json())                                            
    //   .then(json => console.log(json))                                              
    //   .catch(err => console.log(err)) 
    
  }

  render() {

    return (
      <>
      <h2>{this.props.selectedDateFormatted}</h2>
      {this.state.photoArray.map((image,index) => {

        return (
        <div className="entry-container" key={index}>
          {/* <div className="calendar-image" ></div> */}
            <div className="column column1"> <img src={image.img_src} alt="-X-"></img></div>
            <div className="column column2">{image.journal_entry}</div>
            <div className="column column3">
              <div className="delete-button" onClick={()=>this.deleteImage(index, image.id)} id={image.id}>X</div>
              <div className="update" onClick={()=>this.displayUpdateForm(image.id)}>update</div>
            </div>
          

          <CalendarUpdateForm
            entry={this.state.photoArray[index]}
            handleUpdate={this.props.handleUpdate}
            updateState={this.updateState}
            displayIndex={index}
          />
        </div>
        )
      })}
      <CalendarForm
        selectedDate = {this.props.selectedDate}
        handleSubmit={this.props.handleSubmit}
        addedImage={this.addedImage}
      />
      
      
      </>
    )
  }
}

export default CalendarImages