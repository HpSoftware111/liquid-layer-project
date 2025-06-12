import { useState } from 'react';
import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { CgArrowsExchangeAlt } from "react-icons/cg";

const ModalComponent = (props) => {
    return (
        <Modal show={props.isShow === 'default'} onClose={() => props.parentCallback(undefined)}>
            <Modal.Header>ROI CACULATOR</Modal.Header>
            <Modal.Body>

                <div className="border flex rounded-2xl bg-black border-1 p-4 m-2 h-auto text-dark bg-gray-700">
                    <div className='justify-center items-center w-full'>
                        <input type='text' name='number' dir='rtl' className='w-full bg-dark-200 accent-pink-500 p-2' />
                        <p className='text-white pt-2 text-xl float-right'>0.00</p>
                    </div>
                    <div className='justify-center items-center pl-4 flex'>
                        <button className='float-right text-white transform rotate-90 border-1 rounded-full'>
                            <CgArrowsExchangeAlt />
                        </button>
                    </div>
                </div>
                <div className='grid grid-cols-2 pt-0 pr-4 mb-2 pl-40 w-full'>
                    <p className='hidden'>asd</p>
                    <p className='float-right text-dark'>Balance: 0.00</p>
                </div>
                <div className='flex justfy-center items-center grid grid-cols-4 h-auto m-2'>
                    <button type="button" className="text-green-900 bg-white border border-white hover:bg-green-500 rounded-full text-2xl m-2">25%</button>
                    <button type="button" className="text-green-900 bg-white border border-white hover:bg-green-500 rounded-full text-2xl m-2">50%</button>
                    <button type="button" className="text-green-900 bg-white border border-white hover:bg-green-500 rounded-full text-2xl m-2">75%</button>
                    <button type="button" className="text-green-900 bg-white border border-white hover:bg-green-500 rounded-full text-2xl m-2">100%</button>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.parentCallback(undefined)}>I accept</Button>
                <Button color="gray" onClick={() => props.parentCallback(undefined)}>
                    Decline
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;