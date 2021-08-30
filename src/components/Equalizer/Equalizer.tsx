import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'


const ModalHeader = () => {
    return <div><h3>Equalizer</h3></div>
}
const ModalFooter = (props: any) => {
    return <>
        <button className="btn-primary" onClick={props.handleClose}>Cancel</button>
        <button className="btn-primary" onClick={props.handleOk} >OK</button>
    </>
}

const Equalizer = (props: any) => {
    const [showModal, setShowModal] = useState(props.showHide);
    let { showHide } = props;

    const handleSubmit = (e: any) => {

    }

    useEffect(() => {
        setShowModal(showHide)
    }, [showHide])

    return (
        <Modal show={showModal}
            header={<ModalHeader />}
            footer={<ModalFooter handleClose={() => setShowModal(false)} handleOk={(e: any) => handleSubmit(e)} />}
        >

            <input type="range" name="slider" id="" />
        </Modal>
    )
}

export default Equalizer
