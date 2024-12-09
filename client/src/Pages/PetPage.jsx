import React from 'react'
import Card from '../components/Card'

const PetPage = () => {
  return (
    <div className="container">
        <h1>Adopt Pets By Pet Type</h1>

        <div className="filter">
            <select name="" id="">
                <option value="">All</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="rabbit">Rabbit</option>
                <option value="hamster">Hamster</option>
                <option value="parrot">Parrot</option>
                <option value="lovebird">LoveBird</option>
                <option value="reptile">Reptiles</option>
                <option value="turtle">Turtle</option>
                <option value="tortoise">Tortoise</option>
                <option value="fish">Fish</option>
            </select>
        </div>
        <div className="shops-holder">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>
    </div>
  )
}

export default PetPage