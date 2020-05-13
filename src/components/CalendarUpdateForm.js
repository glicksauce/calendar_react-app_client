import React, { Component } from 'react';
// import Calendar from 'react-calendar'
// import * as $ from 'jquery'
// import CalendarDisplay from './CalendarDisplay.js'
// import { render } from '@testing-library/react';


class CalendarUpdateForm extends Component {
  
  state = {
    img_src: "",
    img_date: "",
    journal_entry: "",
    id: ""
  }

//   addImagesToState = imageArray =>{
//     let images = imageArray.map(x => x.img_src)
//     this.setState({
//       imageArray: images

//     })
//   }


//   dateConvert = (date) => {
//     //converts date before calling fetch
//     const stateDateFormatted = new Date(date)
//     .toISOString()
//     .toString()
//     .substring(0,10)
//     return stateDateFormatted
//   }


  handleChange = (event) => {
    console.log(event.target.id, event.target.value)
    this.setState({[event.target.id] : event.target.value})
}

   handleSubmit =(event) => {
    event.preventDefault()
    const entryToModify = {
      img_date: this.state.img_date,
      img_src: this.state.img_src,
      journal_entry: this.state.journal_entry
    }

    //call PUT function
    let newPhotoObject
    this.props.handleUpdate(event, entryToModify, this.state.id)

    this.props.updateState(entryToModify,this.props.displayIndex)
    // //pause to get POST results
    // setTimeout(()=>{
    //     console.log("new photo id is: " + JSON.stringify(newPhotoObject))
    //     imageToAdd["id"] = newPhotoObject.id
    // },500)

    //add updated image to state but only if on the date image was added in
    // let propsDate = this.dateConvert(this.props.selectedDate)
    // if (propsDate == imageToAdd.img_date){
    //     this.props.addedImage(entryToModify.img_src, imageToAdd)
    // }

}

componentDidMount() {
    this.setState({
        id: this.props.entry.id,
        img_date: this.props.entry.img_date,
        img_src: this.props.entry.img_src,
        journal_entry: this.props.entry.journal_entry
    })
}

  render() {
        return (
            <>
            <div className="update-container" id={"update-container"+this.state.id} hidden={true}>    
            <form onSubmit={this.handleSubmit}>       
                <input 
                    className="journal-entry" //borrowing this className even though its not journal entry
                    type="text"
                    id="img_date"
                    name="img_date"
                    placeholder="image date"
                    value={this.state.img_date}
                    onChange={this.handleChange}
                />
                <input 
                    className="journal-entry" //borrowing this className even though its not journal entry
                    type="text"
                    id="img_src"
                    name="img_src"
                    placeholder="image source"
                    value={this.state.img_src}
                    onChange={this.handleChange}
                />
                <input 
                    className="journal-entry"
                    type="text"
                    id="journal_entry"
                    name="journal_entry"
                    placeholder="journal_entry"
                    value={this.state.journal_entry}
                    onChange={this.handleChange}
                />            
                <input
                    type="submit"
                />
            </form>
            </div>
            </>
        )
    }
}

export default CalendarUpdateForm