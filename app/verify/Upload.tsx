'use server'
import React from 'react'

async function Upload(buttonPressed) {
    const isButtonPressed = await buttonPressed
    console.log(isButtonPressed)
}

export default Upload