import React from 'react'
import Modal from 'react-modal'

const OptionModal = (props) => {
    return(
            <Modal
            isOpen={!!props.selectedOption}
            onRequestClose={props.handleClearSelectedOption}
            contentLabel={'selected Option'}>
                
                <h3>Selected Option</h3>
                {props.selectedOption && <p>{props.selectedOption}</p>}
                <button onClick={props.handleClearSelectedOption}>OK</button>
            </Modal>
    )
}

export default OptionModal;