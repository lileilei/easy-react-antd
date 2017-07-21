import React, {Component} from 'react'
import './CoreLayout.less'
import './hover.css'
class CoreLayout extends Component {

  render(){
    return (
      <div id="layout">
        {this.props.children}
      </div>
    )
  }
}
CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}
export default CoreLayout
