import React, { Component} from "react";

class Form extends Component {
    render() {
        return(
            <form className="form" onSubmit={this.props.getWeather}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <input type='text' name='city' placeholder='City...'/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <input type='text' name='country' placeholder='Country...'/>
                    </div>
                </div>
                <button type="submit">Get Weather</button>
            </form>
        );
    }
}

export default Form;
