import React, { Component } from 'react';
import Titles from './components/title/Titles';
import Form from './components/form/Form';
import './App.css'
import Weather from './components/weather/Weather';

const APT_KEY = '81ce2d01f8780452156dba375a7acdd6';

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if(city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APT_KEY}&units=metric`);
      const data = await api_call.json();
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the values'
      })
    }
  }
  render() {
    const { temperature, city, country, humidity, description, error } = this.state;
    return(
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container-sm container-md container-xl">
              <div className="row">
                <div className="col-xs-5 col-md-5 col-xl-5 title-container">
                <Titles />
                </div>
                <div className="col-xs-7 col-md-7 col-xl-7  form-container">
                <Form getWeather={this.getWeather}/>
                <Weather 
                  temperature={temperature}
                  city={city}
                  country={country}
                  humidity={humidity}
                  description={description}
                  error={error}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;