import React, { Component } from 'react'
import Project from './project.component'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home component</h2>
                <Project currentUser = { this.props.currentUser }/>
            </div>
        )
    }
}
