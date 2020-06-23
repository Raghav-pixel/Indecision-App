import React from 'react'
import AddOption from '../AddOption/AddOption'
import Options from '../Options/Options'
import Action from '../Action/Action'
import Header from '../Header/Header'
import OptionModal from '../OptionModal/OptionModal'

class IndecisionApp extends React.Component{
    constructor(props){
        super(props)
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleClearSelectedOption = this.handleClearSelectedOption.bind(this)
        this.state = {
            options : ['thing one', 'thing two', 'thing four'],
            selectedOption : undefined
        }
    }

componentDidMount() {
    try{
        const json = localStorage.getItem('options')
        const options = JSON.parse(json)
    
        if(options){
        this.setState(() => ({options}))
    }
    }
    catch(e){
        // Do nothing at all
    }
}

componentDidUpdate(prevProps, prevState){
    if(prevState.options.length !== this.state.options.length){
        const json = JSON.stringify(this.state.options)
        localStorage.setItem('options', json)
    }
}

    handleDeleteOptions() {
        this.setState(()=>{
            return {
                options:[]
            }
        })
    }

    handleDeleteOption(optionToRemove){
        this.setState((prevState) =>({options: prevState.options.filter((option)=> optionToRemove!== option) }))
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        this.setState(() => ({selectedOption : option}))
    }

     handleClearSelectedOption() {
        this.setState(() => ({
            selectedOption : undefined
        }))
    }

    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item';
        } else if(this.state.options.indexOf(option) > -1){
            return 'This option already exists'
        }
        this.setState((prevState)=>{
            return{
                options: prevState.options.concat([option])
            }
        })
    }

            render(){
                const title = 'Indecision'
                const subtitle = 'Put your life in the hands of a computer'
            
            return(
            <div>
            <Header title={title} subtitle={subtitle}/>
            <Action 
            hasOptions={this.state.options.length>0}
            handlePick={this.handlePick}/>
            <Options 
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}/>
            <AddOption 
            handleAddOption={this.handleAddOption}/>
            <OptionModal 
            selectedOption={this.state.selectedOption}
            handleClearSelectedOption={this.handleClearSelectedOption}/>
                    </div>
                );
            }
        }

        export default IndecisionApp;